import { Link, useLocation } from 'wouter';
import { 
  Home, 
  Edit, 
  Calendar, 
  LayoutTemplate, 
  FileText, 
  Settings,
  Zap,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Create Post', href: '/create', icon: Edit },
  { name: 'Drafts Review', href: '/drafts', icon: FileText },
  { name: 'Scheduling', href: '/schedule', icon: Calendar },
  { name: 'Templates', href: '/templates', icon: LayoutTemplate },
  { name: 'Settings', href: '/profile', icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user, setUser } = useApp();

  const handleLogout = () => {
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">SocialDraft AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <a className={cn(
                    'flex items-center px-4 py-3 rounded-xl transition-colors',
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  )}>
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pro Plan</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
