import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Edit, ExternalLink, MoreHorizontal, Linkedin, Twitter } from 'lucide-react';
import { Draft } from '@/types';
import { useApp } from '@/contexts/AppContext';

interface DraftCardProps {
  draft: Draft;
}

const statusColors = {
  'draft': 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  'reviewed': 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
  'needs-edit': 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
  'approved': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
};

const statusLabels = {
  'draft': 'Draft',
  'reviewed': 'Reviewed',
  'needs-edit': 'Needs Edit',
  'approved': 'Approved'
};

export function DraftCard({ draft }: DraftCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateDraft, deleteDraft } = useApp();

  const handleCopy = () => {
    navigator.clipboard.writeText(draft.content);
  };

  const handleStatusChange = (newStatus: Draft['status']) => {
    updateDraft(draft.id, { status: newStatus });
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              draft.platform === 'linkedin' 
                ? 'bg-blue-100 dark:bg-blue-900/50' 
                : 'bg-slate-100 dark:bg-slate-700'
            }`}>
              {draft.platform === 'linkedin' ? (
                <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Twitter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {draft.title}
              </h3>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Created {timeAgo(draft.createdAt)}
                </span>
                <Badge className={statusColors[draft.status]}>
                  {statusLabels[draft.status]}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl mb-4">
          <p className="text-slate-900 dark:text-white leading-relaxed whitespace-pre-wrap">
            {isExpanded ? draft.content : draft.content.slice(0, 200) + (draft.content.length > 200 ? '...' : '')}
          </p>
          {draft.content.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Edit className="w-4 h-4 mr-1" />
            Edit Draft
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
