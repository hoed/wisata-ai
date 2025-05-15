
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Compass, Star, Wallet, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { destinations } from "@/components/destinations";
import { useWeb3 } from "@/context/Web3Context";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isConnected, connectWallet } = useWeb3();

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  // Featured destinations (just use the first 3)
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 bg-gradient-to-br from-indonesia-teal to-indonesia-green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 batik-bg"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 transition-all duration-700 transform" 
                 style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Discover Indonesia with Your Web3 AI Tour Guide
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Explore the rich culture, stunning landscapes, and hidden gems of Indonesia with your decentralized AI companion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-indonesia-gold text-black hover:bg-opacity-90">
                  <Link to="/chat">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat with AI Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white">
                  <Link to="/explore">
                    <Compass className="mr-2 h-5 w-5" />
                    Explore Destinations
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-8 transition-all duration-700 delay-300 transform"
                 style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800" 
                  alt="Indonesia Landscape" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex items-center">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-2 mr-3">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Ask your AI Guide</p>
                      <p className="text-white/80 text-xs">"Tell me about Bali's hidden gems"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
            <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features of Our Web3 Tour Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indonesia-teal/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-indonesia-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Tour Guide</h3>
              <p className="text-gray-600">
                Engage with our agentic AI that has rich knowledge of Indonesia's history, culture, and hidden gems.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indonesia-terracotta/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-indonesia-terracotta" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Decentralized Identity</h3>
              <p className="text-gray-600">
                Connect with your Web3 wallet for a seamless, secure, and decentralized tour planning experience.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indonesia-green/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-indonesia-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">NFT Travel Badges</h3>
              <p className="text-gray-600">
                Earn unique NFT badges for visiting destinations and participating in cultural experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Destinations</h2>
            <Link to="/explore" className="text-indonesia-teal hover:text-indonesia-green font-medium flex items-center">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                      <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{destination.location}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{destination.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-indonesia-teal text-indonesia-teal hover:bg-indonesia-teal hover:text-white"
                  >
                    <Link to={`/chat?destination=${destination.id}`}>
                      Ask AI about this place
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Web3 CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indonesia-terracotta to-indonesia-gold text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect Your Web3 Wallet</h2>
              <p className="text-lg opacity-90">
                Unlock the full potential of your personalized travel experience with blockchain-secured bookings, NFT travel badges, and more.
              </p>
            </div>
            <div>
              <Button 
                onClick={isConnected ? undefined : connectWallet}
                disabled={isConnected}
                size="lg" 
                className={`bg-white text-indonesia-terracotta hover:bg-gray-100 ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Wallet className="mr-2 h-5 w-5" />
                {isConnected ? "Wallet Connected" : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-indonesia-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indonesia-teal">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Connect your Web3 wallet for a personalized, secure experience.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-indonesia-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indonesia-teal">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat</h3>
              <p className="text-gray-600">
                Interact with our AI to plan your perfect Indonesian journey.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-indonesia-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indonesia-teal">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-600">
                Secure your tours and experiences on the blockchain.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-indonesia-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indonesia-teal">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore</h3>
              <p className="text-gray-600">
                Discover Indonesia and earn NFT badges for your adventures.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
