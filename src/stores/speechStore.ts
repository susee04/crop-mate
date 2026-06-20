import { create } from 'zustand';
import { useLanguageStore } from './languageStore';

const languageMap: Record<string, string> = {
  en: 'en-US',
  ta: 'ta-IN',
  te: 'te-IN',
  hi: 'hi-IN',
};

interface SpeechStore {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  toggleSpeaking: () => void;
  speak: (text: string) => void;
  setTranscript: (text: string) => void;
}

export const useSpeechStore = create<SpeechStore>((set, get) => ({
  isListening: false,
  isSpeaking: true,
  transcript: '',
  
  startListening: () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;

      const currentLanguage = useLanguageStore.getState().currentLanguage;
      recognition.lang = languageMap[currentLanguage] || 'en-US';
      
      recognition.onstart = () => {
        set({ isListening: true });
      };
      
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        set({ transcript });
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        set({ isListening: false });
      };
      
      recognition.onend = () => {
        set({ isListening: false });
      };
      
      recognition.start();
    } else {
      console.warn('Speech recognition not supported');
    }
  },
  
  stopListening: () => {
    set({ isListening: false });
    // The actual recognition will stop via the onend event
  },
  
  toggleSpeaking: () => {
    const { isSpeaking } = get();
    set({ isSpeaking: !isSpeaking });
  },
  
  speak: (text: string) => {
    const { isSpeaking } = get();
    if (isSpeaking && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const currentLanguage = useLanguageStore.getState().currentLanguage;
      utterance.lang = languageMap[currentLanguage] || 'en-US';
      
      speechSynthesis.speak(utterance);
    }
  },
  
  setTranscript: (text: string) => {
    set({ transcript: text });
  },
}));