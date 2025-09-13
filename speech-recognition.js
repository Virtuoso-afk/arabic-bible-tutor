/**
 * High-Quality Arabic Speech Recognition Module
 * Optimized for 2025 browser capabilities with fallback support
 */

class ArabicSpeechRecognition {
    constructor(options = {}) {
        this.options = {
            language: 'ar-SA', // Saudi Arabic as primary
            fallbackLanguages: ['ar-EG', 'ar-JO', 'ar-LB', 'ar'], // Egyptian, Jordanian, Lebanese, Generic Arabic
            continuous: true, // Enable continuous listening
            interimResults: true,
            maxAlternatives: 5,
            confidenceThreshold: options.confidenceThreshold || 0.85,
            enableCloudFallback: options.enableCloudFallback !== false,
            enableAutoStop: options.enableAutoStop !== false, // Enable auto-stop by default
            silenceTimeout: options.silenceTimeout || 3000, // Wait 3 seconds after silence
            maxRecordingTime: options.maxRecordingTime || 15000, // Maximum 15 seconds
            ...options
        };
        
        this.recognition = null;
        this.isListening = false;
        this.audioContext = null;
        this.mediaStream = null;
        this.processor = null;
        this.callbacks = {};
        
        // Timing controls
        this.silenceTimer = null;
        this.maxRecordingTimer = null;
        this.lastSpeechTime = null;
        this.hasReceivedSpeech = false;
        
        this.initRecognition();
        this.setupAudioProcessing();
    }

    /**
     * Initialize speech recognition with browser compatibility
     */
    initRecognition() {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || 
                                window.webkitSpeechRecognition || 
                                window.mozSpeechRecognition || 
                                window.msSpeechRecognition;

        if (!SpeechRecognition) {
            throw new Error('Speech recognition not supported in this browser');
        }

        this.recognition = new SpeechRecognition();
        this.configureRecognition();
        this.setupEventListeners();
    }

    /**
     * Configure recognition settings for optimal Arabic performance
     */
    configureRecognition() {
        this.recognition.lang = this.options.language;
        this.recognition.continuous = true; // Enable continuous listening
        this.recognition.interimResults = this.options.interimResults;
        this.recognition.maxAlternatives = this.options.maxAlternatives;
        
        // Enhanced settings for 2025 browsers
        if ('serviceURI' in this.recognition) {
            // Use Google's enhanced Arabic models if available
            this.recognition.serviceURI = 'https://speech.googleapis.com/v1/speech:recognize';
        }
        
        if ('grammars' in this.recognition && window.SpeechGrammarList) {
            // Add Arabic grammar hints for biblical text
            const grammar = this.createArabicGrammar();
            const speechRecognitionList = new window.SpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            this.recognition.grammars = speechRecognitionList;
        }
    }

    /**
     * Create Arabic grammar hints for biblical text recognition
     */
    createArabicGrammar() {
        const commonBiblicalWords = [
            'الله', 'الرب', 'يسوع', 'المسيح', 'الروح', 'القدس',
            'السماء', 'الأرض', 'الملكوت', 'الحياة', 'المحبة',
            'الإيمان', 'الرجاء', 'الخلاص', 'النعمة', 'الحق'
        ];
        
        return `#JSGF V1.0; grammar biblical_arabic; public <word> = ${commonBiblicalWords.join(' | ')};`;
    }

