import { PlusCircle, LayoutTemplate, CalendarPlus, FileText, Calendar, Target, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useApp } from '@/contexts/AppContext';
import { Link } from 'wouter';

export default function Dashboard() {
  const { user, drafts, schedules, templates } = useApp();

  const stats = [
    {
      title: 'Drafts Generated',
      value: drafts.length,
      change: '+12% this week',
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Scheduled Posts',
      value: schedules.length,
      change: 'Next: Tomorrow 9 AM',
      icon: Calendar,
      color: 'text-violet-600 dark:text-violet-400'
    },
    {
      title: 'Templates Used',
      value: Math.floor(Math.random() * 20), // Simulated stat
      change: 'Most popular: Tips',
      icon: LayoutTemplate,
      color: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Tone Accuracy',
      value: '94%',
      change: 'Excellent match',
      icon: Target,
      color: 'text-amber-600 dark:text-amber-400'
    }
  ];

  const recentDrafts = drafts.slice(0, 3);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {user?.name || 'User'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
              </h2>
              <p className="text-slate-600 dark:text-slate-400">Ready to create amazing content? Let's get started.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{stat.title}</p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stat.color.includes('blue') ? 'bg-blue-100 dark:bg-blue-900/50' :
                        stat.color.includes('violet') ? 'bg-violet-100 dark:bg-violet-900/50' :
                        stat.color.includes('emerald') ? 'bg-emerald-100 dark:bg-emerald-900/50' :
                        'bg-amber-100 dark:bg-amber-900/50'
                      }`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500 to-violet-600 text-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-2">Ready to create?</h3>
                  <p className="mb-6 opacity-90">Generate your next viral post with AI assistance</p>
                  <Link href="/create">
                    <Button variant="secondary" className="bg-white text-blue-600 hover:bg-slate-50">
                      Generate Post Now
                      <PlusCircle className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Browse Templates</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">Find inspiration from our curated template library</p>
                  <Link href="/templates">
                    <Button variant="outline">
                      View Templates
                      <LayoutTemplate className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Drafts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Drafts</CardTitle>
                  <Link href="/drafts">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {recentDrafts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">No drafts yet. Start creating!</p>
                    <Link href="/create">
                      <Button className="mt-4" size="sm">Create First Draft</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentDrafts.map((draft) => (
                      <div key={draft.id} className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          draft.platform === 'linkedin' 
                            ? 'bg-blue-100 dark:bg-blue-900/50' 
                            : 'bg-slate-100 dark:bg-slate-700'
                        }`}>
                          {draft.platform === 'linkedin' ? '💼' : '🐦'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 dark:text-white font-medium truncate">{draft.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Created {new Date(draft.createdAt).toLocaleDateString()} • {draft.platform}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <User className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
