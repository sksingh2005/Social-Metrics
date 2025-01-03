import { useState, useEffect, useRef } from 'react';
import { EngagementChart } from '../components/dashboard/EngagementChart';
import { PerformanceInsights } from '../components/dashboard/PerformanceInsights';
import { PostTypeAnalysis } from '../components/dashboard/PostTypeAnalysis';
import { PostAnalytics, PerformanceInsight } from '../types/analytics';

const mockAnalytics: PostAnalytics[] = [];
const mockInsights: PerformanceInsight[] = [
  {
    title: 'Overall Engagement',
    description: 'Engagement rate across all post types',
    metric: '8.2%',
    change: 12.5
  },
  {
    title: 'Comment Activity',
    description: 'Average comments per post',
    metric: '24',
    change: -5.2
  },
  {
    title: 'Share Rate',
    description: 'Average shares per post',
    metric: '156',
    change: 28.3
  }
];

export function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'self' | 'other'; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { sender: 'other', text: event.data }]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && newMessage.trim()) {
      ws.current.send(newMessage);
      setMessages((prev) => [...prev, { sender: 'self', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track and analyze your social media performance</p>
        </header>

        <div className="space-y-6">
          <PerformanceInsights insights={mockInsights} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EngagementChart data={mockAnalytics} />
            <PostTypeAnalysis data={mockAnalytics} />
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        Chat
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          style={{ zIndex: 50 }}
        >
          <div
            className="bg-white w-3/5 h-3/5 rounded-lg shadow-lg flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 bg-blue-600 text-white font-bold flex justify-between">
              <span>Chat</span>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 flex-grow overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === 'self' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.sender === 'self'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center p-4 border-t border-gray-300">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
