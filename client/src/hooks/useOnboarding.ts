import { useState } from 'react';
import { User } from '@/types';

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState<Partial<User>>({
    goals: {
      engagement: false,
      growth: false,
      thoughtLeadership: false
    }
  });

  const updateFormData = (data: Partial<User>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return {
    currentStep,
    totalSteps,
    progress,
    formData,
    updateFormData,
    nextStep,
    prevStep
  };
}
