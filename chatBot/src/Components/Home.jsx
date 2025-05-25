import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Globe, BookOpen, GraduationCap, Users, Star, Volume2, Square } from 'lucide-react';

const MoroccanChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ar');
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Translation object
  const translations = {
    ar: {
      title: "البوصلة الأكاديمية",
      subtitle: "مساعدك الذكي للتوجيه التعليمي والمهني",
      welcomeMessage: "مرحباً! أنا مساعدك الأكاديمي. كيف يمكنني مساعدتك اليوم في اختيار مسارك التعليمي أو المهني؟",
      placeholder: "اكتب رسالتك هنا...",
      listening: "أستمع...",
      features: {
        paths: "المسارات التعليمية",
        universities: "الجامعات المغربية", 
        exams: "المسابقات والامتحانات",
        career: "استشارة مهنية"
      },
      footer: "مساعدك الذكي للمستقبل - توجيه أكاديمي ومهني بالذكاء الاصطناعي",
      botResponse: "شكراً لسؤالك! يمكنني مساعدتك في اختيار المسار التعليمي المناسب. هل تريد معرفة المزيد عن الجامعات المغربية أو المسابقات؟"
    },
    fr: {
      title: "La Boussole Académique",
      subtitle: "Votre assistant intelligent pour l'orientation éducative et professionnelle",
      welcomeMessage: "Bonjour! Je suis votre assistant académique. Comment puis-je vous aider aujourd'hui à choisir votre parcours éducatif ou professionnel?",
      placeholder: "Tapez votre message ici...",
      listening: "J'écoute...",
      features: {
        paths: "Parcours Éducatifs",
        universities: "Universités Marocaines",
        exams: "Concours et Examens", 
        career: "Conseil Professionnel"
      },
      footer: "Votre assistant intelligent pour l'avenir - Orientation académique et professionnelle par IA",
      botResponse: "Merci pour votre question! Je peux vous aider à choisir le bon parcours éducatif. Voulez-vous en savoir plus sur les universités marocaines ou les concours?"
    },
    en: {
      title: "Academic Compass",
      subtitle: "Your smart assistant for educational and career guidance",
      welcomeMessage: "Hello! I'm your academic assistant. How can I help you today in choosing your educational or career path?",
      placeholder: "Type your message here...",
      listening: "Listening...",
      features: {
        paths: "Educational Paths",
        universities: "Moroccan Universities",
        exams: "Competitions & Exams",
        career: "Career Counseling"
      },
      footer: "Your smart assistant for the future - Academic and career guidance with AI",
      botResponse: "Thank you for your question! I can help you choose the right educational path. Would you like to know more about Moroccan universities or entrance exams?"
    },
    darija: {
      title: "بوصولتك الدراسية",
      subtitle: "المساعد الذكي ديالك للتوجيه فالدراسة والخدمة",
      welcomeMessage: "أهلا وسهلا! أنا المساعد ديالك فالدراسة. كيفاش يمكنني نعاونك اليوم باش تختار الطريق ديالك فالتعليم أو الخدمة؟",
      placeholder: "كتب الرسالة ديالك هنا...",
      listening: "كنسمع...",
      features: {
        paths: "الطرق ديال التعليم",
        universities: "الجامعات المغربية",
        exams: "المباريات والامتحانات",
        career: "المشورة فالخدمة"
      },
      footer: "المساعد الذكي ديالك للمستقبل - توجيه فالدراسة والخدمة بالذكاء الاصطناعي",
      botResponse: "شكرا على السؤال ديالك! يمكنني نعاونك باش تختار الطريق التعليمي المناسب. واش بغيتي تعرف أكثر على الجامعات المغربية أو المباريات؟"
    }
  };

  const currentLang = translations[selectedLanguage];
  const isRTL = selectedLanguage === 'ar' || selectedLanguage === 'darija';

  // Speech Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      // Language mapping for speech recognition
      const langMap = {
        'ar': 'ar-SA',
        'fr': 'fr-FR',
        'en': 'en-US',
        'darija': 'ar-MA' // Try Moroccan Arabic, fallback to standard Arabic
      };
      
      recognitionInstance.lang = langMap[selectedLanguage] || 'ar-SA';
      recognitionInstance.interimResults = true;
      recognitionInstance.continuous = false;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setIsRecording(true);
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInputMessage(finalTranscript);
        } else {
          setInputMessage(interimTranscript);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
        
        // Handle specific errors
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access to use voice input.');
        } else if (event.error === 'no-speech') {
          alert('No speech detected. Please try again.');
        }
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
  }, [selectedLanguage]);

  // Initialize with welcome message when language changes
  useEffect(() => {
    setMessages([{
      id: 1,
      text: currentLang.welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
      language: selectedLanguage
    }]);
  }, [selectedLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Mock API call - In real implementation, this would call your FastAPI backend
  const callRAGAPI = async (message) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on language and content
      let response = currentLang.botResponse;
      
      // Simple keyword-based responses for demo
      const lowerMessage = message.toLowerCase();
      
      if (selectedLanguage === 'ar' || selectedLanguage === 'darija') {
        if (lowerMessage.includes('جامعة') || lowerMessage.includes('جامعات')) {
          response = selectedLanguage === 'darija' 
            ? "فالمغرب كاين بزاف د الجامعات الزوينة. عندك جامعة محمد الخامس فالرباط، وجامعة الحسن الثاني فالدار البيضاء. أشنو التخصص اللي بغيتي تقرا فيه؟"
            : "في المغرب توجد جامعات ممتازة مثل جامعة محمد الخامس في الرباط وجامعة الحسن الثاني في الدار البيضاء. ما التخصص الذي تريد دراسته؟";
        } else if (lowerMessage.includes('مبارة') || lowerMessage.includes('مباريات') || lowerMessage.includes('امتحان')) {
          response = selectedLanguage === 'darija'
            ? "المباريات فالمغرب كثيرة. عندك مبارة ولوج الطب، والمهندسين، والمدارس العليا. واش بغيتي تعرف على مبارة معينة؟"
            : "هناك مسابقات مختلفة في المغرب مثل مسابقة الطب والهندسة والمدارس العليا. هل تريد معلومات عن مسابقة معينة؟";
        }
      } else if (selectedLanguage === 'fr') {
        if (lowerMessage.includes('université') || lowerMessage.includes('universités')) {
          response = "Le Maroc dispose d'excellentes universités comme l'Université Mohammed V à Rabat et l'Université Hassan II à Casablanca. Quelle spécialité vous intéresse?";
        } else if (lowerMessage.includes('concours') || lowerMessage.includes('examen')) {
          response = "Il existe plusieurs concours au Maroc : médecine, ingénierie, grandes écoles. Sur quel concours souhaitez-vous des informations?";
        }
      } else if (selectedLanguage === 'en') {
        if (lowerMessage.includes('university') || lowerMessage.includes('universities')) {
          response = "Morocco has excellent universities like Mohammed V University in Rabat and Hassan II University in Casablanca. What field of study interests you?";
        } else if (lowerMessage.includes('exam') || lowerMessage.includes('competition')) {
          response = "There are various entrance exams in Morocco: medicine, engineering, business schools. Which exam would you like to know about?";
        }
      }
      
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      return "آسف، حدث خطأ. يرجى المحاولة مرة أخرى.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date(),
        language: selectedLanguage
      };
      
      setMessages(prev => [...prev, newMessage]);
      const messageToSend = inputMessage;
      setInputMessage('');
      
      // Get bot response
      const botResponseText = await callRAGAPI(messageToSend);
      
      const botResponse = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, botResponse]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Safari, or Edge.');
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      setInputMessage(''); // Clear input when starting to record
      recognition.start();
    }
  };

  // Text-to-Speech function for bot responses
  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language for TTS
      const langMap = {
        'ar': 'ar-SA',
        'fr': 'fr-FR',
        'en': 'en-US',
        'darija': 'ar-SA' // Use Arabic for Darija
      };
      
      utterance.lang = langMap[selectedLanguage] || 'ar-SA';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      speechSynthesis.speak(utterance);
    }
  };

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'darija', name: 'الدارجة', flag: '🇲🇦' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 flex flex-col">
      {/* Moroccan Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B45309' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3Ccircle cx='0' cy='0' r='8'/%3E%3Ccircle cx='60' cy='60' r='8'/%3E%3Ccircle cx='0' cy='60' r='8'/%3E%3Ccircle cx='60' cy='0' r='8'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <header className="relative bg-red-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-red-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentLang.title}</h1>
                <p className="text-red-100 text-sm">{currentLang.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white/20 text-white rounded-lg px-3 py-2 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="text-gray-800">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-4xl mx-auto px-4">
          
          {/* Feature Pills */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-amber-200 flex items-center space-x-3 hover:shadow-xl transition-all duration-300">
                <BookOpen className="w-5 h-5 text-red-700" />
                <span className="text-sm font-medium text-gray-700">{currentLang.features.paths}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-amber-200 flex items-center space-x-3 hover:shadow-xl transition-all duration-300">
                <GraduationCap className="w-5 h-5 text-red-700" />
                <span className="text-sm font-medium text-gray-700">{currentLang.features.universities}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-amber-200 flex items-center space-x-3 hover:shadow-xl transition-all duration-300">
                <Globe className="w-5 h-5 text-red-700" />
                <span className="text-sm font-medium text-gray-700">{currentLang.features.exams}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-amber-200 flex items-center space-x-3 hover:shadow-xl transition-all duration-300">
                <Users className="w-5 h-5 text-red-700" />
                <span className="text-sm font-medium text-gray-700">{currentLang.features.career}</span>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-200 overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/50 to-amber-50/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-red-700 text-white'
                        : 'bg-white text-gray-800 border border-amber-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm leading-relaxed flex-1">{message.text}</p>
                      {message.sender === 'bot' && (
                        <button
                          onClick={() => speakResponse(message.text)}
                          className="ml-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
                          title="Listen to response"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-red-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString(
                        selectedLanguage === 'ar' ? 'ar-MA' : 
                        selectedLanguage === 'fr' ? 'fr-FR' :
                        selectedLanguage === 'darija' ? 'ar-MA' : 'en-US', 
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="bg-white text-gray-800 border border-amber-200 px-4 py-3 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-600">جاري الكتابة...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Voice Recording Indicator */}
            {isListening && (
              <div className="bg-red-50 border-t border-red-200 px-4 py-2">
                <div className="flex items-center justify-center space-x-2" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-700 font-medium">{currentLang.listening}</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-amber-200 bg-white/90 backdrop-blur-sm p-4">
              <div className="flex items-center space-x-3" dir={isRTL ? 'rtl' : 'ltr'}>
                <button
                  onClick={toggleRecording}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isRecording 
                      ? 'bg-red-600 text-white shadow-lg scale-110 animate-pulse' 
                      : 'bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-red-600'
                  }`}
                  title={isRecording ? 'Stop recording' : 'Start voice input'}
                >
                  {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? currentLang.listening : currentLang.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-amber-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 bg-white/90 backdrop-blur-sm"
                    dir={isRTL ? 'rtl' : 'ltr'}
                    disabled={isLoading || isListening}
                  />
                </div>
                
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputMessage.trim() || isLoading || isListening}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-red-900 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-amber-400" fill="currentColor" />
            <span className="text-sm font-medium">{currentLang.footer}</span>
            <Star className="w-5 h-5 text-amber-400" fill="currentColor" />
          </div>
          <div className="text-xs text-red-200 mt-2">
            🇲🇦 Powered by AI • Made with ❤️ for Moroccan Students
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MoroccanChatBot;
