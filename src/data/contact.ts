// The "Hello" greeting cycles through these, one every few seconds.
// Each entry: the word, and the language name shown under it. The first is shown on load.
export const greetings: { word: string; language: string }[] = [
  { word: "Hello", language: "English" },
  { word: "నమస్కారం", language: "Telugu" },
  { word: "नमस्ते", language: "Hindi" },
  { word: "ನಮಸ್ಕಾರ", language: "Kannada" },
  { word: "வணக்கம்", language: "Tamil" },
  { word: "Hola", language: "Spanish" },
  { word: "Bonjour", language: "French" },
  { word: "こんにちは", language: "Japanese" },
  { word: "Ciao", language: "Italian" },
  { word: "안녕하세요", language: "Korean" },
];

// Links (email, LinkedIn, GitHub, résumé) live in profile.ts, not here.
export const contact = {
  heading: "Let's connect",
  lead: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!",
};
