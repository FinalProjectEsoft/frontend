import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ChatMessage {
  user: string;
  bot: string;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Mock AI response (replace with API call)
    const botResponse = `Try ${input} in Arugam Bay! <a href="/activities/1" class="text-blue-600 hover:underline">View Details</a>`;
    
    setMessages([...messages, { user: input, bot: botResponse }]);
    setInput('');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed p-3 text-white transition bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700"
        aria-label="Toggle chatbot"
      >
        <MessageCircle size={24} />
      </button>
      
      {isOpen && (
        <Card className="fixed flex flex-col shadow-xl bottom-20 right-6 w-80 h-96">
          <div className="flex items-center justify-between p-4 border-b bg-blue-50">
            <h3 className="font-semibold text-gray-900">Adventure Assistant</h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500">Ask about activities or packages!</p>
            )}
            {messages.map((msg, index) => (
              <div key={index} className="mb-3">
                <p className="text-sm font-medium text-gray-600">You:</p>
                <p className="text-sm text-gray-800">{msg.user}</p>
                <p className="mt-2 text-sm font-medium text-gray-600">Assistant:</p>
                <div
                  className="text-sm text-gray-800"
                  dangerouslySetInnerHTML={{ __html: msg.bot }}
                />
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about activities..."
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default ChatbotWidget;