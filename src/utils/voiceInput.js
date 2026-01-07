import * as Speech from 'expo-speech';

/*
 NOTE:
 Expo does NOT have full offline speech-to-text.
 So we simulate AI voice assistance using:
 - Voice prompts
 - Simple speech input via keyboard mic (Android)
 - Multilingual support
*/

export function speak(text, lang = 'en') {
  Speech.speak(text, {
    language: lang === 'te' ? 'te-IN' : 'en-US',
    rate: 0.9,
  });
}
