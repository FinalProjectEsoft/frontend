import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatbotModal from './ChatbotModal';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-50"
        aria-label="Chat with AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;