export interface User {
  id?: string;
  name: string;
  email?: string;
  industry: string;
  targetAudience: string;
  tone: 'professional' | 'casual' | 'witty' | 'inspirational';
  goals: {
    engagement: boolean;
    growth: boolean;
    thoughtLeadership: boolean;
  };
  samplePosts?: string;
}

export interface Draft {
  id: string;
  title: string;
  content: string;
  platform: 'linkedin' | 'twitter';
  status: 'draft' | 'reviewed' | 'needs-edit' | 'approved';
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  title: string;
  category: 'startup-tips' | 'leadership' | 'product' | 'industry' | 'personal' | 'tips-tools';
  platform: 'linkedin' | 'twitter' | 'both';
  content: string;
  description: string;
}

export interface Schedule {
  id: string;
  platform: 'linkedin' | 'twitter';
  days: string[];
  time: string;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'custom';
  timezone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  draft?: {
    content: string;
    platform: 'linkedin' | 'twitter';
  };
}
