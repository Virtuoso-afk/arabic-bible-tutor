# Arabic Bible Reading Tutor 🎓📖

A web application for teaching Arabic reading using biblical texts with high-quality speech recognition and text-to-speech technology.

## 🌟 Features

- **High-Quality Speech Recognition**: Advanced Arabic speech recognition with multiple fallback options
- **Multiple TTS Services**: AWS Polly, Azure Cognitive Services, Google Cloud TTS, and enhanced browser TTS
- **Biblical Text Database**: Verses from Old and New Testament in Arabic with and without diacritics
- **Progressive Learning**: Beginner, intermediate, and advanced difficulty levels
- **Real-time Audio Visualization**: Visual feedback for pronunciation quality
- **Responsive Arabic UI**: Full RTL support with Arabic fonts

## 🚀 Quick Start

## 🌐 Deploy to Render (Recommended)

This project is optimized for deployment on Render.com with both frontend and backend services.

### 1. Prerequisites
- GitHub account
- Render account (free tier available)
- AWS account with Polly access
- AWS Access Key ID and Secret Access Key

### 2. GitHub Setup

```bash
# Initialize git repository
git init

# Add all files (credentials are excluded by .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit: Arabic Bible Reading Tutor"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/arabic-bible-tutor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Render Deployment

#### Option A: Using render.yaml (Automatic)
1. **Connect GitHub to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and deploy both services

#### Option B: Manual Setup
1. **Deploy Backend API:**
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `python aws-polly-server.py`
   - Add environment variables:
     - `AWS_ACCESS_KEY_ID`: Your AWS access key
     - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
     - `AWS_REGION`: `us-east-1`
     - `FLASK_ENV`: `production`

2. **Deploy Frontend:**
   - Click "New" → "Static Site"
   - Connect same GitHub repository
   - Build command: (leave empty)
   - Publish directory: `.` (current directory)

### 4. Environment Variables Setup

In your Render service dashboard, add these environment variables:

| Variable | Value | Required |
|----------|-------|----------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key | Yes |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret access key | Yes |
| `AWS_REGION` | `us-east-1` (recommended) | No |
| `FLASK_ENV` | `production` | No |

### 5. Update Frontend Configuration

After deployment, update `audio-processor.js` with your Render API URL:

```javascript
// Replace localhost with your Render service URL
const TTS_SERVICE_URL = 'https://your-service-name.onrender.com';
```

### 6. Test Deployment

1. Visit your Render static site URL
2. Open browser developer tools
3. Test the "Listen to Model" button
4. Verify AWS Polly integration works

## 💻 Local Development

### 1. Basic Setup (Browser TTS)

```bash
# Clone or download the project
cd "the app"

# Start simple web server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### 2. AWS Polly Setup (Best Quality)

#### Prerequisites
- AWS account with Polly access
- AWS credentials configured

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure AWS Credentials

**Option A: Environment Variables**
```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_REGION="us-east-1"
```

**Option B: AWS CLI**
```bash
aws configure
```

**Option C: Create `.env` file**
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

#### Start AWS Polly Server

```bash
# Start the TTS server
python3 aws-polly-server.py
```

You should see:
```
🎙️  Arabic Bible Tutor - AWS Polly TTS Server
==================================================
✅ AWS Polly client initialized successfully
📍 Region: us-east-1
🗂️  Cache directory: /tmp/arabic_tutor_cache
🎵 Available voices: zeina, hala
🚀 Starting server on http://localhost:5000
```

#### Configure Web App

1. Open the web app: http://localhost:8000
2. Click settings (⚙️)
3. Change "خدمة النطق" to "AWS Polly"
4. Choose voice: زينة (Zeina) for Modern Standard Arabic
5. Click "🎵 اختبار AWS Polly" to test

## 🎵 Available Arabic Voices

### AWS Polly (Recommended)
- **Zeina** - Modern Standard Arabic (Female)
- **Hala** - Gulf Arabic (Female, Neural)

### Azure Cognitive Services
- **ar-SA-HamedNeural** - Saudi Arabic (Male, Neural)
- **ar-EG-SalmaNeural** - Egyptian Arabic (Female, Neural)

### Google Cloud TTS
- **ar-XA-Standard-B** - Arabic (Male)
- **ar-XA-Wavenet-B** - Arabic (Male, WaveNet)

## 📖 Usage

