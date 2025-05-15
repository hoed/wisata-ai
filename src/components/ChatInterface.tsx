
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff, MapPin, Calendar, User, Clock } from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";
import { ethers } from "ethers";
import { TOUR_GUIDE_ABI, TOUR_GUIDE_CONTRACT_ADDRESS } from "@/contracts/TourGuideABI";

// Define message types
type MessageType = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  typing?: boolean;
};

// Dummy data for locations
const popularLocations = [
  "Borobudur Temple",
  "Prambanan Temple",
  "Komodo National Park",
  "Raja Ampat",
  "Mount Bromo"
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isConnected, account, signer } = useWeb3();

  // Simulate initial greeting message from bot
  useEffect(() => {
    const initialGreeting: MessageType = {
      id: "initial",
      sender: "bot",
      text: "Selamat datang! I'm your Indonesian AI Tour Guide. I can help you discover beautiful destinations, learn about local cultures, and plan your journey in Indonesia. What would you like to know about?",
      timestamp: new Date(),
    };
    
    setTimeout(() => {
      setMessages([initialGreeting]);
    }, 500);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus on input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputText,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Process user message (in a real app, this would call your backend AI API)
    await simulateResponse(inputText);
  };

  // Simulate AI response
  const simulateResponse = async (userInput: string) => {
    // Wait a bit to simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate typing indicator with partial responses for longer messages
    const typingMessage: MessageType = {
      id: `bot-typing-${Date.now()}`,
      sender: "bot",
      text: "...",
      timestamp: new Date(),
      typing: true,
    };
    
    setMessages(prev => [...prev, typingMessage]);

    // Generate response based on user input keywords
    let response = "";
    
    const lowerInput = userInput.toLowerCase();
    
    // Check for booking intent
    if (lowerInput.includes("book") || lowerInput.includes("reserve")) {
      // If user is connected to wallet, simulate smart contract interaction
      if (isConnected && signer) {
        try {
          response = await simulateBooking(userInput);
        } catch (error) {
          console.error("Booking error:", error);
          response = "I'm sorry, there was an issue with processing your booking. Please ensure your wallet is connected to Polygon Mumbai network and try again.";
        }
      } else {
        response = "To book a tour, you'll need to connect your Web3 wallet first. This allows me to create a secure, decentralized booking record for your trip.";
      }
    }
    // Check for specific location questions
    else if (lowerInput.includes("borobudur")) {
      response = "Borobudur is the world's largest Buddhist temple, built in the 9th century during the reign of the Sailendra Dynasty. Located in Central Java, this UNESCO World Heritage site features 2,672 relief panels and 504 Buddha statues. The best time to visit is at sunrise, when you can witness the magical light over the temple and surrounding landscape. Would you like to learn about nearby accommodations or tours?";
    }
    else if (lowerInput.includes("prambanan")) {
      response = "Prambanan is a magnificent Hindu temple compound dedicated to the Trimurti (Brahma, Vishnu, and Shiva), built in the 9th century. This UNESCO World Heritage site is characterized by its tall and pointed architecture, with a 47-meter-high central building. The complex contains over 200 temples and features beautiful relief carvings of the Ramayana epic. Would you like to know about transportation options to get there?";
    }
    else if (lowerInput.includes("bali")) {
      response = "Bali is Indonesia's most famous island, known for its beautiful beaches, vibrant culture, and spiritual atmosphere. Popular destinations include Ubud (cultural center), Kuta (surfing), Seminyak (luxury), and the Uluwatu Temple. Balinese Hinduism creates a unique cultural experience with daily offerings (canang sari) and spectacular ceremonies. Would you like specific recommendations for areas to stay or activities?";
    }
    // Check for general categories
    else if (lowerInput.includes("food") || lowerInput.includes("cuisine") || lowerInput.includes("eat")) {
      response = "Indonesian cuisine is incredibly diverse! Some must-try dishes include Nasi Goreng (fried rice), Rendang (slow-cooked beef curry), Satay (meat skewers with peanut sauce), and Gado-gado (vegetable salad with peanut sauce). Each region has its specialties - for example, Padang for spicy dishes, Yogyakarta for Gudeg (young jackfruit stew), and Bali for Babi Guling (suckling pig). Would you like recommendations for a specific region?";
    }
    else if (lowerInput.includes("transport") || lowerInput.includes("getting around")) {
      response = "In Indonesia's major cities like Jakarta, you can use ride-hailing apps (Gojek, Grab), taxis, or public transit. Between cities, domestic flights are popular due to the archipelago nature. On islands like Bali, renting a scooter is common but requires caution. For a cultural experience, try becaks (cycle rickshaws) in Yogyakarta or bajaj (three-wheeled taxis) in Jakarta. Would you like specific transportation advice for a particular destination?";
    }
    // Default responses
    else {
      const responses = [
        "Indonesia consists of over 17,000 islands, with Java, Sumatra, Borneo (Kalimantan), Sulawesi, and Papua being the largest. Each island offers unique cultural experiences and natural wonders. Is there a particular island you're interested in exploring?",
        "Indonesian culture is incredibly diverse with over 300 ethnic groups. The largest is Javanese (40% of population), followed by Sundanese, Batak, and Madurese. Each group has its own language, customs, and traditions. Would you like to learn about a specific cultural aspect?",
        "The best time to visit Indonesia depends on where you're going. Generally, the dry season (May to September) is ideal for most destinations. However, some eastern areas like Raja Ampat are better during the wet season. What region are you planning to visit?",
        "For first-time visitors to Indonesia, I recommend starting in Bali for beaches and culture, then visiting Yogyakarta for historical temples, and perhaps Komodo Island for wildlife. How long will your trip be?"
      ];
      
      response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Remove typing indicator and add the actual response
    setMessages(prev => prev.filter(msg => !msg.typing).concat({
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: response,
      timestamp: new Date(),
    }));
    
    setIsTyping(false);
  };

  // Simulate booking through smart contract
  const simulateBooking = async (userInput: string): Promise<string> => {
    // In a real application, we would parse user input to determine the destination and date
    // For this prototype, we'll select a random location and use the current date + 30 days
    const destination = popularLocations[Math.floor(Math.random() * popularLocations.length)];
    const bookingDate = Math.floor((Date.now() / 1000) + (30 * 24 * 60 * 60)); // Current time + 30 days in seconds
    
    // Simulate smart contract call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we'd actually call the contract here:
        // const tourGuideContract = new ethers.Contract(TOUR_GUIDE_CONTRACT_ADDRESS, TOUR_GUIDE_ABI, signer);
        // const tx = await tourGuideContract.createBooking(destination, bookingDate);
        // await tx.wait();
        
        resolve(`Great! I've created a blockchain-based booking for you to visit ${destination} in 30 days. This booking is now recorded on the Polygon blockchain and linked to your wallet address. You'll receive an NFT confirmation in your wallet shortly. Would you like me to recommend some activities or places to stay near ${destination}?`);
      }, 2000);
    });
  };

  // Simulate voice recording
  const toggleRecording = () => {
    // In a real app, we would implement Web Speech API here
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate recording for 3 seconds then auto-stop
      setTimeout(() => {
        setIsRecording(false);
        setInputText("Tell me about Bali beaches"); // Simulated speech-to-text result
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-indonesia-teal text-white p-4 shadow">
        <h2 className="text-xl font-semibold">Indonesian Tour Guide AI</h2>
        <p className="text-sm opacity-80">Powered by decentralized technologies</p>
      </div>
      
      {/* Messages container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`message-bubble ${
                message.sender === 'user' ? 'user-message' : 'bot-message'
              } ${message.typing ? 'animate-pulse' : ''}`}
            >
              {message.text}
              <div className="text-xs opacity-70 mt-1 text-right">
                {message.typing ? 'typing...' : message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick suggestions */}
      <div className="px-4 py-2 bg-gray-100 flex overflow-x-auto space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap text-xs"
          onClick={() => setInputText("Tell me about Borobudur Temple")}
        >
          <MapPin size={12} className="mr-1" />
          Borobudur Temple
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap text-xs"
          onClick={() => setInputText("Local food recommendations")}
        >
          <User size={12} className="mr-1" />
          Food Recommendations
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap text-xs"
          onClick={() => setInputText("Best time to visit Bali")}
        >
          <Calendar size={12} className="mr-1" />
          Best time to visit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap text-xs"
          onClick={() => setInputText("Book a tour to Raja Ampat")}
        >
          <Clock size={12} className="mr-1" />
          Book a tour
        </Button>
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex space-x-2">
        <Input
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow"
          disabled={isTyping || isRecording}
        />
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          onClick={toggleRecording}
          className={isRecording ? "bg-red-100 text-red-500" : ""}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
        <Button type="submit" size="icon" disabled={!inputText.trim() || isTyping}>
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
