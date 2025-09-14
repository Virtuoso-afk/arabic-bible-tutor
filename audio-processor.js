/**
 * Audio Processing and Quality Enhancement Module
 * Provides real-time audio visualization and quality enhancement for speech recognition
 */

class AudioProcessor {
    constructor(options = {}) {
        this.options = {
            sampleRate: 44100,
            bufferSize: 4096,
            fftSize: 2048,
            smoothingTimeConstant: 0.8,
            minDecibels: -90,
            maxDecibels: -10,
            enableNoiseSuppression: true,
            enableEchoCancellation: true,
            enableAutoGainControl: true,
            ...options
        };

        this.audioContext = null;
        this.mediaStream = null;
        this.source = null;
        this.analyzer = null;
        this.processor = null;
        this.gainNode = null;
        
        // Audio data arrays
        this.frequencyData = null;
        this.timeData = null;
        
        // Visualization
        this.canvas = null;
        this.canvasContext = null;
        this.animationId = null;
        
        // Audio enhancement filters
        this.filters = {};
        
        // Callbacks
        this.callbacks = {};
        
        this.initAudioContext();
    }

    /**
     * Initialize Web Audio API context
     */
    initAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Setup analyzer
            this.analyzer = this.audioContext.createAnalyser();
            this.analyzer.fftSize = this.options.fftSize;
            this.analyzer.smoothingTimeConstant = this.options.smoothingTimeConstant;
            this.analyzer.minDecibels = this.options.minDecibels;
            this.analyzer.maxDecibels = this.options.maxDecibels;
            
            // Initialize data arrays
            this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
            this.timeData = new Uint8Array(this.analyzer.fftSize);
            
            // Create gain node for volume control
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = 1.0;
            
