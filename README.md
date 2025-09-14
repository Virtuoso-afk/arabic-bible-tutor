# Arabic Bible Reading Tutor 🎓📖

A frontend-only web application for teaching Arabic reading using biblical texts with browser-based speech recognition and text-to-speech technology.

## 🌟 Features

- **Browser-Based Speech Recognition**: Uses Web Speech API for Arabic speech recognition
- **Built-in Text-to-Speech**: Enhanced browser TTS with optimized Arabic voice selection
- **Biblical Text Database**: Verses from Old and New Testament in Arabic with and without diacritics
- **Progressive Learning**: Beginner, intermediate, and advanced difficulty levels
- **Real-time Audio Visualization**: Visual feedback for pronunciation quality
- **Responsive Arabic UI**: Full RTL support with Arabic fonts
- **Frontend-Only**: No backend required, deploys easily on static hosting platforms

## 🚀 Quick Start - Vercel Deployment (Recommended)

This project is optimized for deployment on Vercel as a static frontend application.

### 1. Prerequisites
- GitHub account  
- Vercel account (free)
- Modern browser with Web Speech API support (Chrome, Edge, Safari)

### 2. Set up AWS Credentials
1. **Create AWS IAM User**:
   - Go to AWS Console → IAM → Users → Create User
   - Grant Polly permissions with this policy:
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
   - Save the Access Key ID and Secret Access Key

### 3. Deploy to Vercel
1. **Fork this repository** to your GitHub account
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your forked repository
   - Choose "Node.js" as the framework preset
   - Deploy!

3. **Add Environment Variables in Vercel**:
   - Go to your project dashboard
   - Settings → Environment Variables
   - Add these variables:
     - `AWS_ACCESS_KEY_ID` = your AWS access key
     - `AWS_SECRET_ACCESS_KEY` = your AWS secret key  
     - `AWS_REGION` = us-east-1 (or your preferred region)

4. **Redeploy**: Your app will now use high-quality AWS Polly voices!

5. **Access your app**: Vercel will provide you with a URL like `https://your-app.vercel.app`

### 4. Local Development
```bash
# Clone your forked repository
git clone https://github.com/your-username/arabic-bible-tutor.git
cd arabic-bible-tutor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your AWS credentials

# Run with Vercel CLI (recommended for testing serverless functions)
npm install -g vercel
vercel dev

# Alternative: Serve static files (AWS TTS won't work)
python3 -m http.server 8000

# Open in browser
open http://localhost:3000  # for vercel dev
# or http://localhost:8000   # for static server
```

## 🛠️ Browser Compatibility

### Recommended Browsers
- **Chrome/Chromium** (Best support for Web Speech API)
- **Microsoft Edge** (Good Arabic speech recognition)
- **Safari** (macOS/iOS - Good Arabic TTS voices)

### Required Browser Features
- Web Speech API (for speech recognition)
- Speech Synthesis API (for text-to-speech)
- Web Audio API (for audio visualization)
- Microphone access permission

## 🎯 Usage

1. **Grant microphone permission** when prompted
2. **Click "ابدأ القراءة" (Start Reading)** to begin
3. **Read the displayed Arabic text** aloud
4. **Get instant feedback** on pronunciation accuracy
5. **Navigate** between verses using next/previous buttons
6. **Adjust settings** using the gear icon:
   - Accuracy threshold
   - Font size
   - Speech rate
   - Show/hide diacritics

## 📱 Features Overview

### Speech Recognition
- Uses browser's native speech recognition
- Optimized for Arabic language
- Real-time interim results
- Automatic silence detection
- Manual stop option

### Text-to-Speech
- Enhanced browser TTS with Arabic voice prioritization
- Adjustable speech rate (0.5x - 1.2x)
- Voice quality scoring
- Fallback voice selection

### Learning System
- Progressive difficulty levels
- Accuracy scoring (70-95% threshold)
- Multiple attempts (up to 3)
- Automatic progression on success
- Visual feedback and highlighting

### Audio Visualization
- Real-time waveform display
- Volume level monitoring
- Visual recording indicators

## 🔧 Technical Details

### Architecture
- **Frontend-Only**: Pure HTML, CSS, JavaScript
- **No Backend**: All processing done in browser
- **Static Hosting**: Compatible with any static hosting service
- **Progressive Web App**: Can be installed on mobile devices

### Browser APIs Used
- Web Speech API (`webkitSpeechRecognition`)
- Speech Synthesis API (`speechSynthesis`)
- Web Audio API (`AudioContext`)
- MediaDevices API (`getUserMedia`)

### File Structure
```
├── index.html              # Main application page
├── styles.css             # Application styles (RTL Arabic UI)
├── app.js                 # Main application logic
├── bible-texts.js         # Biblical text database
├── audio-processor.js     # Audio processing and TTS
├── speech-recognition.js  # Speech recognition handling
├── vercel.json           # Vercel deployment configuration
└── audio/                # Audio assets directory
```

## 🌍 Deployment Options

### Vercel (Recommended)
- Automatic deployments from Git
- Global CDN
- Custom domains
- Analytics
- Perfect for static sites

### Other Static Hosting Options
- **Netlify**: Similar to Vercel with Git integration
- **GitHub Pages**: Free hosting for GitHub repositories
- **Firebase Hosting**: Google's static hosting service
- **Surge.sh**: Simple static hosting

### Manual Deployment
1. Download/clone the repository
2. Upload all files to any web server
3. Ensure `index.html` is the default document
4. Access via your domain/URL

## 📞 Browser Support Notes

### Chrome/Chromium
- Best overall support
- Excellent Arabic speech recognition
- Good Arabic TTS voices (varies by OS)

### Microsoft Edge
- Good speech recognition
- Native Windows Arabic voices
- Recommended for Windows users

### Safari (macOS/iOS)
- Good Arabic TTS voices
- Some Web Speech API limitations
- Works best for TTS functionality

### Firefox
- Limited Web Speech API support
- TTS works well
- May require different speech recognition approach

## 🎓 Educational Features

### Difficulty Levels
- **Beginner**: Simple verses with full diacritics
- **Intermediate**: Mixed diacritics and complexity
- **Advanced**: Minimal diacritics, complex texts

### Learning Aids
- Diacritics toggle (تشكيل)
- Adjustable font sizes
- Reference audio playback
- Visual error highlighting
- Progress tracking

### Accessibility
- Right-to-left (RTL) layout
- High contrast text
- Keyboard shortcuts
- Screen reader compatible
- Mobile-friendly interface

## 🚀 Performance Tips

1. **Use Chrome** for best speech recognition
2. **Enable microphone permissions** before starting
3. **Use in quiet environment** for better accuracy
4. **Speak clearly and at moderate pace**
5. **Ensure stable internet connection** for voice synthesis

## 📝 License

MIT License - Feel free to use for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in multiple browsers
5. Submit a pull request

---

**Happy Learning! 📚✨**