1. **Select Difficulty**: App starts with beginner level
2. **Read the Verse**: Click "ابدأ القراءة" (Start Reading)
3. **Get Feedback**: App compares your pronunciation with expected text
4. **Listen to Reference**: Click "استمع للنموذج" (Listen to Model) for correct pronunciation
5. **Progress**: Complete verses to advance through levels

### Keyboard Shortcuts
- **Ctrl/Cmd + Space**: Start/Stop recording
- **Ctrl/Cmd + P**: Play reference audio
- **Ctrl/Cmd + ←**: Next verse
- **Ctrl/Cmd + →**: Previous verse

## ⚙️ Settings

### Audio Settings
- **Voice Service**: Choose between AWS Polly, Azure, Google, Browser, or Auto
- **Speech Rate**: Adjust from 0.5x to 1.2x speed
- **Accuracy Threshold**: Set required pronunciation accuracy (70-95%)

### Display Settings
- **Show Diacritics**: Toggle Arabic diacritical marks
- **Font Size**: Adjust text size for readability

### AWS Polly Settings
- **Voice**: Choose between Zeina (MSA) or Hala (Gulf)
- **Server URL**: Default is http://localhost:5000

## 🛠️ Troubleshooting

### Render Deployment Issues

**Service Won't Start**
- Check build logs in Render dashboard
- Verify `requirements.txt` contains all dependencies
- Ensure environment variables are set correctly

**AWS Polly Not Working on Render**
- Verify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are set
- Check that your AWS account has Polly permissions
- Test credentials locally first
- Ensure AWS region supports Arabic voices

**Frontend Can't Connect to Backend**
- Update `audio-processor.js` with your Render API URL
- Check CORS settings in Flask server
- Verify both services are deployed and running

**"Service Unavailable" Errors**
- Render free tier services sleep after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up the service
- Consider upgrading to paid tier for always-on services

### Local Development Issues

### AWS Polly Issues

**"AWS Polly server not available"**
- Ensure the Python server is running: `python3 aws-polly-server.py`
- Check if port 5000 is available
- Verify server URL in settings

**"AWS Polly not configured on server"**
- Check AWS credentials are set
- Verify AWS region supports Arabic voices
- Test with: `python3 -c "import boto3; print(boto3.client('polly').describe_voices())"`

**Voice Quality Issues**
- Try different voices (Zeina vs Hala)
- Adjust speech rate in settings
- Check internet connection for cloud TTS services

### General Issues

**Microphone Not Working**
- Allow microphone permissions in browser
- Check microphone settings in OS
- Try refreshing the page

**Speech Recognition Accuracy Low**
- Speak clearly and at moderate pace
- Ensure quiet environment
- Lower accuracy threshold in settings
- Try different browser (Chrome recommended)

## 🏗️ Architecture

```
├── index.html              # Main application interface
├── app.js                  # Core application logic
├── speech-recognition.js   # Arabic speech recognition engine
├── audio-processor.js      # TTS and audio processing
├── bible-texts.js         # Biblical text database
├── styles.css             # Arabic RTL styling
├── aws-polly-server.py    # AWS Polly TTS server
├── requirements.txt       # Python dependencies
└── audio/                 # Prerecorded audio files (optional)
```

## 🔒 Privacy & Security

- **Local Processing**: Speech recognition runs in your browser
- **API Keys**: Stored only in browser's local storage
- **Audio Cache**: AWS Polly responses cached locally for performance
- **No Data Collection**: No user data sent to external servers except TTS requests

## 📚 Biblical Texts Included

### Old Testament (العهد القديم)
- Genesis 1:1-5 (التكوين)
- Psalm 23:1-3 (المزامير)

### New Testament (العهد الجديد)
- Matthew 5:3-5, 6:9-10 (متى)
- John 3:16, 14:6 (يوحنا)
- Romans 8:28 (رومية)

## 🤝 Contributing

1. Add more biblical verses to `bible-texts.js`
2. Record native Arabic audio files in `audio/` directory
3. Improve speech recognition accuracy
4. Add more Arabic voices and languages
5. Enhance UI/UX for better learning experience

## 📄 License

This project is created for educational purposes to help teach Arabic reading in Christian contexts.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Test with the health check: http://localhost:5000/health
3. Enable browser developer console to see detailed error messages

---

**May this tool help many learn to read the Word of God in Arabic! 🙏**