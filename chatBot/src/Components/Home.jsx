import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Star, Menu, User, Bot, Globe, Sparkles, Mountain, Sun } from 'lucide-react';

const Home = () => {
  const [currentLang, setCurrentLang] = useState('darija');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const languages = {
    darija: {
      name: 'الدارجة',
      flag: '🇲🇦',
      welcome: 'أهلا وسهلا! آنا هنا باش نعاونك فالقراية والتعلم. كيفاش يمكن ليا نعاونك اليوم؟',
      placeholder: 'كتب سؤالك هنا...',
      typing: 'كايكتب...',
      subjects: ['الرياضيات', 'العلوم', 'التاريخ', 'الجغرافيا', 'الفلسفة'],
      footer: 'مساعدك التعليمي بالذكاء الاصطناعي • تعلم بالدارجة المغربية'
    },
    arabic: {
      name: 'العربية',
      flag: '🕌',
      welcome: 'أهلاً وسهلاً بك في المساعد التعليمي المغربي. كيف يمكنني مساعدتك في رحلتك التعليمية اليوم؟',
      placeholder: 'اكتب سؤالك هنا...',
      typing: 'يكتب...',
      subjects: ['الرياضيات', 'العلوم الطبيعية', 'التاريخ والحضارة', 'الجغرافيا', 'الفلسفة والفكر'],
      footer: 'مساعدك التعليمي بالذكاء الاصطناعي • التعلم باللغة العربية'
    },
    french: {
      name: 'Français',
      flag: '🇫🇷',
      welcome: 'Bienvenue dans votre assistant éducatif marocain! Comment puis-je vous aider dans vos études aujourd\'hui?',
      placeholder: 'Tapez votre question ici...',
      typing: 'En train d\'écrire...',
      subjects: ['Mathématiques', 'Sciences', 'Histoire', 'Géographie', 'Philosophie'],
      footer: 'Votre assistant éducatif IA • Apprendre en français'
    },
    english: {
      name: 'English',
      flag: '🇬🇧',
      welcome: 'Welcome to your Moroccan educational assistant! How can I help you with your learning journey today?',
      placeholder: 'Type your question here...',
      typing: 'Typing...',
      subjects: ['Mathematics', 'Science', 'History', 'Geography', 'Philosophy'],
      footer: 'Your AI educational assistant • Learning in English'
    }
  };

  const currentTexts = languages[currentLang];

  useEffect(() => {
    setMessages([{
      id: 1,
      text: currentTexts.welcome,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, [currentLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = {
        darija: 'شكرا ليك على السؤال! آنا هنا باش نعاونك فكولشي. عندك شي سؤال آخر؟',
        arabic: 'شكراً لك على سؤالك الرائع! أنا هنا لمساعدتك في جميع المواد الدراسية.',
        french: 'Merci pour votre question! Je suis là pour vous accompagner dans votre apprentissage.',
        english: 'Thank you for your question! I\'m here to help you with all your educational needs.'
      };

      const botResponse = {
        id: messages.length + 2,
        text: responses[currentLang],
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSubjectClick = (subject) => {
    const prompts = {
      darija: `بغيت نتعلم على ${subject}`,
      arabic: `أريد أن أتعلم عن ${subject}`,
      french: `Je veux apprendre sur ${subject}`,
      english: `I want to learn about ${subject}`
    };
    setInputText(prompts[currentLang]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Moroccan Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #059669 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #dc2626 2px, transparent 2px),
                           radial-gradient(circle at 75% 25%, #d97706 2px, transparent 2px),
                           radial-gradient(circle at 25% 75%, #059669 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Geometric Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-10">
        <div className="w-full h-full border-4 border-emerald-600 rotate-45 rounded-lg"></div>
      </div>
      <div className="absolute top-20 right-20 w-16 h-16 opacity-10">
        <Star className="w-full h-full text-red-600 fill-current" />
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 opacity-10">
        <Mountain className="w-full h-full text-emerald-600" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Ornate Header */}
        <div className="relative">
          {/* Main Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-red-600 text-white relative overflow-hidden">
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`
              }}></div>
            </div>
            
            <div className="relative z-10 max-w-6xl mx-auto p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                      <BookOpen className="w-8 h-8 text-white" />
                      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-emerald-300" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-1 flex items-center">
                      المساعد التعليمي المغربي
                      <Sun className="ml-2 w-6 h-6 text-emerald-300 animate-pulse" />
                    </h1>
                    <p className="text-lg opacity-90 font-medium">رفيقك في رحلة المعرفة والتعلم</p>
                  </div>
                </div>
                
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="text-lg">{currentTexts.flag}</span>
                    <span className="font-medium">{currentTexts.name}</span>
                  </button>
                  
                  {showLangMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-emerald-200 overflow-hidden z-50 min-w-56 transform transition-all duration-300 ease-out">
                      {Object.entries(languages).map(([key, lang]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setCurrentLang(key);
                            setShowLangMenu(false);
                          }}
                          className={`w-full px-6 py-4 text-left hover:bg-emerald-50 transition-all duration-200 flex items-center space-x-3 border-b border-emerald-100 last:border-b-0 ${
                            currentLang === key ? 'bg-emerald-100 text-emerald-800 shadow-inner' : 'text-gray-700 hover:text-emerald-700'
                          }`}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="font-semibold text-lg">{lang.name}</span>
                          {currentLang === key && (
                            <div className="ml-auto w-3 h-3 bg-emerald-500 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Border */}
          <div className="h-4 bg-gradient-to-r from-emerald-600 via-red-600 via-emerald-500 to-red-600 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 max-w-5xl mx-auto w-full p-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden h-[70vh] relative">
            {/* Moroccan Corner Decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-red-500" style={{
                clipPath: 'polygon(0 0, 100% 0, 0 100%)'
              }}></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
              <div className="w-full h-full bg-gradient-to-bl from-emerald-500 to-red-500" style={{
                clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
              }}></div>
            </div>

            <div className="h-full flex flex-col relative z-10">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-4 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                      message.sender === 'bot' 
                        ? 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 border-2 border-white' 
                        : 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 border-2 border-white'
                    }`}>
                      {message.sender === 'bot' ? (
                        <Bot className="w-6 h-6 text-white" />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className={`max-w-md ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`rounded-3xl px-6 py-4 shadow-lg relative ${
                        message.sender === 'bot'
                          ? 'bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 border-2 border-emerald-200'
                          : 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white border-2 border-blue-300'
                      }`}>
                        {/* Message Tail */}
                        <div className={`absolute top-4 w-0 h-0 ${
                          message.sender === 'bot' 
                            ? 'left-[-8px] border-r-8 border-r-emerald-200 border-t-8 border-t-transparent border-b-8 border-b-transparent'
                            : 'right-[-8px] border-l-8 border-l-blue-500 border-t-8 border-t-transparent border-b-8 border-b-transparent'
                        }`}></div>
                        
                        <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 px-2">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 flex items-center justify-center shadow-lg border-2 border-white">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 border-2 border-emerald-200 rounded-3xl px-6 py-4 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600 mr-2">{currentTexts.typing}</span>
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-emerald-200 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={currentTexts.placeholder}
                      className={`w-full px-6 py-4 border-2 border-emerald-300 rounded-2xl resize-none focus:border-emerald-500 focus:outline-none bg-white/80 backdrop-blur-sm shadow-lg ${
                        currentLang === 'arabic' || currentLang === 'darija' ? 'text-right' : 'text-left'
                      }`}
                      rows="1"
                      style={{ minHeight: '56px', maxHeight: '140px' }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-400 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Quick Actions */}
          <div className="mt-6 flex justify-center">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/50">
              <div className="flex flex-wrap justify-center gap-3">
                {currentTexts.subjects.map((subject, index) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectClick(subject)}
                    className="group px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                  >
                    <span className="flex items-center space-x-2">
                      <Star className="w-4 h-4 group-hover:animate-spin" />
                      <span>{subject}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto border border-white/50">
            <p className="text-sm text-gray-700 font-medium">
              {currentTexts.footer}
            </p>
          </div>
        </div>
      </div>

      {/* Click outside to close language menu */}
      {showLangMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLangMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default Home;