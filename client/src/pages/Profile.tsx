import { useState } from 'react';
import { Save, RefreshCw, Download, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useApp } from '@/contexts/AppContext';
import { User } from '@/types';

export default function Profile() {
  const { user, setUser, drafts } = useApp();
  const [formData, setFormData] = useState<User>(user || {
    name: '',
    email: '',
    industry: '',
    targetAudience: '',
    tone: 'professional',
    goals: {
      engagement: false,
      growth: false,
      thoughtLeadership: false
    }
  });

  const handleSave = () => {
    setUser(formData);
    // Here you would typically save to your backend
  };

  const handleLogout = () => {
    setUser(null);
    window.location.href = '/';
  };

  const updateFormData = (updates: Partial<User>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile & Settings</h1>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Profile & Settings</h2>
              <p className="text-slate-600 dark:text-slate-400">Manage your account and preferences</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={formData.industry} onValueChange={(value) => updateFormData({ industry: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content Preferences</CardTitle>
                    <CardDescription>Customize how AI generates your content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="tone">Preferred Tone</Label>
                      <Select value={formData.tone} onValueChange={(value: any) => updateFormData({ tone: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="witty">Witty</SelectItem>
                          <SelectItem value="inspirational">Inspirational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="audience">Target Audience</Label>
                      <Textarea
                        id="audience"
                        value={formData.targetAudience}
                        onChange={(e) => updateFormData({ targetAudience: e.target.value })}
                        placeholder="Describe your target audience..."
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>Content Goals</Label>
                      <div className="space-y-2 mt-2">
                        {[
                          { key: 'engagement', label: 'Increase Engagement' },
                          { key: 'growth', label: 'Audience Growth' },
                          { key: 'thoughtLeadership', label: 'Thought Leadership' }
                        ].map((goal) => (
                          <label key={goal.key} className="flex items-center">
                            <Checkbox
                              checked={formData.goals?.[goal.key as keyof typeof formData.goals] || false}
                              onCheckedChange={(checked) => 
                                updateFormData({
                                  goals: {
                                    ...formData.goals,
                                    [goal.key]: checked
                                  }
                                })
                              }
                              className="mr-2"
                            />
                            <span>{goal.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>Manage your account data and settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset Onboarding
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Profile Picture */}
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-2xl">
                        {formData.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {formData.name || 'User'}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Pro Plan Member</p>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </CardContent>
                </Card>

                {/* Account Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Drafts Created</span>
                      <span className="font-medium text-slate-900 dark:text-white">{drafts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Templates Used</span>
                      <span className="font-medium text-slate-900 dark:text-white">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Member Since</span>
                      <span className="font-medium text-slate-900 dark:text-white">Jan 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Tone Accuracy</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">94%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