    /**
     * Setup audio processing for quality enhancement
     */
    setupAudioProcessing() {
        if (window.AudioContext || window.webkitAudioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    /**
     * Setup event listeners for recognition events
     */
    setupEventListeners() {
        this.recognition.onstart = () => {
            this.isListening = true;
            this.hasReceivedSpeech = false;
            this.lastSpeechTime = Date.now();
            
            // Set maximum recording timer (always active for safety)
            this.maxRecordingTimer = setTimeout(() => {
                if (this.isListening) {
                    this.stop();
                    this.emit('timeout', 'max_recording_time');
                }
            }, this.options.maxRecordingTime);
            
            this.emit('start');
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.clearTimers();
            this.emit('end');
        };

        this.recognition.onresult = (event) => {
            this.handleRecognitionResult(event);
        };

        this.recognition.onerror = (event) => {
            this.handleRecognitionError(event);
        };

        this.recognition.onnomatch = () => {
            this.emit('nomatch');
        };

        this.recognition.onspeechstart = () => {
            this.hasReceivedSpeech = true;
            this.lastSpeechTime = Date.now();
            this.clearSilenceTimer();
            this.emit('speechstart');
        };

        this.recognition.onspeechend = () => {
            this.lastSpeechTime = Date.now();
            this.startSilenceTimer();
            this.emit('speechend');
        };
    }

    /**
     * Handle recognition results with enhanced processing
     */
    handleRecognitionResult(event) {
        const results = [];
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            
            if (result.isFinal) {
                const alternatives = Array.from(result).map(alternative => ({
                    text: this.normalizeArabicText(alternative.transcript),
                    confidence: alternative.confidence || 0,
                    rawText: alternative.transcript
                }));
                
                // Sort by confidence
                alternatives.sort((a, b) => b.confidence - a.confidence);
                
                results.push({
                    isFinal: true,
                    alternatives: alternatives,
                    bestMatch: alternatives[0]
                });
            } else {
                // Interim results
                const interim = {
                    isFinal: false,
                    text: this.normalizeArabicText(result[0].transcript),
                    confidence: result[0].confidence || 0
                };
                
                this.emit('interim', interim);
            }
        }
        
        if (results.length > 0) {
            this.emit('result', results);
        }
    }

    /**
     * Handle recognition errors with fallback strategies
     */
    handleRecognitionError(event) {
        const errorDetails = {
            error: event.error,
            message: event.message,
            timestamp: Date.now()
        };
        
        // Implement fallback strategies
        if (event.error === 'network' && this.options.enableCloudFallback) {
            this.tryCloudFallback();
        } else if (event.error === 'not-allowed') {
            errorDetails.suggestion = 'Microphone permission required';
        } else if (event.error === 'language-not-supported') {
            this.tryFallbackLanguage();
        }
        
        this.emit('error', errorDetails);
    }

    /**
     * Try fallback language if primary language fails
     */
    tryFallbackLanguage() {
        const currentLangIndex = this.options.fallbackLanguages.indexOf(this.recognition.lang);
        if (currentLangIndex < this.options.fallbackLanguages.length - 1) {
            this.recognition.lang = this.options.fallbackLanguages[currentLangIndex + 1];
            this.emit('languageChanged', this.recognition.lang);
        }
    }

    /**
     * Attempt cloud-based fallback for higher accuracy
     */
    async tryCloudFallback() {
        // This would integrate with Google Cloud Speech or Azure Speech Services
        // For now, emit a warning that cloud fallback would be implemented
        this.emit('cloudFallbackAttempted');
    }

    /**
     * Normalize Arabic text for comparison
     */
    normalizeArabicText(text) {
        if (!text) return '';
        
        return text
            // Remove diacritics (tashkeel)
            .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
            // Normalize alef variations
            .replace(/[آأإ]/g, 'ا')
            // Normalize teh marbuta
            .replace(/ة/g, 'ه')
            // Normalize yeh variations
            .replace(/[ىئ]/g, 'ي')
            // Remove extra spaces and trim
            .replace(/\s+/g, ' ')
            .trim()
            // Convert to lowercase (for Arabic this mainly affects Latin characters)
            .toLowerCase();
    }

    /**
     * Compare two Arabic texts with fuzzy matching
     */
    compareTexts(expected, actual) {
        const normalizedExpected = this.normalizeArabicText(expected);
        const normalizedActual = this.normalizeArabicText(actual);
        
        // Exact match
        if (normalizedExpected === normalizedActual) {
            return { score: 1.0, type: 'exact' };
        }
        
        // Word-level comparison
        const expectedWords = normalizedExpected.split(' ').filter(w => w.length > 0);
        const actualWords = normalizedActual.split(' ').filter(w => w.length > 0);
        
        const wordMatches = this.compareWordArrays(expectedWords, actualWords);
        
        // Calculate Levenshtein distance for character-level similarity
        const charSimilarity = this.calculateLevenshteinSimilarity(normalizedExpected, normalizedActual);
        
        // Combined score (70% word matching, 30% character similarity)
        const combinedScore = (wordMatches.score * 0.7) + (charSimilarity * 0.3);
        
        return {
            score: combinedScore,
            type: 'fuzzy',
            wordMatches: wordMatches,
            characterSimilarity: charSimilarity,
            details: {
                expectedWords: expectedWords,
                actualWords: actualWords,
                matchedWords: wordMatches.matches,
                missingWords: wordMatches.missing,
                extraWords: wordMatches.extra
            }
        };
    }

    /**
     * Compare word arrays with position awareness
     */
    compareWordArrays(expected, actual) {
        const matches = [];
        const missing = [];
        const extra = [];
        
        let matchCount = 0;
        
        // Find matches and missing words
        expected.forEach((expectedWord, index) => {
            const actualIndex = actual.indexOf(expectedWord);
            if (actualIndex !== -1) {
                matches.push({
                    word: expectedWord,
                    expectedIndex: index,
                    actualIndex: actualIndex
                });
                matchCount++;
            } else {
                missing.push({ word: expectedWord, index: index });
            }
        });
        
        // Find extra words
        actual.forEach((actualWord, index) => {
            if (!expected.includes(actualWord)) {
                extra.push({ word: actualWord, index: index });
            }
        });
        
        const score = expected.length > 0 ? matchCount / expected.length : 0;
        
        return {
            score: score,
            matches: matches,
            missing: missing,
            extra: extra,
            totalExpected: expected.length,
            totalActual: actual.length,
            matchedCount: matchCount
        };
    }

    /**
     * Calculate Levenshtein distance similarity
     */
    calculateLevenshteinSimilarity(str1, str2) {
        const distance = this.levenshteinDistance(str1, str2);
        const maxLength = Math.max(str1.length, str2.length);
        return maxLength === 0 ? 1 : 1 - (distance / maxLength);
    }

    /**
     * Calculate Levenshtein distance between two strings
     */
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    /**
     * Start silence timer after speech ends
     */
    startSilenceTimer() {
        // Only start timer if auto-stop is enabled
        if (!this.options.enableAutoStop) {
            return;
        }
        
        this.clearSilenceTimer();
        
        this.silenceTimer = setTimeout(() => {
            if (this.isListening && this.hasReceivedSpeech) {
                this.stop();
                this.emit('timeout', 'silence');
            }
        }, this.options.silenceTimeout);
    }

    /**
     * Clear silence timer
     */
    clearSilenceTimer() {
        if (this.silenceTimer) {
            clearTimeout(this.silenceTimer);
            this.silenceTimer = null;
        }
    }

    /**
     * Clear all timers
     */
    clearTimers() {
        this.clearSilenceTimer();
        
        if (this.maxRecordingTimer) {
            clearTimeout(this.maxRecordingTimer);
            this.maxRecordingTimer = null;
        }
    }

    /**
     * Start speech recognition
     */
    async start() {
        if (this.isListening) {
            return false;
        }

        try {
            // Request microphone permission and setup audio enhancement
            await this.setupAudioEnhancement();
            
            this.recognition.start();
            return true;
        } catch (error) {
            this.emit('error', {
                error: 'start_failed',
                message: error.message,
                originalError: error
            });
            return false;
        }
    }

    /**
     * Stop speech recognition
     */
    stop() {
        if (this.isListening) {
            this.recognition.stop();
        }
        this.clearTimers();
        this.cleanupAudioEnhancement();
    }

    /**
     * Abort speech recognition
     */
    abort() {
        if (this.isListening) {
            this.recognition.abort();
        }
        this.clearTimers();
        this.cleanupAudioEnhancement();
    }

    /**
     * Setup audio enhancement for better recognition
     */
    async setupAudioEnhancement() {
        if (!this.audioContext) return;

        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100
                }
            });

            // Create audio processing chain for enhancement
            const source = this.audioContext.createMediaStreamSource(this.mediaStream);
            
            // High-pass filter to remove low-frequency noise
            const highpass = this.audioContext.createBiquadFilter();
            highpass.type = 'highpass';
            highpass.frequency.value = 80;
            
            // Low-pass filter to remove high-frequency noise
            const lowpass = this.audioContext.createBiquadFilter();
            lowpass.type = 'lowpass';
            lowpass.frequency.value = 8000;
            
            // Connect the processing chain
            source.connect(highpass);
            highpass.connect(lowpass);
            
            this.emit('audioEnhanced');
        } catch (error) {
            console.warn('Audio enhancement setup failed:', error);
        }
    }

    /**
     * Cleanup audio enhancement resources
     */
    cleanupAudioEnhancement() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }
    }

    /**
     * Event emitter functionality
     */
    on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }

    off(event, callback) {
        if (this.callbacks[event]) {
            const index = this.callbacks[event].indexOf(callback);
            if (index > -1) {
                this.callbacks[event].splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Callback error:', error);
                }
            });
        }
    }

    /**
     * Get current recognition state
     */
    getState() {
        return {
            isListening: this.isListening,
            language: this.recognition?.lang,
            hasAudioContext: !!this.audioContext,
            hasMediaStream: !!this.mediaStream
        };
    }

    /**
     * Update recognition settings
     */
    updateSettings(newOptions) {
        Object.assign(this.options, newOptions);
        
        if (this.recognition) {
            if (newOptions.language) {
                this.recognition.lang = newOptions.language;
            }
            if (newOptions.hasOwnProperty('continuous')) {
                this.recognition.continuous = newOptions.continuous;
            }
            if (newOptions.hasOwnProperty('interimResults')) {
                this.recognition.interimResults = newOptions.interimResults;
            }
        }
        
        // Handle enableAutoStop changes
        if (newOptions.hasOwnProperty('enableAutoStop')) {
            if (!newOptions.enableAutoStop) {
                // If auto-stop is disabled, clear any active silence timer
                this.clearSilenceTimer();
            }
        }
    }

    /**
     * Cleanup resources
     */
    destroy() {
        this.stop();
        this.clearTimers();
        this.cleanupAudioEnhancement();
        
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }
        
        this.callbacks = {};
        this.recognition = null;
    }
}

// Export for use in other modules
window.ArabicSpeechRecognition = ArabicSpeechRecognition;