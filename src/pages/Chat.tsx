
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { useWeb3 } from "@/context/Web3Context";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const { isConnected } = useWeb3();
  const [isVisible, setIsVisible] = useState(false);
  const destination = searchParams.get('destination');

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="bg-indonesia-teal text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">AI Tour Guide Chat</h1>
            <p className="opacity-90">
              Ask about destinations, plan your trip, and get personalized recommendations
            </p>
          </div>
        </div>
        
        {/* Chat Interface Container */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto transition-all duration-700 transform"
               style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
            
            {/* Connection Status */}
            {isConnected ? (
              <div className="bg-green-100 border border-green-200 text-green-800 rounded-lg p-3 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Connected to blockchain. All conversations are stored securely and transparently.</span>
              </div>
            ) : (
              <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-lg p-3 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Connect your wallet for enhanced features and to save your itineraries on the blockchain.</span>
              </div>
            )}
            
            {/* Chat Component */}
            <div className="h-[600px] shadow-xl rounded-lg overflow-hidden">
              <ChatInterface />
            </div>
            
            {/* Info Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">About Your Guide</h3>
                <p className="text-gray-600">
                  Our AI has been trained on verified information about Indonesian culture, destinations, and local customs to provide accurate guidance.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Web3 Features</h3>
                <p className="text-gray-600">
                  Connect your wallet to create blockchain-secured bookings and earn NFT badges for your Indonesian adventures.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Travel Recommendations</h3>
                <p className="text-gray-600">
                  Ask about specific destinations, transportation options, local cuisine, or cultural etiquette tips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
