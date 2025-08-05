import { useState } from 'react';
import { Send, Copy, Edit, RotateCcw, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { ChatMessage, Draft } from '@/types';

interface ChatInterfaceProps {
  selectedPlatform: 'linkedin' | 'twitter';
}

export function ChatInterface({ selectedPlatform }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const { chatMessages, addChatMessage, addDraft } = useApp();

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    addChatMessage(userMessage);

    // Simulate AI response (in real app, this would call your AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, selectedPlatform);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Here\'s a post for ' + selectedPlatform + ':',
        timestamp: new Date(),
        draft: aiResponse
      };
      addChatMessage(assistantMessage);
    }, 1000);

    setInput('');
  };

  const generateAIResponse = (prompt: string, platform: 'linkedin' | 'twitter') => {
    // This is a simplified AI response generator
    // In a real app, this would call your AI API
    const content = platform === 'linkedin' 
      ? `🚀 ${prompt}\n\nHere's my take on this topic:\n\n• Key insight 1\n• Key insight 2\n• Key insight 3\n\nWhat's your experience with this? Share in the comments! 👇\n\n#Professional #Growth #Insights`
      : `🔥 ${prompt}\n\nQuick thoughts:\n\n→ Point 1\n→ Point 2\n→ Point 3\n\nWhat do you think? 🤔`;

    return {
      content,
      platform
    };
  };

  const handleCopyDraft = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleSaveDraft = (content: string, platform: 'linkedin' | 'twitter') => {
    const draft: Draft = {
      id: Date.now().toString(),
      title: content.split('\n')[0].slice(0, 50) + '...',
      content,
      platform,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    addDraft(draft);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Assistant</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">Tell me what you want to post about</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatMessages.map((message) => (
          <div key={message.id} className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-2xl ${message.role === 'user' ? 'order-first' : ''}`}>
              <div className={`p-4 rounded-2xl ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-lg' 
                  : 'bg-slate-100 dark:bg-slate-700 rounded-tl-lg'
              }`}>
                <p className={message.role === 'user' ? 'text-white' : 'text-slate-900 dark:text-white'}>
                  {message.content}
                </p>
              </div>

              {message.draft && (
                <div className="mt-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-600">
                    <p className="text-slate-900 dark:text-white whitespace-pre-wrap font-medium mb-3">
                      {message.draft.content}
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      onClick={() => handleCopyDraft(message.draft!.content)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      onClick={() => handleSaveDraft(message.draft!.content, message.draft!.platform)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Save Draft
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {message.role === 'assistant' ? 'AI Assistant' : 'You'} • {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex space-x-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to refine the post, change the tone, or create something new..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
