# Audio Files Directory

This directory should contain high-quality Arabic audio recordings for biblical verses.

## File Naming Convention

Use the following pattern for audio files:
- `{book}_{chapter}_{verse}.mp3`
- Example: `genesis_1_1.mp3` for Genesis 1:1

## Supported Audio Formats
- MP3 (recommended)
- WAV
- OGG

## Recording Guidelines

For best results when recording Arabic biblical verses:

1. **Native Speaker**: Use native Arabic speakers for recordings
2. **Clear Pronunciation**: Emphasize proper Arabic pronunciation with tajweed rules
3. **Moderate Speed**: Record at a pace suitable for learning (slower than normal speech)
4. **Quality**: Use high-quality recording equipment (minimum 16kHz, 128kbps)
5. **Environment**: Record in a quiet environment without echo

## Currently Mapped Verses

The application is configured to look for these audio files:

- `genesis_1_1.mp3` - "في البدء خلق الله السماوات والأرض"
- `genesis_1_3.mp3` - "وقال الله ليكن نور فكان نور"
- `psalm_23_1.mp3` - "الرب راعي فلا يعوزني شيء"

## Adding New Audio Files

1. Record the verse audio following the guidelines above
2. Save the file using the naming convention
3. Place the file in this directory
4. The application will automatically detect and use the audio file

## Cloud TTS Alternative

If audio files are not available, the application will fall back to:
1. Azure Cognitive Services TTS (requires API key)
2. Google Cloud TTS (requires API key)
3. Enhanced browser TTS with optimized Arabic settings
4. Standard browser TTS

To enable cloud TTS services, configure the API keys in the application settings.