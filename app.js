/**
 * Main Application Logic for Arabic Bible Reading Tutor
 * Coordinates all components for the learning experience
 */

class ArabicBibleTutor {
    constructor() {
        this.textManager = new BiblicalTextManager();
        this.speechRecognition = null;
        this.audioProcessor = null;
        this.ttsGenerator = new ArabicTTSGenerator();
        
        // DOM elements
        this.elements = {};
        
        // Application state
        this.state = {
            isRecording: false,
            isProcessing: false,
            isPlayingAudio: false,
            currentAttempt: 0,
            maxAttempts: 3,
            accuracyThreshold: 85,
            showDiacritics: true,
            autoStopListening: true,
            currentVerse: null
        };
        
        // Initialize application
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Cache DOM elements
            this.cacheElements();
            
            // Initialize speech recognition
            this.initSpeechRecognition();
            
            // Initialize audio processor
            this.initAudioProcessor();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load current verse
            this.loadCurrentVerse();
            
            // Setup settings
            this.loadSettings();
            
            // Force AWS Polly as default
            this.updateTTSService('aws');
            
            console.log('Arabic Bible Tutor initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to initialize the application. Please refresh the page.');
        }
    }

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            // Text display
            currentVerse: document.getElementById('current-verse'),
            bookName: document.getElementById('book-name'),
            chapterVerse: document.getElementById('chapter-verse'),
            
            // Controls
            startRecording: document.getElementById('start-recording'),
            stopRecording: document.getElementById('stop-recording'),
            playReference: document.getElementById('play-reference'),
            
            // Navigation
            prevVerse: document.getElementById('prev-verse'),
            nextVerse: document.getElementById('next-verse'),
            progressFill: document.getElementById('progress-fill'),
            progressText: document.getElementById('progress-text'),
            
            // Feedback
            recognitionResult: document.getElementById('recognition-result'),
            resultText: document.getElementById('result-text'),
            accuracyScore: document.getElementById('accuracy-score'),
            feedbackMessage: document.getElementById('feedback-message'),
            
            // Settings
            settingsPanel: document.getElementById('settings-panel'),
            settingsToggle: document.getElementById('settings-toggle'),
            closeSettings: document.getElementById('close-settings'),
            accuracyThreshold: document.getElementById('accuracy-threshold'),
            accuracyValue: document.getElementById('accuracy-value'),
            showDiacritics: document.getElementById('show-diacritics'),
            autoStopListening: document.getElementById('auto-stop-listening'),
            fontSize: document.getElementById('font-size'),
            speechRate: document.getElementById('speech-rate'),
            speechRateValue: document.getElementById('speech-rate-value'),
            
            // Audio
            audioCanvas: document.getElementById('audio-canvas'),
            referenceAudio: document.getElementById('reference-audio')
        };
    }

    /**
     * Initialize speech recognition
     */
    initSpeechRecognition() {
        try {
            this.speechRecognition = new ArabicSpeechRecognition({
                confidenceThreshold: this.state.accuracyThreshold / 100,
                enableAutoStop: this.state.autoStopListening
            });

            // Setup speech recognition events
            this.speechRecognition.on('start', () => {
                this.onRecognitionStart();
            });

            this.speechRecognition.on('end', () => {
                this.onRecognitionEnd();
            });

            this.speechRecognition.on('result', (results) => {
                this.onRecognitionResult(results);
            });

            this.speechRecognition.on('interim', (interim) => {
                this.onInterimResult(interim);
            });

            this.speechRecognition.on('error', (error) => {
                this.onRecognitionError(error);
            });

            this.speechRecognition.on('timeout', (type) => {
                this.onRecognitionTimeout(type);
            });

        } catch (error) {
            console.error('Speech recognition not supported:', error);
            this.showError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        }
    }

    /**
     * Initialize audio processor
     */
    initAudioProcessor() {
        try {
            this.audioProcessor = new AudioProcessor();
            
            // Setup audio visualization
            if (this.elements.audioCanvas) {
                this.audioProcessor.setupVisualization(this.elements.audioCanvas);
            }

            // Setup audio processor events
            this.audioProcessor.on('metrics', (metrics) => {
                this.updateAudioMetrics(metrics);
            });

            this.audioProcessor.on('error', (error) => {
                console.warn('Audio processor error:', error);
            });

        } catch (error) {
            console.warn('Audio processor initialization failed:', error);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Recording controls
        this.elements.startRecording?.addEventListener('click', () => {
            this.startRecording();
        });

        this.elements.stopRecording?.addEventListener('click', () => {
            this.stopRecording();
        });

        this.elements.playReference?.addEventListener('click', () => {
            this.playReference();
        });

        // Navigation
        this.elements.prevVerse?.addEventListener('click', () => {
            this.previousVerse();
        });

        this.elements.nextVerse?.addEventListener('click', () => {
            this.nextVerse();
        });

        // Settings
        this.elements.settingsToggle?.addEventListener('click', () => {
            this.toggleSettings();
        });

        this.elements.closeSettings?.addEventListener('click', () => {
            this.closeSettings();
        });

        this.elements.accuracyThreshold?.addEventListener('input', (e) => {
            this.updateAccuracyThreshold(parseInt(e.target.value));
        });

        this.elements.showDiacritics?.addEventListener('change', (e) => {
            this.toggleDiacritics(e.target.checked);
        });

        this.elements.autoStopListening?.addEventListener('change', (e) => {
            this.toggleAutoStopListening(e.target.checked);
        });

        this.elements.fontSize?.addEventListener('input', (e) => {
            this.updateFontSize(parseInt(e.target.value));
        });


        this.elements.speechRate?.addEventListener('input', (e) => {
            this.updateSpeechRate(parseFloat(e.target.value));
        });


        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    /**
     * Load current verse
     */
    loadCurrentVerse() {
        this.state.currentVerse = this.textManager.getCurrentVerse();
        this.updateVerseDisplay();
        this.updateProgress();
    }

    /**
     * Update verse display
     */
    updateVerseDisplay() {
        if (!this.state.currentVerse) {
            this.showError('No verse available');
            return;
        }

        const verse = this.state.currentVerse;
        
        // Update text content
        if (this.elements.currentVerse) {
            const text = this.textManager.getVerseText(verse);
            this.elements.currentVerse.textContent = text;
            this.elements.currentVerse.className = 'verse-text'; // Reset classes
        }

        // Update reference
        if (this.elements.bookName) {
            this.elements.bookName.textContent = verse.bookName;
        }
        
        if (this.elements.chapterVerse) {
            this.elements.chapterVerse.textContent = verse.chapterVerse;
        }

        // Reset feedback
        this.clearFeedback();
        this.state.currentAttempt = 0;
    }

    /**
     * Update progress display
     */
    updateProgress() {
        const progress = this.textManager.getProgress();
        
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${progress.progressPercentage}%`;
        }
        
        if (this.elements.progressText) {
            this.elements.progressText.textContent = 
                `آية ${progress.currentIndex + 1} من ${progress.totalInLevel}`;
        }
    }

    /**
     * Start recording
     */
    async startRecording() {
        if (this.state.isRecording) return;

        try {
            // Setup audio stream if needed
            if (this.audioProcessor && !this.audioProcessor.getAudioState().hasStream) {
                await this.audioProcessor.setupAudioStream();
            }

            // Start audio processing
            if (this.audioProcessor) {
                this.audioProcessor.startProcessing();
            }

            // Start speech recognition
            const started = await this.speechRecognition.start();
            
            if (started) {
                this.state.isRecording = true;
                this.updateRecordingUI(true);
                this.showFeedback('اقرأ النص الظاهر أمامك...', 'info');
                
                if (this.elements.currentVerse) {
                    this.elements.currentVerse.classList.add('reading');
                }
            } else {
                throw new Error('Failed to start recording');
            }

        } catch (error) {
            console.error('Failed to start recording:', error);
            this.showError('فشل في بدء التسجيل. تأكد من إذن استخدام الميكروفون.');
        }
    }

    /**
     * Stop recording
     */
    stopRecording() {
        if (!this.state.isRecording) return;

        this.state.isRecording = false;
        
        if (this.speechRecognition) {
            this.speechRecognition.stop();
        }
        
        if (this.audioProcessor) {
            this.audioProcessor.stopProcessing();
        }
        
        this.updateRecordingUI(false);
        
        if (this.elements.currentVerse) {
            this.elements.currentVerse.classList.remove('reading');
        }
    }

    /**
     * Play reference audio
     */
    async playReference() {
        if (!this.state.currentVerse) return;
        
        // Prevent multiple audio playback
        if (this.state.isPlayingAudio) {
            this.showFeedback('انتظر حتى ينتهي التشغيل الحالي', 'warning');
            return;
        }

        try {
            this.state.isPlayingAudio = true;
            this.updatePlayButtonState(true);
            
            const text = this.textManager.getVerseText(this.state.currentVerse);
            
            this.showFeedback('جاري تشغيل النموذج...', 'info');
            
            // Use the current speech rate setting
            const currentRate = this.ttsGenerator?.options.rate || 0.8;
            
            await this.ttsGenerator.generateAudio(text, {
                rate: currentRate,
                pitch: 1.0
            });
            
            this.showFeedback('انتهى تشغيل النموذج', 'success');
            
        } catch (error) {
            console.error('Failed to play reference:', error);
            this.showError('فشل في تشغيل النموذج');
        } finally {
            this.state.isPlayingAudio = false;
            this.updatePlayButtonState(false);
        }
    }

    /**
     * Update play button state during audio playback
     */
    updatePlayButtonState(isPlaying) {
        if (!this.elements.playReference) return;
        
        if (isPlaying) {
            this.elements.playReference.disabled = true;
            this.elements.playReference.textContent = '🔇 جاري التشغيل...';
            this.elements.playReference.style.opacity = '0.6';
        } else {
            this.elements.playReference.disabled = false;
            this.elements.playReference.textContent = '🔊 استمع للنموذج';
            this.elements.playReference.style.opacity = '1';
        }
    }

    /**
     * Handle speech recognition start
     */
    onRecognitionStart() {
        this.showFeedback('جاري الاستماع...', 'info');
    }

    /**
     * Handle speech recognition end
     */
    onRecognitionEnd() {
        this.state.isRecording = false;
        this.updateRecordingUI(false);
        
        if (this.elements.currentVerse) {
            this.elements.currentVerse.classList.remove('reading');
        }
    }

    /**
     * Handle interim recognition results
     */
    onInterimResult(interim) {
        if (this.elements.resultText) {
            this.elements.resultText.textContent = interim.text;
            this.elements.resultText.style.opacity = '0.7';
        }
    }

    /**
     * Handle final recognition results
     */
    onRecognitionResult(results) {
        if (!results || results.length === 0) {
            this.showError('لم يتم التعرف على أي نص. حاول مرة أخرى.');
            return;
        }

        const result = results[0];
        const bestMatch = result.bestMatch;
        
        if (this.elements.resultText) {
            this.elements.resultText.textContent = bestMatch.text;
            this.elements.resultText.style.opacity = '1';
        }

        this.processRecognitionResult(bestMatch);
    }

    /**
     * Process recognition result and provide feedback
     */
    processRecognitionResult(recognizedText) {
        if (!this.state.currentVerse) return;

        const expectedText = this.textManager.getVerseText(this.state.currentVerse);
        const comparison = this.speechRecognition.compareTexts(expectedText, recognizedText.text);
        
        const accuracyPercent = Math.round(comparison.score * 100);
        
        // Update accuracy display
        if (this.elements.accuracyScore) {
            this.elements.accuracyScore.textContent = `الدقة: ${accuracyPercent}%`;
            
            // Style based on accuracy
            this.elements.accuracyScore.className = 'accuracy-score';
            if (accuracyPercent >= this.state.accuracyThreshold) {
                this.elements.accuracyScore.classList.add('high');
            } else if (accuracyPercent >= 60) {
                this.elements.accuracyScore.classList.add('medium');
            } else {
                this.elements.accuracyScore.classList.add('low');
            }
        }

        // Check if passed
        if (accuracyPercent >= this.state.accuracyThreshold) {
            this.handleCorrectReading(accuracyPercent);
        } else {
            this.handleIncorrectReading(accuracyPercent, comparison);
        }
    }

    /**
     * Handle correct reading
     */
    handleCorrectReading(accuracy) {
        // Mark verse as completed
        this.textManager.markCurrentVerseCompleted();
        
        // Update UI
        if (this.elements.currentVerse) {
            this.elements.currentVerse.classList.add('correct');
        }
        
        this.showFeedback(`ممتاز! قراءة صحيحة بدقة ${accuracy}%`, 'success');
        
        // Auto-advance after delay
        setTimeout(() => {
            if (this.textManager.nextVerse()) {
                this.loadCurrentVerse();
            } else {
                this.showFeedback('تهانينا! لقد أنهيت جميع الآيات في هذا المستوى', 'success');
            }
        }, 2000);
    }

    /**
     * Handle incorrect reading
     */
    handleIncorrectReading(accuracy, comparison) {
        this.state.currentAttempt++;
        
        if (this.elements.currentVerse) {
            this.elements.currentVerse.classList.add('incorrect');
        }
        
        if (this.state.currentAttempt >= this.state.maxAttempts) {
            this.showFeedback(
                `دقة القراءة ${accuracy}%. لقد استنفدت المحاولات. استمع للنموذج وحاول مرة أخرى.`,
                'error'
            );
            
            // Automatically play reference
            setTimeout(() => {
                this.playReference();
            }, 1000);
            
            // Reset attempts
            this.state.currentAttempt = 0;
        } else {
            const attemptsLeft = this.state.maxAttempts - this.state.currentAttempt;
            this.showFeedback(
                `دقة القراءة ${accuracy}%. حاول مرة أخرى. المحاولات المتبقية: ${attemptsLeft}`,
                'warning'
            );
        }
        
        // Highlight errors if available
        this.highlightErrors(comparison);
    }

    /**
     * Highlight reading errors in the text
     */
    highlightErrors(comparison) {
        if (!comparison.details || !this.elements.currentVerse) return;

        const expectedWords = comparison.details.expectedWords;
        const missingWords = comparison.details.missingWords;
        
        // Simple highlighting - could be enhanced
        let highlightedText = this.elements.currentVerse.textContent;
        
        missingWords.forEach(missing => {
            const word = missing.word;
            highlightedText = highlightedText.replace(
                new RegExp(`\\b${word}\\b`, 'g'),
                `<span class="error-word">${word}</span>`
            );
        });
        
        this.elements.currentVerse.innerHTML = highlightedText;
    }

    /**
     * Handle speech recognition timeout
     */
    onRecognitionTimeout(type) {
        console.log('Speech recognition timeout:', type);
        
        let message = 'انتهى وقت التسجيل.';
        
        switch (type) {
            case 'silence':
                if (this.state.autoStopListening) {
                    message = 'تم إنهاء التسجيل بعد فترة صمت. حاول مرة أخرى.';
                } else {
                    message = 'تم التوقف تلقائياً. استخدم زر التوقف في المرة القادمة.';
                }
                break;
            case 'max_recording_time':
                message = 'وصلت للحد الأقصى لوقت التسجيل (15 ثانية).';
                break;
        }
        
        this.showFeedback(message, 'warning');
        
        // If no speech was detected, show a helpful message
        if (!this.speechRecognition.hasReceivedSpeech) {
            this.showFeedback('لم يتم اكتشاف صوت. تأكد من إذن الميكروفون وحاول مرة أخرى.', 'warning');
        }
    }

    /**
     * Handle speech recognition errors
     */
    onRecognitionError(error) {
        console.error('Speech recognition error:', error);
        
        let message = 'حدث خطأ في التعرف على الصوت.';
        
        switch (error.error) {
            case 'not-allowed':
                message = 'يرجى السماح بالوصول للميكروفون';
                break;
            case 'no-speech':
                message = 'لم يتم اكتشاف صوت. تأكد من تشغيل الميكروفون';
                break;
            case 'network':
                message = 'خطأ في الشبكة. تحقق من الاتصال بالإنترنت';
                break;
            case 'aborted':
                message = 'تم إلغاء التسجيل';
                break;
        }
        
        this.showError(message);
        this.stopRecording();
    }

    /**
     * Navigate to previous verse
     */
    previousVerse() {
        if (this.textManager.previousVerse()) {
            this.loadCurrentVerse();
        }
    }

    /**
     * Navigate to next verse
     */
    nextVerse() {
        if (this.textManager.nextVerse()) {
            this.loadCurrentVerse();
        }
    }

    /**
     * Update recording UI state
     */
    updateRecordingUI(isRecording) {
        if (this.elements.startRecording) {
            this.elements.startRecording.disabled = isRecording;
        }
        
        if (this.elements.stopRecording) {
            this.elements.stopRecording.disabled = !isRecording;
        }
    }

    /**
     * Show feedback message
     */
    showFeedback(message, type = 'info') {
        if (!this.elements.feedbackMessage) return;
        
        this.elements.feedbackMessage.textContent = message;
        this.elements.feedbackMessage.className = `feedback-message ${type}`;
    }

    /**
     * Show error message
     */
    showError(message) {
        this.showFeedback(message, 'error');
    }

    /**
     * Clear feedback
     */
    clearFeedback() {
        if (this.elements.resultText) {
            this.elements.resultText.textContent = '';
        }
        
        if (this.elements.accuracyScore) {
            this.elements.accuracyScore.textContent = '';
        }
        
        this.showFeedback('اضغط على "ابدأ القراءة" لتبدأ التمرين', 'info');
    }

    /**
     * Toggle settings panel
     */
    toggleSettings() {
        if (this.elements.settingsPanel) {
            this.elements.settingsPanel.classList.toggle('open');
        }
    }

    /**
     * Close settings panel
     */
    closeSettings() {
        if (this.elements.settingsPanel) {
            this.elements.settingsPanel.classList.remove('open');
        }
    }

    /**
     * Update accuracy threshold
     */
    updateAccuracyThreshold(value) {
        this.state.accuracyThreshold = value;
        
        if (this.elements.accuracyValue) {
            this.elements.accuracyValue.textContent = `${value}%`;
        }
        
        if (this.speechRecognition) {
            this.speechRecognition.updateSettings({
                confidenceThreshold: value / 100
            });
        }
        
        this.saveSettings();
    }

    /**
     * Toggle diacritics display
     */
    toggleDiacritics(show) {
        this.state.showDiacritics = show;
        this.textManager.toggleDiacritics(show);
        this.updateVerseDisplay();
        this.saveSettings();
    }

    /**
     * Toggle auto-stop listening
     */
    toggleAutoStopListening(enabled) {
        this.state.autoStopListening = enabled;
        
        if (this.speechRecognition) {
            this.speechRecognition.updateSettings({
                enableAutoStop: enabled
            });
        }
        
        // Update UI hint
        const message = enabled 
            ? 'سيتوقف التسجيل تلقائياً بعد الصمت' 
            : 'استخدم زر التوقف لإنهاء التسجيل';
        
        this.showFeedback(message, 'info');
        this.saveSettings();
    }

    /**
     * Update font size
     */
    updateFontSize(size) {
        if (this.elements.currentVerse) {
            this.elements.currentVerse.style.fontSize = `${size}px`;
        }
        this.saveSettings();
    }

    /**
     * Update TTS service preference (simplified - always use AWS)
     */
    updateTTSService(service = 'aws') {
        if (this.ttsGenerator) {
            this.ttsGenerator.setPreferredService('aws');
            
            // Enable AWS service
            if (this.ttsGenerator.cloudServices.aws) {
                this.ttsGenerator.cloudServices.aws.enabled = true;
            }
        }
    }

    /**
     * Update speech rate
     */
    updateSpeechRate(rate) {
        if (this.elements.speechRateValue) {
            this.elements.speechRateValue.textContent = `${rate}x`;
        }
        
        if (this.ttsGenerator) {
            this.ttsGenerator.options.rate = rate;
        }
        
        this.saveSettings();
    }


    /**
     * Update audio metrics display
     */
    updateAudioMetrics(metrics) {
        // Could add visual indicators for audio quality
        // For now, just log for debugging
        if (metrics.volume < 10) {
            console.warn('Low audio volume detected');
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case ' ':
                    event.preventDefault();
                    if (this.state.isRecording) {
                        this.stopRecording();
                    } else {
                        this.startRecording();
                    }
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.nextVerse();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.previousVerse();
                    break;
                case 'p':
                    event.preventDefault();
                    this.playReference();
                    break;
            }
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        const settings = {
            accuracyThreshold: this.state.accuracyThreshold,
            showDiacritics: this.state.showDiacritics,
            autoStopListening: this.state.autoStopListening,
            fontSize: this.elements.currentVerse?.style.fontSize || '24px',
            speechRate: this.ttsGenerator?.options.rate || 0.8
        };
        
        try {
            localStorage.setItem('arabic_tutor_settings', JSON.stringify(settings));
        } catch (error) {
            console.warn('Could not save settings:', error);
        }
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('arabic_tutor_settings');
            if (saved) {
                const settings = JSON.parse(saved);
                
                if (settings.accuracyThreshold) {
                    this.updateAccuracyThreshold(settings.accuracyThreshold);
                    if (this.elements.accuracyThreshold) {
                        this.elements.accuracyThreshold.value = settings.accuracyThreshold;
                    }
                }
                
                if (settings.hasOwnProperty('showDiacritics')) {
                    this.toggleDiacritics(settings.showDiacritics);
                    if (this.elements.showDiacritics) {
                        this.elements.showDiacritics.checked = settings.showDiacritics;
                    }
                }

                if (settings.hasOwnProperty('autoStopListening')) {
                    this.toggleAutoStopListening(settings.autoStopListening);
                    if (this.elements.autoStopListening) {
                        this.elements.autoStopListening.checked = settings.autoStopListening;
                    }
                }
                
                if (settings.fontSize) {
                    const size = parseInt(settings.fontSize);
                    this.updateFontSize(size);
                    if (this.elements.fontSize) {
                        this.elements.fontSize.value = size;
                    }
                }

                if (settings.speechRate) {
                    this.updateSpeechRate(settings.speechRate);
                    if (this.elements.speechRate) {
                        this.elements.speechRate.value = settings.speechRate;
                    }
                }
            }
        } catch (error) {
            console.warn('Could not load settings:', error);
        }
    }

    /**
     * Cleanup resources on page unload
     */
    cleanup() {
        if (this.speechRecognition) {
            this.speechRecognition.destroy();
        }
        
        if (this.audioProcessor) {
            this.audioProcessor.cleanup();
        }
        
        if (this.ttsGenerator) {
            this.ttsGenerator.stop();
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.arabicBibleTutor = new ArabicBibleTutor();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.arabicBibleTutor) {
        window.arabicBibleTutor.cleanup();
    }
});