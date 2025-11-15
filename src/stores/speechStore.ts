import { create } from 'zustand';

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
      recognition.lang = 'en-US'; // This should be dynamic based on selected language
      
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
      
      // Set language based on current language selection
      // This should be dynamic based on selected language
      utterance.lang = 'en-US';
      
      speechSynthesis.speak(utterance);
    }
  },
  
  setTranscript: (text: string) => {
    set({ transcript: text });
  },
}));