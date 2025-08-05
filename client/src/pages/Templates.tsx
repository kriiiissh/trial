import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TemplateCard } from '@/components/TemplateCard';
import { useApp } from '@/contexts/AppContext';
import { useTemplates } from '@/hooks/useTemplates';
import { cn } from '@/lib/utils';

export default function Templates() {
  const { templates } = useApp();
  const { selectedCategory, setSelectedCategory, categories, filterTemplates } = useTemplates();

  const filteredTemplates = filterTemplates(templates);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Templates Library</h1>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Template Library</h2>
              <p className="text-slate-600 dark:text-slate-400">Choose from our curated collection of proven post templates</p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    selectedCategory === category.id && 'bg-blue-600 hover:bg-blue-700'
                  )}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">No templates found for this category.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
