import { Link } from 'wouter';
import { ArrowRight, Zap, Brain, Target, Clock, Star, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">SocialDraft AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#testimonials" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Testimonials</a>
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <ThemeToggle />
              <Link href="/onboarding">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Your Voice.
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent"> Smarter Social Drafts.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-generated drafts tailored for LinkedIn and Twitter — powered by your tone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/onboarding">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-4">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Everything you need to draft better
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful AI tools designed specifically for social media content creators and brands.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Drafting</h3>
              <p className="text-slate-600 dark:text-slate-300">Generate engaging posts that match your unique voice and style across LinkedIn and Twitter.</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Scheduling</h3>
              <p className="text-slate-600 dark:text-slate-300">Plan your content strategy with flexible scheduling options and optimal posting times.</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Template Library</h3>
              <p className="text-slate-600 dark:text-slate-300">Access proven post templates for different industries and content types to get started quickly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Loved by creators and brands
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              See what our users say about SocialDraft AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Marketing Director',
                content: 'SocialDraft AI has transformed how I create content. The AI understands my voice perfectly and saves me hours every week.',
                avatar: 'SC'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Tech Founder',
                content: 'The template library is incredible. I can quickly adapt proven formats for my industry and maintain consistency.',
                avatar: 'MR'
              },
              {
                name: 'Jessica Park',
                role: 'Content Strategist',
                content: 'Finally, a tool that gets my tone right. The scheduling feature helps me stay consistent without the stress.',
                avatar: 'JP'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-medium">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">SocialDraft AI</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
                AI-powered social media drafting tool for influencers and brands.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-700 mt-12 pt-8 text-center text-slate-600 dark:text-slate-300">
            <p>&copy; 2024 SocialDraft AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