            this.emit('contextInitialized');
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
            this.emit('error', { type: 'context', error: error });
        }
    }

    /**
     * Setup audio stream with quality enhancement
     */
    async setupAudioStream() {
        try {
            // Request high-quality audio stream
            const constraints = {
                audio: {
                    sampleRate: this.options.sampleRate,
                    echoCancellation: this.options.enableEchoCancellation,
                    noiseSuppression: this.options.enableNoiseSuppression,
                    autoGainControl: this.options.enableAutoGainControl,
                    channelCount: 1, // Mono for speech recognition
                    latency: 0.01 // Low latency for real-time processing
                }
            };

            this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Create audio source from stream
            this.source = this.audioContext.createMediaStreamSource(this.mediaStream);
            
            // Setup audio processing chain
            this.setupAudioChain();
            
            this.emit('streamReady');
            return true;
        } catch (error) {
            console.error('Failed to setup audio stream:', error);
            this.emit('error', { type: 'stream', error: error });
            return false;
        }
    }

    /**
     * Setup audio processing chain with filters
     */
    setupAudioChain() {
        try {
            // High-pass filter to remove low-frequency noise (below 80Hz)
            this.filters.highpass = this.audioContext.createBiquadFilter();
            this.filters.highpass.type = 'highpass';
            this.filters.highpass.frequency.value = 80;
            this.filters.highpass.Q.value = 0.7;

            // Low-pass filter to remove high-frequency noise (above 8kHz)
            this.filters.lowpass = this.audioContext.createBiquadFilter();
            this.filters.lowpass.type = 'lowpass';
            this.filters.lowpass.frequency.value = 8000;
            this.filters.lowpass.Q.value = 0.7;

            // Bandpass filter for speech frequencies (300Hz - 3400Hz)
            this.filters.speechBand = this.audioContext.createBiquadFilter();
            this.filters.speechBand.type = 'bandpass';
            this.filters.speechBand.frequency.value = 1850; // Center frequency
            this.filters.speechBand.Q.value = 1.0;

            // Compressor for dynamic range control
            if (this.audioContext.createDynamicsCompressor) {
                this.filters.compressor = this.audioContext.createDynamicsCompressor();
                this.filters.compressor.threshold.value = -24;
                this.filters.compressor.knee.value = 30;
                this.filters.compressor.ratio.value = 12;
                this.filters.compressor.attack.value = 0.003;
                this.filters.compressor.release.value = 0.25;
            }

            // Connect the audio chain
            let currentNode = this.source;
            
            // Apply filters in sequence
            currentNode.connect(this.filters.highpass);
            currentNode = this.filters.highpass;
            
            currentNode.connect(this.filters.speechBand);
            currentNode = this.filters.speechBand;
            
            currentNode.connect(this.filters.lowpass);
            currentNode = this.filters.lowpass;
            
            if (this.filters.compressor) {
                currentNode.connect(this.filters.compressor);
                currentNode = this.filters.compressor;
            }
            
            currentNode.connect(this.gainNode);
            this.gainNode.connect(this.analyzer);

            this.emit('chainSetup');
        } catch (error) {
            console.error('Failed to setup audio chain:', error);
            this.emit('error', { type: 'chain', error: error });
        }
    }

    /**
     * Setup canvas for audio visualization
     */
    setupVisualization(canvasElement) {
        this.canvas = canvasElement;
        this.canvasContext = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Handle resize
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.emit('visualizationReady');
    }

    /**
     * Resize canvas to match display size
     */
    resizeCanvas() {
        if (!this.canvas) return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        
        this.canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    /**
     * Start audio processing and visualization
     */
    startProcessing() {
        if (!this.audioContext || !this.analyzer) {
            console.error('Audio context not initialized');
            return false;
        }

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.isProcessing = true;
        this.startVisualization();
        this.emit('processingStarted');
        return true;
    }

    /**
     * Stop audio processing
     */
    stopProcessing() {
        this.isProcessing = false;
        this.stopVisualization();
        this.emit('processingStopped');
    }

    /**
     * Start real-time visualization
     */
    startVisualization() {
        if (!this.canvas || !this.canvasContext) return;

        const draw = () => {
            if (!this.isProcessing) return;

            // Get frequency and time domain data
            this.analyzer.getByteFrequencyData(this.frequencyData);
            this.analyzer.getByteTimeDomainData(this.timeData);

            // Clear canvas
            const { width, height } = this.canvas.getBoundingClientRect();
            this.canvasContext.clearRect(0, 0, width, height);

            // Draw waveform
            this.drawWaveform(width, height);

            // Draw frequency spectrum
            this.drawSpectrum(width, height);

            // Calculate and display audio metrics
            const metrics = this.calculateAudioMetrics();
            this.emit('metrics', metrics);

            this.animationId = requestAnimationFrame(draw);
        };

        draw();
    }

    /**
     * Stop visualization
     */
    stopVisualization() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Draw waveform visualization
     */
    drawWaveform(width, height) {
        const ctx = this.canvasContext;
        const bufferLength = this.timeData.length;
        const sliceWidth = width / bufferLength;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#4a90a4';
        ctx.beginPath();

        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            const v = this.timeData[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.stroke();
    }

    /**
     * Draw frequency spectrum
     */
    drawSpectrum(width, height) {
        const ctx = this.canvasContext;
        const bufferLength = this.frequencyData.length;
        const barWidth = width / bufferLength;

        // Draw spectrum bars
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (this.frequencyData[i] / 255) * height * 0.3;
            
            // Color gradient based on frequency
            const hue = (i / bufferLength) * 240; // Blue to red
            ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.7)`;
            
            ctx.fillRect(i * barWidth, height - barHeight, barWidth, barHeight);
        }
    }

    /**
     * Calculate audio quality metrics
     */
    calculateAudioMetrics() {
        if (!this.frequencyData || !this.timeData) {
            return { volume: 0, clarity: 0, speechPresence: 0 };
        }

        // Calculate RMS (Root Mean Square) for volume
        let rms = 0;
        for (let i = 0; i < this.timeData.length; i++) {
            const normalized = (this.timeData[i] - 128) / 128;
            rms += normalized * normalized;
        }
        rms = Math.sqrt(rms / this.timeData.length);
        const volume = Math.min(rms * 100, 100);

        // Calculate clarity (high frequency content)
        const nyquist = this.options.sampleRate / 2;
        const binWidth = nyquist / this.frequencyData.length;
        
        let highFreqEnergy = 0;
        let totalEnergy = 0;
        
        for (let i = 0; i < this.frequencyData.length; i++) {
            const freq = i * binWidth;
            const energy = this.frequencyData[i];
            
            totalEnergy += energy;
            
            // High frequencies (2kHz+)
            if (freq >= 2000) {
                highFreqEnergy += energy;
            }
        }
        
        const clarity = totalEnergy > 0 ? (highFreqEnergy / totalEnergy) * 100 : 0;

        // Calculate speech presence (energy in speech frequencies 300-3400Hz)
        let speechEnergy = 0;
        for (let i = 0; i < this.frequencyData.length; i++) {
            const freq = i * binWidth;
            if (freq >= 300 && freq <= 3400) {
                speechEnergy += this.frequencyData[i];
            }
        }
        
        const speechPresence = totalEnergy > 0 ? (speechEnergy / totalEnergy) * 100 : 0;

        return {
            volume: Math.round(volume),
            clarity: Math.round(clarity),
            speechPresence: Math.round(speechPresence),
            rms: rms,
            totalEnergy: totalEnergy
        };
    }

    /**
     * Set gain/volume level
     */
    setGain(value) {
        if (this.gainNode) {
            this.gainNode.gain.value = Math.max(0, Math.min(2, value));
        }
    }

    /**
     * Enable/disable specific filters
     */
    toggleFilter(filterName, enabled) {
        const filter = this.filters[filterName];
        if (!filter) return;

        if (enabled) {
            // Reconnect filter in chain
            // This would require rebuilding the entire chain
            this.setupAudioChain();
        } else {
            // Bypass filter
            // Implementation depends on specific filter type
        }
    }

    /**
     * Get current audio state
     */
    getAudioState() {
        return {
            isProcessing: this.isProcessing,
            contextState: this.audioContext?.state,
            sampleRate: this.audioContext?.sampleRate,
            hasStream: !!this.mediaStream,
            hasVisualization: !!this.canvas
        };
    }

    /**
     * Cleanup resources
     */
    cleanup() {
        this.stopProcessing();
        this.stopVisualization();

        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }

        Object.values(this.filters).forEach(filter => {
            if (filter && filter.disconnect) {
                filter.disconnect();
            }
        });

        if (this.analyzer) {
            this.analyzer.disconnect();
            this.analyzer = null;
        }

        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = null;
        }

        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
            this.audioContext = null;
        }

        this.callbacks = {};
    }

    /**
     * Event system
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
}

/**
 * Enhanced Arabic Text-to-Speech Generator
 * Uses multiple TTS services for high-quality Arabic pronunciation
 */
class ArabicTTSGenerator {
    constructor(options = {}) {
        this.options = {
            lang: 'ar-SA',
            rate: 0.8,
            pitch: 1.0,
            volume: 1.0,
            preferredService: 'elevenlabs', // ElevenLabs as default
            enableCloudTTS: true,
            ...options
        };
        
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        this.audioCache = new Map();
        this.loadVoices();
        
        // Cloud TTS services configuration - using Vercel serverless function
        this.cloudServices = {
            elevenlabs: {
                enabled: true, // ElevenLabs with serverless function
                serverUrl: '/api/synthesize', // Vercel serverless function
                voiceId: 'adam', // Default to Adam voice
                voices: {
                    'adam': 'Adam (Deep Male Voice)',
                    'sarah': 'Sarah (Female Voice)', 
                    'antoni': 'Antoni (Warm Male Voice)'
                }
            },
            aws: {
                enabled: false, // Disabled - replaced by ElevenLabs
                serverUrl: '/api/synthesize',
                voiceId: 'Zeina',
                region: 'us-east-1'
            },
            google: {
                enabled: false,
                apiKey: null,
                endpoint: 'https://texttospeech.googleapis.com/v1/text:synthesize'
            },
            azure: {
                enabled: false,
                apiKey: null,
                region: 'eastus',
                endpoint: 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1'
            }
        };
    }

    /**
     * Load available Arabic voices with enhanced filtering
     */
    loadVoices() {
        const voices = this.synthesis.getVoices();
        this.voices = voices.filter(voice => {
            // Filter for Arabic voices and prioritize quality ones
            const isArabic = voice.lang.startsWith('ar');
            if (!isArabic) return false;
            
            // Prefer certain voice names that typically have better Arabic pronunciation
            const qualityIndicators = [
                'Majed', 'Tarik', 'Hoda', 'Naayf', 'Laila', // Common good Arabic voice names
                'Neural', 'Premium', 'Enhanced', 'Microsoft', 'Google'
            ];
            
            voice.quality = qualityIndicators.some(indicator => 
                voice.name.includes(indicator)
            ) ? 'high' : 'standard';
            
            return true;
        });
        
        // Sort by quality and language preference
        this.voices.sort((a, b) => {
            if (a.quality !== b.quality) {
                return a.quality === 'high' ? -1 : 1;
            }
            
            // Prefer Saudi Arabic, then Egyptian, then others
            const langPriority = { 'ar-SA': 3, 'ar-EG': 2, 'ar': 1 };
            return (langPriority[b.lang] || 0) - (langPriority[a.lang] || 0);
        });
        
        // If no voices loaded yet, try again after voices changed
        if (this.voices.length === 0) {
            this.synthesis.addEventListener('voiceschanged', () => {
                this.loadVoices();
            });
        }
    }

    /**
     * Generate high-quality audio for Arabic text
     */
    async generateAudio(text, options = {}) {
        const cacheKey = `${text}_${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.audioCache.has(cacheKey)) {
            return this.playFromCache(cacheKey);
        }
        
        // Try different TTS methods in order of quality
        const methods = this.getTTSMethods();
        
        for (const method of methods) {
            try {
                const result = await this.tryTTSMethod(method, text, options);
                if (result) {
                    this.audioCache.set(cacheKey, result);
                    return result;
                }
            } catch (error) {
                console.warn(`TTS method ${method} failed:`, error);
                continue;
            }
        }
        
        throw new Error('All TTS methods failed');
    }

    /**
     * Get TTS methods in order of preference - With AWS Polly via serverless function
     */
    getTTSMethods() {
        switch (this.options.preferredService) {
            case 'cloud':
                return ['elevenlabs', 'enhanced_browser', 'browser']; // ElevenLabs first
            case 'elevenlabs':
                return ['elevenlabs', 'enhanced_browser', 'browser']; // ElevenLabs first
            case 'aws':
                return ['aws', 'enhanced_browser', 'browser']; // AWS fallback
            case 'browser':
                return ['enhanced_browser', 'browser'];
            case 'prerecorded':
                return ['prerecorded', 'elevenlabs', 'enhanced_browser', 'browser'];
            default: // auto
                return ['prerecorded', 'elevenlabs', 'enhanced_browser', 'browser']; // ElevenLabs as default
        }
    }

    /**
     * Try specific TTS method
     */
    async tryTTSMethod(method, text, options) {
        switch (method) {
            case 'prerecorded':
                return this.tryPrerecordedAudio(text);
            case 'elevenlabs':
                return this.tryElevenLabsTTS(text, options);
            case 'aws':
                return this.tryAWSPollyTTS(text, options);
            case 'azure':
                return this.tryAzureTTS(text, options);
            case 'google':
                return this.tryGoogleTTS(text, options);
            case 'enhanced_browser':
                return this.tryEnhancedBrowserTTS(text, options);
            case 'browser':
                return this.tryBrowserTTS(text, options);
            default:
                throw new Error(`Unknown TTS method: ${method}`);
        }
    }

    /**
     * Try prerecorded audio (best quality)
     */
    async tryPrerecordedAudio(text) {
        // This would look for prerecorded audio files
        // For now, we'll create a system to map common verses to audio files
        const audioMap = this.getPrerecordedAudioMap();
        const normalizedText = this.normalizeTextForAudioLookup(text);
        
        if (audioMap.has(normalizedText)) {
            const audioUrl = audioMap.get(normalizedText);
            return this.playAudioUrl(audioUrl);
        }
        
        return null; // No prerecorded audio available
    }

    /**
     * Try ElevenLabs TTS (using Vercel serverless function)
     */
    async tryElevenLabsTTS(text, options) {
        if (!this.cloudServices.elevenlabs.enabled) {
            return null;
        }

        try {
            const serverUrl = this.cloudServices.elevenlabs.serverUrl;
            
            // Determine rate based on options
            const rateMap = {
                0.5: 'slow',
                0.7: 'slow', 
                0.8: 'slow',
                0.9: 'medium',
                1.0: 'medium',
                1.1: 'fast',
                1.2: 'fast'
            };
            
            const rate = rateMap[options.rate || this.options.rate] || 'medium';
            
            const requestBody = {
                text: text,
                voice: this.cloudServices.elevenlabs.voiceId.toLowerCase(),
                rate: rate
            };

            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                return this.playAudioBlob(audioBlob);
            } else {
                const error = await response.json();
                console.error('ElevenLabs serverless function error:', error);
                return null;
            }
            
        } catch (error) {
            console.error('ElevenLabs TTS failed:', error);
            return null;
        }
    }

    /**
     * Try AWS Polly TTS (using Vercel serverless function)
     */
    async tryAWSPollyTTS(text, options) {
        if (!this.cloudServices.aws.enabled) {
            return null;
        }

        try {
            const serverUrl = this.cloudServices.aws.serverUrl;
            
            // Determine rate based on options
            const rateMap = {
                0.5: 'x-slow',
                0.7: 'slow', 
                0.8: 'slow',
                0.9: 'medium',
                1.0: 'medium',
                1.1: 'fast',
                1.2: 'fast'
            };
            
            const rate = rateMap[options.rate || this.options.rate] || 'medium';
            
            const requestBody = {
                text: text,
                voice: this.cloudServices.aws.voiceId.toLowerCase(),
                rate: rate
            };

            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                return this.playAudioBlob(audioBlob);
            } else {
                const error = await response.json();
                console.error('AWS Polly serverless function error:', error);
                return null;
            }
            
        } catch (error) {
            console.error('AWS Polly TTS failed:', error);
            return null;
        }
    }

    /**
     * Create AWS request (disabled for frontend-only deployment)
     */
    async createAWSRequest(requestBody) {
        console.log('AWS TTS disabled for frontend-only deployment');
        return null;
    }

    /**
     * Try Azure Cognitive Services TTS (disabled for frontend-only deployment)
     */
    async tryAzureTTS(text, options) {
        console.log('Azure TTS disabled for frontend-only deployment');
        return null;
    }

    /**
     * Try Google Cloud TTS (disabled for frontend-only deployment)
     */
    async tryGoogleTTS(text, options) {
        console.log('Google Cloud TTS disabled for frontend-only deployment');
        return null;
    }

    /**
     * Enhanced browser TTS with optimized settings
     */
    async tryEnhancedBrowserTTS(text, options) {
        return new Promise((resolve, reject) => {
            if (!this.synthesis) {
                reject(new Error('Speech synthesis not supported'));
                return;
            }

            // Enhanced Arabic text preprocessing
            const enhancedText = this.enhanceArabicTextForTTS(text);
            const utterance = new SpeechSynthesisUtterance(enhancedText);
            
            // Use the best available Arabic voice
            const bestVoice = this.getBestArabicVoice();
            if (bestVoice) {
                utterance.voice = bestVoice;
            }
            
            // Optimized settings for Arabic pronunciation
            utterance.lang = options.lang || 'ar-SA';
            utterance.rate = (options.rate || this.options.rate) * 0.85; // Slower for clarity
            utterance.pitch = (options.pitch || this.options.pitch) * 0.95; // Slightly lower pitch
            utterance.volume = options.volume || this.options.volume;

            // Add pauses for better pronunciation
            utterance.text = this.addPausesForArabic(enhancedText);

            // Cancel any ongoing speech before starting new one
            this.synthesis.cancel();
            
            let resolved = false;
            
            utterance.onend = () => {
                if (!resolved) {
                    resolved = true;
                    resolve(true);
                }
            };
            
            utterance.onerror = (error) => {
                if (!resolved) {
                    resolved = true;
                    console.error('Enhanced TTS Error:', error);
                    reject(error);
                }
            };
            
            // Timeout fallback in case onend doesn't fire
            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    resolve(true);
                }
            }, 30000); // 30 second timeout

            this.synthesis.speak(utterance);
        });
    }

    /**
     * Standard browser TTS (fallback)
     */
    async tryBrowserTTS(text, options) {
        return new Promise((resolve, reject) => {
            if (!this.synthesis) {
                reject(new Error('Speech synthesis not supported'));
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            
            // Configure utterance
            utterance.lang = options.lang || this.options.lang;
            utterance.rate = options.rate || this.options.rate;
            utterance.pitch = options.pitch || this.options.pitch;
            utterance.volume = options.volume || this.options.volume;

            // Select best Arabic voice
            const arabicVoice = this.getBestArabicVoice();
            if (arabicVoice) {
                utterance.voice = arabicVoice;
            }

            // Cancel any ongoing speech before starting new one
            this.synthesis.cancel();
            
            let resolved = false;
            
            utterance.onend = () => {
                if (!resolved) {
                    resolved = true;
                    resolve(true);
                }
            };
            
            utterance.onerror = (error) => {
                if (!resolved) {
                    resolved = true;
                    console.error('Browser TTS Error:', error);
                    reject(error);
                }
            };
            
            // Timeout fallback in case onend doesn't fire
            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    resolve(true);
                }
            }, 30000); // 30 second timeout

            this.synthesis.speak(utterance);
        });
    }

    /**
     * Enhance Arabic text for better TTS pronunciation
     */
    enhanceArabicTextForTTS(text) {
        return text
            // Add explicit vowels in critical positions
            .replace(/الله/g, 'اللَّه') // Add shadda and fatha for "Allah"
            .replace(/الرحمن/g, 'الرَّحمان') // Better pronunciation for "Ar-Rahman"
            .replace(/الرحيم/g, 'الرَّحيم') // Better pronunciation for "Ar-Raheem"
            // Add pauses after punctuation
            .replace(/[،؛]/g, '$&\u200B ') // Add zero-width space for pauses
            .replace(/[.؟!]/g, '$&\u200B\u200B '); // Longer pauses for sentence endings
    }

    /**
     * Add strategic pauses for better Arabic pronunciation
     */
    addPausesForArabic(text) {
        return text
            // Add pauses after long words (8+ characters)
            .replace(/(\S{8,})/g, '$1 ')
            // Add pauses before conjunctions
            .replace(/\s+(و|أو|لكن|إذ|إذا|عندما)/g, ' $1')
            // Add pauses around parenthetical expressions
            .replace(/(\([^)]+\))/g, ' $1 ');
    }

    /**
     * Create SSML for Azure TTS
     */
    createArabicSSML(text, options) {
        return `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ar-SA">
            <voice name="${options.voice}">
                <prosody rate="${options.rate}" pitch="${options.pitch > 1 ? '+' : ''}${((options.pitch - 1) * 50).toFixed(0)}%">
                    ${text}
                </prosody>
            </voice>
        </speak>`.trim();
    }

    /**
     * Get prerecorded audio mapping (to be implemented with actual audio files)
     */
    getPrerecordedAudioMap() {
        // This would map common biblical verses to high-quality audio files
        // recorded by native Arabic speakers
        const audioMap = new Map();
        
        // Example mappings (these would be actual audio files)
        audioMap.set('في البدء خلق الله السماوات والأرض', '/audio/genesis_1_1.mp3');
        audioMap.set('وقال الله ليكن نور فكان نور', '/audio/genesis_1_3.mp3');
        audioMap.set('الرب راعي فلا يعوزني شيء', '/audio/psalm_23_1.mp3');
        
        return audioMap;
    }

    /**
     * Normalize text for audio lookup
     */
    normalizeTextForAudioLookup(text) {
        return text
            .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '') // Remove diacritics
            .replace(/[آأإ]/g, 'ا') // Normalize alef
            .replace(/ة/g, 'ه') // Normalize teh marbuta
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    /**
     * Play audio from URL
     */
    async playAudioUrl(url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.onended = () => resolve(true);
            audio.onerror = () => reject(new Error('Audio playback failed'));
            audio.play().catch(reject);
        });
    }

    /**
     * Play audio from blob
     */
    async playAudioBlob(blob) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            
            audio.onended = () => {
                URL.revokeObjectURL(url);
                resolve(true);
            };
            
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Audio playback failed'));
            };
            
            audio.play().catch(reject);
        });
    }

    /**
     * Play from cache
     */
    async playFromCache(cacheKey) {
        const cachedAudio = this.audioCache.get(cacheKey);
        if (cachedAudio instanceof Blob) {
            return this.playAudioBlob(cachedAudio);
        }
        return cachedAudio; // Already a promise or result
    }

    /**
     * Get the best available Arabic voice with quality scoring
     */
    getBestArabicVoice() {
        if (this.voices.length === 0) {
            this.loadVoices();
        }

        // Return the highest quality voice (already sorted)
        return this.voices[0] || null;
    }

    /**
     * Configure cloud TTS services
     */
    configureCloudService(service, config) {
        if (this.cloudServices[service]) {
            Object.assign(this.cloudServices[service], config);
        }
    }

    /**
     * Stop current speech
     */
    stop() {
        if (this.synthesis) {
            this.synthesis.cancel();
            // Wait a moment to ensure cancellation completes
            setTimeout(() => {
                if (this.synthesis.speaking) {
                    this.synthesis.cancel();
                }
            }, 100);
        }
    }

    /**
     * Get available voices with quality information
     */
    getAvailableVoices() {
        return this.voices.map(voice => ({
            name: voice.name,
            lang: voice.lang,
            localService: voice.localService,
            quality: voice.quality || 'standard'
        }));
    }

    /**
     * Set preferred TTS service
     */
    setPreferredService(service) {
        this.options.preferredService = service;
    }
}

// Export for use in other modules
window.AudioProcessor = AudioProcessor;
window.ArabicTTSGenerator = ArabicTTSGenerator;