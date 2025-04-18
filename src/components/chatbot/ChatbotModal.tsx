import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { activities } from '../../data/mockData';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  activities?: {
    id: string;
    name: string;
  }[];
}

interface ChatbotModalProps {
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m your Sri Lanka adventure assistant. How can I help you find the perfect activity? You can ask me about activities by type (like "surfing"), location, or tell me what you enjoy!',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const userInput = input.toLowerCase();
      let botResponse: Message;

      if (userInput.includes('surfing') || userInput.includes('surf')) {
        const surfingActivities = activities.filter(a => 
          a.type.toLowerCase().includes('surf')
        );
        
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'Here are some great surfing options in Sri Lanka:',
          activities: surfingActivities.map(a => ({ id: a.id, name: a.name })),
        };
      } 
      else if (userInput.includes('hiking') || userInput.includes('trek')) {
        const hikingActivities = activities.filter(a => 
          a.type.toLowerCase().includes('trek') || a.type.toLowerCase().includes('hik')
        );
        
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'Check out these amazing hiking and trekking options:',
          activities: hikingActivities.map(a => ({ id: a.id, name: a.name })),
        };
      }
      else if (userInput.includes('diving') || userInput.includes('water') || userInput.includes('underwater')) {
        const divingActivities = activities.filter(a => 
          a.type.toLowerCase().includes('div') || a.type.toLowerCase().includes('water')
        );
        
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'Sri Lanka has some beautiful diving spots:',
          activities: divingActivities.map(a => ({ id: a.id, name: a.name })),
        };
      }
      else if (userInput.includes('recommend') || userInput.includes('suggest') || userInput.includes('best')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'Based on traveler ratings, here are some top activities I recommend:',
          activities: activities.slice(0, 3).map(a => ({ id: a.id, name: a.name })),
        };
      }
      else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: 'I can help you find activities based on interests like surfing, hiking, diving, or wildlife. You can also ask for recommendations. What type of adventure are you looking for?',
        };
      }
      
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
      <div className="bg-blue-600 text-white p-3">
        <h3 className="font-medium">Adventure Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-100 text-blue-900' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              
              {message.activities && (
                <div className="mt-2 space-y-1">
                  {message.activities.map((activity) => (
                    <div key={activity.id} className="bg-white rounded p-2 text-xs">
                      <Link 
                        to={`/activities/${activity.id}`}
                        className="text-blue-600 hover:underline"
                        onClick={onClose}
                      >
                        {activity.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-3 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about activities..."
          className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <Button 
          type="submit" 
          className="rounded-l-none"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatbotModal;