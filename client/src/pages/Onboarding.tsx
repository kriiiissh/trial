import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useApp } from '@/contexts/AppContext';

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { setUser } = useApp();
  const {
    currentStep,
    totalSteps,
    progress,
    formData,
    updateFormData,
    nextStep,
    prevStep
  } = useOnboarding();

  const handleComplete = () => {
    if (formData.name && formData.industry && formData.tone) {
      setUser(formData as any);
      setLocation('/dashboard');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.industry;
      case 2:
        return formData.targetAudience;
      case 3:
        return Object.values(formData.goals || {}).some(Boolean);
      case 4:
        return formData.tone;
      case 5:
        return true; // Sample posts are optional
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            progress={progress}
          />

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Tell us about yourself</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">We'll use this to personalize your experience</p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    placeholder="Enter your full name"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">Industry/Niche *</Label>
                  <Select value={formData.industry || ''} onValueChange={(value) => updateFormData({ industry: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your industry" />
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
              </div>
            </div>
          )}

          {/* Step 2: Target Audience */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Who's your audience?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Understanding your audience helps us create more targeted content.</p>
              
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Textarea
                  id="audience"
                  value={formData.targetAudience || ''}
                  onChange={(e) => updateFormData({ targetAudience: e.target.value })}
                  placeholder="Describe your target audience (e.g., startup founders, marketing professionals, tech enthusiasts)"
                  rows={4}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Step 3: Content Goals */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">What are your content goals?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Select all that apply to help us tailor your content strategy.</p>
              
              <div className="space-y-4">
                {[
                  { key: 'engagement', label: 'Increase Engagement', desc: 'Get more likes, comments, and shares' },
                  { key: 'growth', label: 'Grow Following', desc: 'Expand your audience and reach' },
                  { key: 'thoughtLeadership', label: 'Thought Leadership', desc: 'Establish authority in your field' }
                ].map((goal) => (
                  <label key={goal.key} className="flex items-center p-4 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
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
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">{goal.label}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{goal.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Tone Preference */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">What's your preferred tone?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Choose the tone that best represents your brand voice.</p>
              
              <RadioGroup
                value={formData.tone || ''}
                onValueChange={(value: any) => updateFormData({ tone: value })}
                className="space-y-3"
              >
                {[
                  { value: 'professional', label: 'Professional', desc: 'Formal, authoritative, business-focused' },
                  { value: 'casual', label: 'Casual', desc: 'Friendly, conversational, approachable' },
                  { value: 'witty', label: 'Witty', desc: 'Humorous, clever, entertaining' },
                  { value: 'inspirational', label: 'Inspirational', desc: 'Motivating, uplifting, encouraging' }
                ].map((tone) => (
                  <label key={tone.value} className="flex items-center p-4 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                    <RadioGroupItem value={tone.value} className="mr-3" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{tone.label}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{tone.desc}</div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 5: Sample Posts */}
          {currentStep === 5 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Share your voice</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Upload or paste some of your previous posts to help our AI learn your unique style.</p>
              
              <div className="space-y-6">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 mb-2">Upload screenshots or text files</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">PNG, JPG, TXT up to 10MB</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>
                
                <div className="text-center text-slate-500 dark:text-slate-400">
                  <span>or</span>
                </div>
                
                <div>
                  <Label htmlFor="sample-posts">Paste your previous posts</Label>
                  <Textarea
                    id="sample-posts"
                    value={formData.samplePosts || ''}
                    onChange={(e) => updateFormData({ samplePosts: e.target.value })}
                    placeholder="Paste a few of your best LinkedIn or Twitter posts here..."
                    rows={6}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              >
                Complete Setup
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
