/**
 * Vercel Serverless Function for ElevenLabs TTS
 * This function proxies requests to ElevenLabs API for text-to-speech synthesis
 */

// Available Arabic voices from ElevenLabs
const ARABIC_VOICES = {
  'adam': {
    'id': '21m00Tcm4TlvDq8ikWAM',
    'name': 'Adam (Deep Male Voice)',
    'language': 'ar',
    'gender': 'Male'
  },
  'sarah': {
    'id': 'EXAVITQu4vr4xnSDxMaL',
    'name': 'Sarah (Female Voice)',
    'language': 'ar',
    'gender': 'Female'
  },
  'antoni': {
    'id': 'ErXwobaYiN019PkySvjV',
    'name': 'Antoni (Warm Male Voice)',
    'language': 'ar',
    'gender': 'Male'
  }
};

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, voice = 'antoni', rate = 'medium' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!process.env.ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'ElevenLabs API key not configured' });
    }

    if (!ARABIC_VOICES[voice]) {
      return res.status(400).json({ error: `Voice ${voice} not available` });
    }

    const voiceConfig = ARABIC_VOICES[voice];

    // Convert rate to ElevenLabs stability/similarity settings
    const rateSettings = {
      'slow': { stability: 0.85, similarity_boost: 0.75, speed: 0.8 },
      'medium': { stability: 0.75, similarity_boost: 0.85, speed: 1.0 },
      'fast': { stability: 0.65, similarity_boost: 0.95, speed: 1.2 }
    };

    const settings = rateSettings[rate] || rateSettings['medium'];

    // Call ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceConfig.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2', // Best model for Arabic
        voice_settings: {
          stability: settings.stability,
          similarity_boost: settings.similarity_boost,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('ElevenLabs API error:', errorData);
      return res.status(response.status).json({ 
        error: 'ElevenLabs API error', 
        message: errorData 
      });
    }

    const audioBuffer = await response.arrayBuffer();

    // Set appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    // Return the audio data
    res.status(200).send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error('ElevenLabs TTS error:', error);
    
    return res.status(500).json({ 
      error: 'TTS synthesis failed', 
      message: error.message 
    });
  }
}