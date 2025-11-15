import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BaseCrudService } from '@/integrations';
import { ChatHistory } from '@/entities';
import { useMember } from '@/integrations';
import { useLanguageStore } from '@/stores/languageStore';
import { useSpeechStore } from '@/stores/speechStore';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [isListeningInChat, setIsListeningInChat] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [showSpokenText, setShowSpokenText] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { member, isAuthenticated } = useMember();
  const { t } = useLanguageStore();
  const { speak, isListening, startListening, stopListening, isSpeaking, toggleSpeaking, transcript } = useSpeechStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && isAuthenticated && member) {
      loadChatHistory();
    }
  }, [isOpen, isAuthenticated, member]);

  // Handle speech recognition results
  useEffect(() => {
    if (isListeningInChat && !isListening) {
      // Speech recognition ended, check if we got any text
      setIsListeningInChat(false);
      if (spokenText.trim()) {
        setShowSpokenText(true);
        setTimeout(() => setShowSpokenText(false), 3000); // Hide after 3 seconds
      }
    }
  }, [isListening, isListeningInChat, spokenText]);

  // Handle transcript updates from speech store
  useEffect(() => {
    if (isListeningInChat && transcript.trim()) {
      setSpokenText(transcript);
      setInputValue(transcript);
    }
  }, [transcript, isListeningInChat]);

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
      setIsListeningInChat(false);
    } else {
      setSpokenText('');
      setShowSpokenText(false);
      setIsListeningInChat(true);
      startListening();
    }
  };

  const loadChatHistory = async () => {
    const memberId = (member as any)?._id;
    if (!memberId) return;
    
    try {
      const { items } = await BaseCrudService.getAll<ChatHistory>('chathistory');
      const userChats = items
        .filter(chat => chat.userId === memberId)
        .sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime())
        .slice(-10); // Load last 10 messages

      const loadedMessages: Message[] = [];
      userChats.forEach(chat => {
        if (chat.userMessage) {
          loadedMessages.push({
            id: `${chat._id}_user`,
            type: 'user',
            content: chat.userMessage,
            timestamp: new Date(chat.timestamp || chat._createdDate || Date.now())
          });
        }
        if (chat.aiResponse) {
          loadedMessages.push({
            id: `${chat._id}_ai`,
            type: 'ai',
            content: chat.aiResponse,
            timestamp: new Date(chat.timestamp || chat._createdDate || Date.now())
          });
        }
      });

      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Mock AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('crop') || lowerMessage.includes('plant')) {
      return `Based on your question about crops, I recommend checking our crops section for detailed information about planting, care, and harvesting. For specific crop advice, consider factors like your soil type, climate, and local conditions. Would you like me to help you with a particular crop?`;
    }
    
    if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('bug')) {
      return `For pest management, it's important to first identify the specific pest affecting your crops. I can help you with both organic and chemical treatment options. Check our pests section for detailed identification guides and treatment methods. What type of crop are you dealing with?`;
    }
    
    if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer')) {
      return `Soil health is crucial for successful farming. Different soil types require different management approaches. I recommend testing your soil pH and nutrient levels first. Our soil section has comprehensive information about soil types and improvement methods. What's your current soil condition?`;
    }
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('climate')) {
      return `Weather plays a vital role in farming decisions. I can provide current weather information and agricultural insights. For irrigation planning, consider both current conditions and forecasts. Check our weather section for detailed agricultural weather guidance.`;
    }
    
    if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('sell')) {
      return `Market prices fluctuate based on demand, season, and quality. I can help you analyze current market trends and suggest optimal selling times. Our market section provides real-time price information and demand analysis. Which crop are you planning to sell?`;
    }
    
    if (lowerMessage.includes('disease') || lowerMessage.includes('sick') || lowerMessage.includes('problem')) {
      return `Plant diseases can significantly impact your harvest. Early detection is key. You can use our disease detection feature to upload photos of affected plants for AI analysis. I can also provide information about common diseases and their treatments. What symptoms are you observing?`;
    }
    
    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      return `Efficient water management is essential for sustainable farming. I can suggest irrigation techniques based on your crop type and local conditions. Our water management section covers various irrigation methods and conservation tips. What's your current irrigation setup?`;
    }
    
    if (lowerMessage.includes('government') || lowerMessage.includes('scheme') || lowerMessage.includes('loan')) {
      return `There are various government schemes available for farmers including subsidies, loans, and insurance programs. I can help you find schemes you're eligible for. Our schemes section has detailed information about application processes and benefits. What type of support are you looking for?`;
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      return `Hello! I'm your AI farming assistant. I can help you with crops, pests, soil management, weather information, market prices, government schemes, and much more. What farming question can I help you with today?`;
    }
    
    // Default response
    return `Thank you for your question! I'm here to help with all your farming needs. I can provide information about crops, pest management, soil health, weather conditions, market prices, government schemes, and more. Could you please be more specific about what you'd like to know? You can also explore our different sections for detailed information.`;
  };

  const saveChatToHistory = async (userMessage: string, aiResponse: string) => {
    const memberId = (member as any)?._id;
    if (!isAuthenticated || !memberId) return;

    try {
      await BaseCrudService.create('chathistory', {
        _id: crypto.randomUUID(),
        conversationId,
        userId: memberId,
        userMessage,
        aiResponse,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setSpokenText('');
    setShowSpokenText(false);

    // Add user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(userMessage);
      
      // Add AI message
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);

      // Speak the AI response if speech is enabled
      if (isSpeaking) {
        speak(aiResponse);
      }

      // Save to database if user is authenticated
      if (isAuthenticated) {
        await saveChatToHistory(userMessage, aiResponse);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMsg: Message = {
        id: `error_${Date.now()}`,
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 h-96 flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-heading font-semibold">Crop Mate AI</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-primary/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <Bot className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-paragraph">
                        {isAuthenticated 
                          ? "Hello! Ask me anything about farming."
                          : "Sign in to save your chat history."
                        }
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="h-3 w-3" />
                          ) : (
                            <Bot className="h-3 w-3" />
                          )}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                        }`}>
                          <p className="text-sm font-paragraph">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <p className="text-sm font-paragraph">Thinking...</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t">
                {/* Voice Controls */}
                <div className="flex space-x-2 mb-3">
                  <Button
                    variant={isListeningInChat ? "destructive" : "outline"}
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`relative transition-all duration-300 ${
                      isListeningInChat 
                        ? 'bg-destructive text-destructive-foreground shadow-lg animate-pulse' 
                        : 'hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    {isListeningInChat ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Recording...</span>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Voice</span>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSpeaking}
                    className={`transition-all duration-300 ${
                      isSpeaking 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-secondary hover:text-secondary-foreground'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <Volume2 className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Audio On</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">Audio Off</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Spoken Text Display */}
                <AnimatePresence>
                  {(showSpokenText || isListeningInChat) && spokenText && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
                    >
                      <div className="flex items-start space-x-2">
                        <Mic className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">
                            {isListeningInChat ? "You're saying:" : "You said:"}
                          </p>
                          <p className="text-sm font-paragraph text-blue-900 dark:text-blue-100">
                            "{spokenText}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Listening Indicator */}
                <AnimatePresence>
                  {isListeningInChat && !spokenText && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <p className="text-sm font-paragraph text-red-800 dark:text-red-200">
                          Listening... Speak now
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Text Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListeningInChat ? "Listening..." : "Ask me about farming..."}
                    disabled={isLoading || isListeningInChat}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading || isListeningInChat}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg"
          size="lg"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>
    </div>
  );
};