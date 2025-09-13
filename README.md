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

## 🌐 Deploy to AWS App Runner (Recommended)

This project is optimized for deployment on AWS App Runner with seamless AWS Polly integration.

### 1. Prerequisites
- GitHub account  
- AWS account with App Runner and Polly access
- Basic familiarity with AWS Console

### 2. Setup IAM Role (Recommended)

**Option A: IAM Role (Most Secure)**
1. Go to **IAM Console** → **Policies** → **Create Policy**
2. Use this JSON policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow", 
            "Action": [
                "polly:SynthesizeSpeech",
                "polly:DescribeVoices"
            ],
            "Resource": "*"
        }
    ]
}
```
3. Name: `ArabicBibleTutorPollyPolicy`
4. Create **IAM Role** → **AWS Service** → **App Runner** 
5. Attach the policy, name: `ArabicBibleTutorAppRunnerRole`
6. Copy the Role ARN

**Option B: Access Keys (Simpler)**
- Use your existing AWS access keys
- Set as environment variables in App Runner

### 3. GitHub Setup

```bash
# Push your project to GitHub (if not done already)
git remote add origin https://github.com/yourusername/arabic-bible-tutor.git
git branch -M main  
git push -u origin main
```

### 4. Deploy Backend on App Runner

1. **Go to AWS App Runner Console**
2. **Create Service:**
   - Source: Repository → GitHub
   - Connect your GitHub account
   - Select repository: `arabic-bible-tutor`
   - Branch: `main`

3. **Configure Build:**
   - Runtime: Python 3.11
   - Build command: `pip install -r requirements.txt`
   - Start command: `python aws-polly-server.py`
   - Port: `8000`

4. **Configure Service:**
   - Service name: `arabic-bible-tutor-api`
   - **Instance Role**: Select `ArabicBibleTutorAppRunnerRole` (if using IAM)
   - **Environment Variables** (only if not using IAM):
     - `AWS_ACCESS_KEY_ID` = your access key
     - `AWS_SECRET_ACCESS_KEY` = your secret key
     - `AWS_REGION` = us-east-1

5. **Deploy** (takes 3-5 minutes)

### 5. Deploy Frontend on S3 + CloudFront

1. **Create S3 Bucket:**
   - Bucket name: `arabic-bible-tutor-frontend`
   - Enable static website hosting
   - Upload all frontend files: `index.html`, `styles.css`, `app.js`, etc.

2. **Update API URL:**
   - Update `audio-processor.js` with your App Runner URL:
   ```javascript
   const TTS_SERVICE_URL = 'https://your-app-id.region.awsapprunner.com';
   ```

3. **Optional: CloudFront Distribution:**
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Custom domain if desired

### 6. Test Deployment

1. Visit your App Runner service URL: `/health`
2. Test your S3 frontend
3. Verify Polly integration works
4. Check browser console for any CORS issues

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

### App Runner Deployment Issues

**Service Won't Start**
- Check build logs in App Runner console
- Verify `requirements.txt` contains all dependencies  
- Ensure `apprunner.yaml` configuration is correct
- Check that Python runtime version is supported

**IAM Role Issues**
- Verify IAM role has Polly permissions
- Check that role is attached to App Runner service
- Ensure role trust policy allows App Runner
- Test with access keys first to isolate IAM issues

**AWS Polly Not Working**
- Test IAM permissions with AWS CLI: `aws polly describe-voices`
- Verify App Runner is in same region as Polly service
- Check CloudWatch logs for detailed error messages
- Ensure AWS region supports Arabic voices

**Frontend Can't Connect to Backend**
- Update `audio-processor.js` with your App Runner URL
- Check CORS settings in Flask server
- Verify App Runner service is running and healthy
- Test backend endpoints directly: `/health`, `/voices`

**CORS Errors**
- App Runner URLs are HTTPS - ensure frontend uses HTTPS
- Verify Flask CORS configuration allows your frontend domain
- Check browser developer tools for specific CORS errors

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