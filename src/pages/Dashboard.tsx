import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { DateRangePicker } from '../components/DateRangePicker';
import { PieChart } from '../components/charts2/PieChart';
import { PerformanceInsights } from '../components/dashboard/PerformanceInsights';

import { useAnalytics } from '../components/hooks/useAnalytics';
import { TimeSeriesChart } from '../components/charts2/TimeSeriesChart';
import { EngagementChart2 } from '../components/EngagementChart2';
import { PostAnalytics, PerformanceInsight } from '../types/analytics';
import { PostTypeAnalysis } from '../components/dashboard/PostTypeAnalysis';
import { MessageCircle, Send, Loader2 } from 'lucide-react';

const Dashboard = () => {
  // State for date range
  const [startDate, setStartDate] = useState(format(new Date('2024-12-01'), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date('2024-12-10'), 'yyyy-MM-dd'));

  // Mock data
  const mockAnalytics: PostAnalytics[] = [];
  const mockInsights: PerformanceInsight[] = [
    {
      title: 'Overall Engagement',
      description: 'Engagement rate across all post types',
      metric: '8.2%',
      change: 12.5,
    },
    {
      title: 'Comment Activity',
      description: 'Average comments per post',
      metric: '24',
      change: -5.2,
    },
    {
      title: 'Share Rate',
      description: 'Average shares per post',
      metric: '156',
      change: 28.3,
    },
  ];

  const { filteredData } = useAnalytics(startDate, endDate);

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(null);

  // WebSocket connection setup
  useEffect(() => {
    const wsConnection = new WebSocket('ws://localhost:8080');

    wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'response') {
        setMessages((prev) => [...prev, { text: data.message, type: 'response' }]);
        setIsLoading(false);
      } else if (data.type === 'error') {
        setError(data.message);
        setIsLoading(false);
      }
    };

    wsConnection.onerror = () => {
      setError('WebSocket connection error');
      setIsLoading(false);
    };

    setWs(wsConnection);

    return () => {
      wsConnection.close();
    };
  }, []);

  // Send message handler
  const sendMessage = useCallback(() => {
    if (!inputMessage.trim() || !ws || isLoading) return;

    setIsLoading(true);
    setError(null);
    setMessages((prev) => [...prev, { text: inputMessage, type: 'user' }]);

    ws.send(
      JSON.stringify({
        type: 'message',
        message: inputMessage,
      })
    );

    setInputMessage('');
  }, [inputMessage, ws, isLoading]);

  // Function to render text with bold if wrapped in **
  const renderMessageText = (text) => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      parts.push(text.slice(lastIndex, match.index)); // Text before bold part
      parts.push(<strong key={match.index}>{match[1]}</strong>); // Bold part
      lastIndex = regex.lastIndex;
    }

    parts.push(text.slice(lastIndex)); // Remaining text after last bold part

    return parts;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Social Media Analytics Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your social media performance metrics</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>
        </div>

        <div className="space-y-6">
          <PerformanceInsights insights={mockInsights} />
          <div className="mt-8">
            <TimeSeriesChart data={filteredData} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PostTypeAnalysis data={mockAnalytics} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EngagementChart2 data={filteredData} />
          <PieChart data={filteredData} />
        </div>
      </div>

      {/* Chat Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        <MessageCircle />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-3/5 h-3/5 rounded-lg shadow-lg flex flex-col">
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
                  className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex items-center p-4 border-t border-gray-300">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
              />
              <button
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
