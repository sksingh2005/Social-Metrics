import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataAnimation } from './DataAnimation';
import { HeroIllustration } from './HeroIllustration';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12">
          
          {/* Text Content */}
          <div className="text-center lg:text-left flex-1 space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your <span className="text-blue-600">Social Media</span> Strategy with Data
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Get powerful insights and analytics to optimize your social media performance
              and grow your audience with AI-powered recommendations.
            </p>
            <div className="flex justify-center lg:justify-start gap-4 mt-6">
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                           flex items-center gap-2 transform transition-transform 
                           duration-300 hover:scale-105 hover:shadow-lg"
              >
                Try Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                className="border-2 border-gray-300 px-8 py-3 rounded-lg 
                           hover:bg-white transition-all duration-300 
                           hover:shadow-lg hover:border-blue-400"
              >
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <DataAnimation label="Active Users" value={25000} suffix="+" duration={2000} />
              <DataAnimation label="Posts Analyzed" value={1000000} suffix="M+" duration={2500} />
              <DataAnimation label="Insights Generated" value={500000} suffix="K+" duration={3000} />
            </div>
          </div>

          {/* Illustration */}
          <div className="flex-1 relative flex justify-center">
            <HeroIllustration />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent lg:hidden"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
