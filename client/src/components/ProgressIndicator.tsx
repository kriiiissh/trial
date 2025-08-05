interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export function ProgressIndicator({ currentStep, totalSteps, progress }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to SocialDraft AI</h2>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-violet-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
