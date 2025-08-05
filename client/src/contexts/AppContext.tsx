import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Draft, Template, Schedule, ChatMessage } from '@/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  drafts: Draft[];
  setDrafts: (drafts: Draft[]) => void;
  addDraft: (draft: Draft) => void;
  updateDraft: (id: string, updates: Partial<Draft>) => void;
  deleteDraft: (id: string) => void;
  templates: Template[];
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
  addSchedule: (schedule: Schedule) => void;
  deleteSchedule: (id: string) => void;
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const sampleTemplates: Template[] = [
  {
    id: '1',
    title: 'Lessons Learned Template',
    category: 'startup-tips',
    platform: 'linkedin',
    description: 'Share valuable lessons from your entrepreneurial journey',
    content: '3 lessons I learned from [specific experience]:\n\n1. [Lesson one]\n2. [Lesson two]\n3. [Lesson three]\n\nWhat would you add to this list?'
  },
  {
    id: '2',
    title: 'Quote Reflection',
    category: 'leadership',
    platform: 'linkedin',
    description: 'Share motivational quotes with personal insights',
    content: '💡 "[Inspirational quote]"\n\nThis resonates with me because [personal connection].\n\nIn my experience, [specific example or story].\n\nWhat\'s a quote that changed your perspective?'
  },
  {
    id: '3',
    title: 'Feature Announcement',
    category: 'product',
    platform: 'twitter',
    description: 'Announce new features or products with excitement',
    content: '🚀 Just shipped: [Feature name]\n\nProblem it solves: [Brief description]\n\nWhy we built it: [User feedback/need]\n\nTry it out and let us know what you think! 👇'
  },
  {
    id: '4',
    title: 'Trend Analysis',
    category: 'industry',
    platform: 'linkedin',
    description: 'Share your perspective on industry trends and changes',
    content: '📈 [Industry trend] is changing everything.\n\nHere\'s what I\'m seeing:\n• [Observation 1]\n• [Observation 2]\n• [Observation 3]\n\nHow is this affecting your industry?'
  },
  {
    id: '5',
    title: 'Behind the Scenes',
    category: 'personal',
    platform: 'twitter',
    description: 'Give followers a peek into your daily work routine',
    content: 'The reality behind [achievement/project]:\n\nWhat you see: [End result]\nWhat you don\'t see: [Struggles/process]\n\nBuilding in public means sharing both. 🫱🏻‍🫲🏻'
  },
  {
    id: '6',
    title: 'Tool Recommendation',
    category: 'tips-tools',
    platform: 'linkedin',
    description: 'Share tools that are improving your workflow',
    content: '🛠️ [Tool name] has been a game-changer for [specific use case].\n\nWhat I love about it:\n✅ [Benefit 1]\n✅ [Benefit 2]\n✅ [Benefit 3]\n\nWhat tools are saving you time lately?'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [templates] = useState<Template[]>(sampleTemplates);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m ready to help you create engaging content for LinkedIn and Twitter. What would you like to post about today?',
      timestamp: new Date()
    }
  ]);

  const addDraft = (draft: Draft) => {
    setDrafts(prev => [draft, ...prev]);
  };

  const updateDraft = (id: string, updates: Partial<Draft>) => {
    setDrafts(prev => prev.map(draft => 
      draft.id === id ? { ...draft, ...updates, updatedAt: new Date() } : draft
    ));
  };

  const deleteDraft = (id: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  };

  const addSchedule = (schedule: Schedule) => {
    setSchedules(prev => [...prev, schedule]);
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      drafts,
      setDrafts,
      addDraft,
      updateDraft,
      deleteDraft,
      templates,
      schedules,
      setSchedules,
      addSchedule,
      deleteSchedule,
      chatMessages,
      setChatMessages,
      addChatMessage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
