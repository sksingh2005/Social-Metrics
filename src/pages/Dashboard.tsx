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
  const [startDate, setStartDate] = useState(format(new Date('2024-12-01'), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date('2024-12-10'), 'yyyy-MM-dd'));

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

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setMessages((prev) => [...prev, { text: inputMessage, type: 'user' }]);

    try {
      const response = await fetch('https://my-app.shashanksgh3.workers.dev/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_value: inputMessage }),
      });

      const data = await response.json();

      if (response.ok && data?.response) {
        setMessages((prev) => [...prev, { text: data.response, type: 'response' }]);
      } else {
        throw new Error(data?.error || 'Invalid server response');
      }
    } catch (err) {
      setError(err.message || 'Error sending message');
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  }, [inputMessage, isLoading]);

  const renderMessageText = (text) => {
    if (!text) return 'Invalid message text';
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      parts.push(text.slice(lastIndex, match.index));
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }

    parts.push(text.slice(lastIndex));
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
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageCircle />
      </button>
      {isChatOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-3/5 h-3/5 rounded-lg flex flex-col">
            <div className="p-4 bg-blue-600 text-white flex justify-between">
              <span>Chat</span>
              <button onClick={() => setIsChatOpen(false)}>&times;</button>
            </div>
            <div className="p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                    {renderMessageText(msg.text)}
                  </span>
                </div>
              ))}
              {isLoading && <Loader2 className="animate-spin text-gray-500" />}
            </div>
            <div className="p-4 flex items-center">
              <input
                type="text"
                className="flex-grow p-2 border rounded-lg"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={sendMessage} disabled={isLoading || !inputMessage.trim()}>
                <Send />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;