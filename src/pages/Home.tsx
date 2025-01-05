import { BarChart2, Users, Zap, MessageCircle, Lightbulb } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { ChartsSection } from '../components/charts/ChartsSection';
import { Github, Linkedin, Mail } from 'lucide-react';

  const teamMembers = [
    {
      name: "Shashank Singh",
      role: "Full Stack Developer",
      description: "Specializes in building scalable web applications using React, Node.js, and cloud technologies. Expert in system architecture and performance optimization.",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      social: {
        github: "https://github.com",
        linkedin: "https://www.linkedin.com/in/shashank-singh-584860280/",
        email: "shashanksgh3@gmail.com"
      }
    },
    {
      name: "Sushant Tiwari",
      role: "Langflow Engineer",
      description: "Expert in natural language processing and LangFlow implementation. Focuses on building intelligent conversation systems and AI integrations.",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      social: {
        github: "https://github.com",
        linkedin: "https://www.linkedin.com/in/sushant-tiwari-b9619128a/",
        email: "mailto:sushant@example.com"
      }
    },
    {
      name: "Vaibhav Sharma",
      role: "Data Analyst",
      description: "Skilled in data visualization, statistical analysis, and business intelligence. Transforms complex data into actionable insights.",
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      social: {
        github: "https://github.com",
        linkedin: "https://www.linkedin.com/in/vaibhav-sharma-b658a728a/",
        email: "mailto:vaibhav@example.com"
      }
    },
    {
      name: "Nishant Raj",
      role: "UI/UX Designer",
      description: "Creative designer focused on user-centered design principles. Expertise in creating intuitive and engaging digital experiences.",
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      social: {
        github: "https://github.com",
        linkedin: "https://www.linkedin.com/in/nishant-raj-742105295/",
        email: "mailto:nishant@example.com"
      }
    }
  ];
  const features = [
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Get detailed insights into your social media performance with comprehensive analytics and real-time monitoring.",
      gradient: "from-blue-500 to-blue-600",
      lightGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Audience Insights",
      description: "Understand your audience better with in-depth demographic analysis and behavioral patterns tracking.",
      gradient: "from-green-500 to-green-600",
      lightGradient: "from-green-50 to-green-100"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Leverage advanced AI algorithms to receive intelligent recommendations for your content strategy optimization.",
      gradient: "from-purple-500 to-purple-600",
      lightGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "GPT Integration",
      description: "Enhance user engagement with state-of-the-art GPT-powered conversational AI for intelligent interactions.",
      gradient: "from-indigo-500 to-indigo-600",
      lightGradient: "from-indigo-50 to-indigo-100"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "AI Suggestions",
      description: "Receive smart, contextual suggestions to optimize your workflows and improve productivity seamlessly.",
      gradient: "from-yellow-500 to-yellow-600",
      lightGradient: "from-yellow-50 to-yellow-100"
    }
  ];
export function Home() {
  return (
    <div>
      <HeroSection />
      <ChartsSection />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive suite of tools designed to enhance your social media analytics experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.lightGradient} flex items-center justify-center mb-6 transform transition-transform duration-300 hover:scale-110`}>
                  <div className={`text-gradient bg-gradient-to-r ${feature.gradient}`}>
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 bg-gradient-to-br ${feature.gradient} rounded-bl-full transform translate-x-12 -translate-y-12`} />
              <div className={`absolute bottom-0 left-0 w-24 h-24 opacity-10 bg-gradient-to-tr ${feature.gradient} rounded-tr-full transform -translate-x-12 translate-y-12`} />
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* team */}
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A talented group of professionals working together to create exceptional digital solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  {member.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 font-semibold mb-4">
                  {member.role}
                </p>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {member.description}
                </p>

                <div className="flex space-x-4">
                  <a href={member.social.github} className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.social.email} className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
