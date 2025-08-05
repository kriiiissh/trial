import { useState } from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ChatInterface } from '@/components/ChatInterface';
import { cn } from '@/lib/utils';

export default function CreatePost() {
  const [selectedPlatform, setSelectedPlatform] = useState<'linkedin' | 'twitter'>('linkedin');

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Post</h1>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create New Post</h2>
              <p className="text-slate-600 dark:text-slate-400">Chat with AI to generate your perfect social media post</p>
            </div>

            {/* Platform Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant={selectedPlatform === 'linkedin' ? 'default' : 'outline'}
                    onClick={() => setSelectedPlatform('linkedin')}
                    className={cn(
                      'flex items-center space-x-2',
                      selectedPlatform === 'linkedin' && 'bg-blue-600 hover:bg-blue-700'
                    )}
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </Button>
                  <Button
                    variant={selectedPlatform === 'twitter' ? 'default' : 'outline'}
                    onClick={() => setSelectedPlatform('twitter')}
                    className={cn(
                      'flex items-center space-x-2',
                      selectedPlatform === 'twitter' && 'bg-blue-600 hover:bg-blue-700'
                    )}
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <ChatInterface selectedPlatform={selectedPlatform} />
          </div>
        </main>
      </div>
    </div>
  );
}
