
import { useEffect } from "react";
import { Code, Code2, FileCode, MessageCircle, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import MatchingSection from "@/components/MatchingSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Animation effect for hero elements
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          element.classList.add('animate-fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on initial load
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navigation /> */}
      
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            
            {/* Code pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8 max-w-xl">
                <div className="space-y-5">
                  <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg">
                    <span className="animate-pulse mr-2">•</span>
                    Beta Launch - Join Now
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    Find Your Perfect
                    <div className="mt-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                      Coding Partner
                    </div>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                    Connect with developers who share your goals. Match with partners for interview preparation, pair programming, and project collaboration.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    Get Started
                  </button>
                  <button className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 font-medium rounded-lg shadow hover:shadow-md transition-all">
                    Learn More
                  </button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium border-2 border-white dark:border-gray-900">J</div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium border-2 border-white dark:border-gray-900">S</div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium border-2 border-white dark:border-gray-900">R</div>
                  </div>
                  <span>Join 2,500+ developers already on PeerPrep</span>
                </div>
              </div>
              
              <div className="relative lg:ml-auto flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-500/30 rounded-2xl blur-3xl opacity-30 animate-pulse-slow"></div>
                  
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                    <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-500"></div>
                    <div className="p-6">
                      {/* Profile header */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center">
                          <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Alex, Senior Developer</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded-full">React</span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full">TypeScript</span>
                            <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-full">Node.js</span>
                          </div>
                        </div>
                        <div className="ml-auto text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full">
                          95% Match
                        </div>
                      </div>
                      
                      {/* Message */}
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-5">
                        <p className="text-gray-700 dark:text-gray-300">
                          "I'm looking for a partner to practice system design interviews for FAANG companies. Happy to help with frontend coding challenges too."
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-between">
                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md">
                          Connect
                        </button>
                      </div>
                      
                      {/* Tag */}
                      <div className="absolute top-3 right-3 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full">
                        Online now
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-700 dark:to-purple-700 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-300 to-blue-300 dark:from-purple-700 dark:to-blue-700 rounded-full opacity-20 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16" id="features">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How PeerPrep Works</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl">
                Our platform makes it easy to find compatible coding partners based on your skills, goals, and preferences.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-5">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share your skills, experience level, and what you're looking to achieve with potential coding partners.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-5">
                  <FileCode className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Match Algorithm</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our smart matching system connects you with developers who have compatible skills and complementary goals.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-5">
                  <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Connect & Collaborate</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start conversations, schedule pair programming sessions, or practice interview questions together.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Matching Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Find Your Partner</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300">
                Browse potential coding partners and connect with developers who match your goals.
              </p>
            </div>
            
            <MatchingSection />
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16" id="success-stories">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300">
                See how developers have benefited from finding the right coding partners.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center">
                    <Code2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">James & Maria</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Frontend Developers</p>
                  </div>
                </div>
                <blockquote className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-gray-600 dark:text-gray-300 border-l-4 border-purple-500">
                  "We met through PeerPrep and practiced React interview questions together. Both of us landed jobs at top tech companies within a month!"
                </blockquote>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center">
                    <Code2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Aisha & Devon</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developers</p>
                  </div>
                </div>
                <blockquote className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-gray-600 dark:text-gray-300 border-l-4 border-purple-500">
                  "We started pair programming on a weekend project that eventually grew into a startup. Finding a compatible coding partner made all the difference."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Find Your Coding Partner?</h2>
              <p className="mt-4 mb-8 text-white/90">
                Join thousands of developers who've found their perfect match for interview preparation, pair programming, and project collaboration.
              </p>
              <button className="px-8 py-4 bg-white text-purple-600 font-medium rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                Sign Up Now
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Index;