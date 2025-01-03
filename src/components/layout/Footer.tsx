import { BarChart2, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl">SocialMetrics</span>
            </div>
            <p className="text-gray-600">
              Powerful analytics for your social media presence
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Features</li>
              <li>Pricing</li>
              <li>Case Studies</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Documentation</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              <Github className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SocialMetrics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}