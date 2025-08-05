import { useState } from 'react';
import { Draft } from '@/types';

export function useDrafts() {
  const [filters, setFilters] = useState({
    platform: '',
    status: '',
    date: ''
  });

  const filterDrafts = (drafts: Draft[]) => {
    return drafts.filter(draft => {
      if (filters.platform && draft.platform !== filters.platform) return false;
      if (filters.status && draft.status !== filters.status) return false;
      if (filters.date) {
        const draftDate = new Date(draft.createdAt).toISOString().split('T')[0];
        if (draftDate !== filters.date) return false;
      }
      return true;
    });
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({ platform: '', status: '', date: '' });
  };

  return {
    filters,
    updateFilters,
    clearFilters,
    filterDrafts
  };
}
