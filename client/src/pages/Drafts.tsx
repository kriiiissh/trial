import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DraftCard } from '@/components/DraftCard';
import { useApp } from '@/contexts/AppContext';
import { useDrafts } from '@/hooks/useDrafts';
import { Link } from 'wouter';

export default function Drafts() {
  const { drafts } = useApp();
  const { filters, updateFilters, clearFilters, filterDrafts } = useDrafts();

  const filteredDrafts = filterDrafts(drafts);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Drafts Review</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Draft
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Draft Management</h2>
              <p className="text-slate-600 dark:text-slate-400">Review, edit, and organize all your post drafts</p>
            </div>

            {/* Filters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="platform-filter">Platform</Label>
                    <Select value={filters.platform} onValueChange={(value) => updateFilters({ platform: value })}>
                      <SelectTrigger id="platform-filter">
                        <SelectValue placeholder="All Platforms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Platforms</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={filters.status} onValueChange={(value) => updateFilters({ status: value })}>
                      <SelectTrigger id="status-filter">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="needs-edit">Needs Edit</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date-filter">Date</Label>
                    <Input
                      id="date-filter"
                      type="date"
                      value={filters.date}
                      onChange={(e) => updateFilters({ date: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Drafts List */}
            {filteredDrafts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {drafts.length === 0 ? 'No drafts yet' : 'No drafts match your filters'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {drafts.length === 0 
                      ? 'Start creating amazing content with AI assistance'
                      : 'Try adjusting your filters or create a new draft'
                    }
                  </p>
                  <Link href="/create">
                    <Button>Create First Draft</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredDrafts.map((draft) => (
                  <DraftCard key={draft.id} draft={draft} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
