import { useState } from 'react';
import { Template } from '@/types';

export function useTemplates() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'startup-tips', label: 'Startup Tips' },
    { id: 'leadership', label: 'Leadership Quotes' },
    { id: 'product', label: 'Product Announcements' },
    { id: 'industry', label: 'Industry Insights' },
    { id: 'personal', label: 'Personal' },
    { id: 'tips-tools', label: 'Tips & Tools' }
  ];

  const filterTemplates = (templates: Template[]) => {
    if (selectedCategory === 'all') return templates;
    return templates.filter(template => template.category === selectedCategory);
  };

  return {
    selectedCategory,
    setSelectedCategory,
    categories,
    filterTemplates
  };
}
