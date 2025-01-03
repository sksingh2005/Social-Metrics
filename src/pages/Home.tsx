import { BarChart2, Users, Zap, MessageCircle, Lightbulb } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { ChartsSection } from '../components/charts/ChartsSection';

export function Home() {
  return (
    <div>
      <HeroSection />
      <ChartsSection />

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart2 className="w-6 h-6 text-blue-600" />,
                title: "Advanced Analytics",
                description: "Get detailed insights into your social media performance with comprehensive analytics.",
                color: "blue",
                delay: 0
              },
              {
                icon: <Users className="w-6 h-6 text-green-600" />,
                title: "Audience Insights",
                description: "Understand your audience better with demographic and behavioral analysis.",
                color: "green",
                delay: 0.2
              },
              {
                icon: <Zap className="w-6 h-6 text-purple-600" />,
                title: "AI-Powered Insights",
                description: "Get intelligent recommendations to improve your content strategy.",
                color: "purple",
                delay: 0.4
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-indigo-600" />,
                title: "GPT Integration",
                description: "Leverage GPT-based conversational AI for enhanced user engagement and support.",
                color: "indigo",
                delay: 0.6
              },
              {
                icon: <Lightbulb className="w-6 h-6 text-yellow-600" />,
                title: "AI Suggestions",
                description: "Receive smart suggestions to refine and optimize your workflows effortlessly.",
                color: "yellow",
                delay: 0.8
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 
                         transform hover:-translate-y-1 animate-fade-slide-up"
                style={{ animationDelay: `${feature.delay}s` }}
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center 
                              justify-center mb-4 transform transition-transform duration-300 
                              hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6 text-green-600" />,
                title: "Shashank Singh",
                description: "Full Stack Developer.",
                color: "green",
                delay: 0
              },
              {
                icon: <Users className="w-6 h-6 text-green-600" />,
                title: "Sushant Tiwari",
                description: "Langflow",
                color: "green",
                delay: 0.2
              },
              {
                icon: <Users className="w-6 h-6 text-green-600" />,
                title: "Vaibhav Sharma",
                description: "Data Analyst",
                color: "purple",
                delay: 0.4
              },
              {
                icon: <Users className="w-6 h-6 text-green-600" />,
                title: "Nishant Raj",
                description: "UI/UX ",
                color: "indigo",
                delay: 0.6
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 
                         transform hover:-translate-y-1 animate-fade-slide-up"
                style={{ animationDelay: `${feature.delay}s` }}
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center 
                              justify-center mb-4 transform transition-transform duration-300 
                              hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
