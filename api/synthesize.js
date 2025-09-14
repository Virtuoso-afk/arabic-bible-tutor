/**
 * Vercel Serverless Function for AWS Polly TTS
 * This function proxies requests to AWS Polly for text-to-speech synthesis
 */

const AWS = require('aws-sdk');

// Configure AWS Polly
const polly = new AWS.Polly({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

// Available Arabic voices
const ARABIC_VOICES = {
  'zeina': {
    'id': 'Zeina',
    'name': 'Zeina (Female, Modern Standard Arabic)',
    'language': 'arb',
    'gender': 'Female',
    'engine': 'standard'
  },
  'hala': {
    'id': 'Hala',
    'name': 'Hala (Female, Gulf Arabic)', 
    'language': 'ar-AE',
    'gender': 'Female',
    'engine': 'neural'
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
    const { text, voice = 'zeina', rate = 'medium' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!ARABIC_VOICES[voice]) {
      return res.status(400).json({ error: `Voice ${voice} not available` });
    }

    const voiceConfig = ARABIC_VOICES[voice];

    // Create SSML for better Arabic pronunciation
    const ssmlText = `
      <speak>
        <prosody rate="${rate}">
          <lang xml:lang="${voiceConfig.language}">
            ${text}
          </lang>
        </prosody>
      </speak>
    `.trim();

    const params = {
      Text: ssmlText,
      TextType: 'ssml',
      OutputFormat: 'mp3',
      VoiceId: voiceConfig.id,
      LanguageCode: voiceConfig.language,
      Engine: voiceConfig.engine
    };

    const result = await polly.synthesizeSpeech(params).promise();

    // Set appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    // Return the audio data
    res.status(200).send(result.AudioStream);

  } catch (error) {
    console.error('AWS Polly error:', error);
    
    if (error.code === 'InvalidParameterValue') {
      return res.status(400).json({ 
        error: 'Invalid parameter', 
        message: error.message 
      });
    }
    
    if (error.code === 'AccessDenied') {
      return res.status(403).json({ 
        error: 'AWS access denied', 
        message: 'Check AWS credentials and permissions' 
      });
    }

    return res.status(500).json({ 
      error: 'TTS synthesis failed', 
      message: error.message 
    });
  }
}