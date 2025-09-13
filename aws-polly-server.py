#!/usr/bin/env python3
"""
AWS Polly TTS Server for Arabic Bible Tutor
Simple Flask server to handle AWS Polly requests from the web app
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import boto3
import io
import os
import hashlib
import tempfile
from botocore.exceptions import ClientError, NoCredentialsError

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Polly client with explicit credentials for Render
try:
    polly = boto3.client(
        'polly',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION', 'us-east-1')
    )
    # Test the connection
    polly.describe_voices(LanguageCode='ar')
    print("✅ AWS Polly client initialized successfully")
except Exception as e:
    print(f"Warning: Could not initialize AWS Polly client: {e}")
    print("Make sure AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION are set")
    polly = None

# Cache directory for audio files
CACHE_DIR = os.path.join(tempfile.gettempdir(), 'arabic_tutor_cache')
os.makedirs(CACHE_DIR, exist_ok=True)

# Available Arabic voices in AWS Polly
ARABIC_VOICES = {
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
}

def get_cache_filename(text, voice_id, engine):
    """Generate cache filename based on text and voice settings"""
    cache_key = f"{text}_{voice_id}_{engine}".encode('utf-8')
    hash_key = hashlib.md5(cache_key).hexdigest()
    return os.path.join(CACHE_DIR, f"{hash_key}.mp3")

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Arabic Bible Tutor - AWS Polly TTS Server',
        'status': 'running',
        'endpoints': {
            'health': '/health',
            'voices': '/voices',
            'synthesize': '/synthesize',
            'synthesize-ssml': '/synthesize-ssml',
            'clear-cache': '/clear-cache'
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'polly_available': polly is not None,
        'available_voices': list(ARABIC_VOICES.keys())
    })

@app.route('/voices', methods=['GET'])
def get_voices():
    """Get available Arabic voices"""
    return jsonify({
        'voices': ARABIC_VOICES,
        'default': 'zeina'
    })

@app.route('/synthesize', methods=['POST'])
def synthesize_speech():
    """Synthesize speech using AWS Polly"""
    if not polly:
        return jsonify({'error': 'AWS Polly not available'}), 500
    
    try:
        data = request.get_json()
        text = data.get('text', '')
        voice_id = data.get('voice', 'zeina')
        engine = data.get('engine', 'standard')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
            
        if voice_id not in ARABIC_VOICES:
            return jsonify({'error': f'Voice {voice_id} not available'}), 400
        
        voice_config = ARABIC_VOICES[voice_id]
        
        # Check cache first
        cache_file = get_cache_filename(text, voice_id, engine)
        if os.path.exists(cache_file):
            return send_file(cache_file, mimetype='audio/mpeg')
        
        # Synthesize with AWS Polly
        polly_params = {
            'Text': text,
            'OutputFormat': 'mp3',
            'VoiceId': voice_config['id'],
            'LanguageCode': voice_config['language'],
            'Engine': engine if engine in ['standard', 'neural'] else voice_config['engine']
        }
        
        # Add SSML support for better Arabic pronunciation
        if text.strip().startswith('<speak>'):
            polly_params['TextType'] = 'ssml'
        
        response = polly.synthesize_speech(**polly_params)
        
        # Save to cache and return
        audio_data = response['AudioStream'].read()
        
        with open(cache_file, 'wb') as f:
            f.write(audio_data)
        
        return send_file(
            io.BytesIO(audio_data),
            mimetype='audio/mpeg',
            as_attachment=False
        )
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        return jsonify({
            'error': f'AWS Polly error: {error_code}',
            'message': error_message
        }), 500
        
    except NoCredentialsError:
        return jsonify({
            'error': 'AWS credentials not configured',
            'message': 'Please configure AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)'
        }), 500
        
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

@app.route('/synthesize-ssml', methods=['POST'])
def synthesize_ssml():
    """Synthesize speech with SSML for enhanced Arabic pronunciation"""
    if not polly:
        return jsonify({'error': 'AWS Polly not available'}), 500
    
    try:
        data = request.get_json()
        text = data.get('text', '')
        voice_id = data.get('voice', 'zeina')
        rate = data.get('rate', 'medium')  # x-slow, slow, medium, fast, x-fast
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
            
        voice_config = ARABIC_VOICES.get(voice_id, ARABIC_VOICES['zeina'])
        
        # Create SSML for better Arabic pronunciation
        ssml_text = f'''
        <speak>
            <prosody rate="{rate}">
                <lang xml:lang="{voice_config['language']}">
                    {text}
                </lang>
            </prosody>
        </speak>
        '''.strip()
        
        # Check cache
        cache_file = get_cache_filename(ssml_text, voice_id, 'ssml')
        if os.path.exists(cache_file):
            return send_file(cache_file, mimetype='audio/mpeg')
        
        # Synthesize with SSML
        response = polly.synthesize_speech(
            Text=ssml_text,
            TextType='ssml',
            OutputFormat='mp3',
            VoiceId=voice_config['id'],
            LanguageCode=voice_config['language'],
            Engine=voice_config['engine']
        )
        
        # Save to cache and return
        audio_data = response['AudioStream'].read()
        
        with open(cache_file, 'wb') as f:
            f.write(audio_data)
        
        return send_file(
            io.BytesIO(audio_data),
            mimetype='audio/mpeg',
            as_attachment=False
        )
        
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500

@app.route('/clear-cache', methods=['POST'])
def clear_cache():
    """Clear audio cache"""
    try:
        import shutil
        if os.path.exists(CACHE_DIR):
            shutil.rmtree(CACHE_DIR)
            os.makedirs(CACHE_DIR, exist_ok=True)
        return jsonify({'message': 'Cache cleared successfully'})
    except Exception as e:
        return jsonify({'error': f'Error clearing cache: {str(e)}'}), 500

if __name__ == '__main__':
    # Get port from environment variable (Render sets this automatically)
    port = int(os.getenv('PORT', 10000))
    
    print("🎙️  Arabic Bible Tutor - AWS Polly TTS Server")
    print("=" * 50)
    
    if polly:
        print("✅ AWS Polly client initialized successfully")
        print(f"📍 Region: {polly.meta.region_name}")
        print(f"🗂️  Cache directory: {CACHE_DIR}")
        print(f"🎵 Available voices: {', '.join(ARABIC_VOICES.keys())}")
    else:
        print("❌ AWS Polly client not available")
        print("   Please check your AWS credentials and region settings")
    
    print(f"\n🚀 Starting server on port {port}")
    print(f"   Health check: /health")
    print(f"   Available voices: /voices")
    print("\n💡 Environment variables required:")
    print("   - AWS_ACCESS_KEY_ID")
    print("   - AWS_SECRET_ACCESS_KEY") 
    print("   - AWS_REGION (optional, defaults to us-east-1)")
    print("   - PORT (set automatically by Render)")
    
    # Use production settings for Render deployment
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, host='0.0.0.0', port=port)