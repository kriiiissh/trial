import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Twitter } from 'lucide-react';
import { Template } from '@/types';
import { Link } from 'wouter';

interface TemplateCardProps {
  template: Template;
}

const categoryColors = {
  'startup-tips': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
  'leadership': 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300',
  'product': 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
  'industry': 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
  'personal': 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300',
  'tips-tools': 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
};

const categoryLabels = {
  'startup-tips': 'Startup Tips',
  'leadership': 'Leadership',
  'product': 'Product',
  'industry': 'Industry Insights',
  'personal': 'Personal',
  'tips-tools': 'Tips & Tools'
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge className={categoryColors[template.category]}>
            {categoryLabels[template.category]}
          </Badge>
          {template.platform === 'linkedin' ? (
            <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          ) : template.platform === 'twitter' ? (
            <Twitter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          ) : (
            <div className="flex space-x-1">
              <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </div>
          )}
        </div>
        <CardTitle className="text-lg">{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl mb-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {template.content}
          </p>
        </div>
        
        <Link href="/create">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Use This Template
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
