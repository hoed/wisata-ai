
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Calendar, Medal, MessageCircle, Clock, MapPin } from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";

const Profile = () => {
  const { account, isConnected, connectWallet } = useWeb3();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Mock data for user badges
  const badges = [
    {
      id: 1,
      name: "Borobudur Explorer",
      image: "https://i.imgur.com/FaaFHjK.png",
      description: "Visited the magnificent Borobudur Temple in Central Java",
      date: "2023-09-15"
    },
    {
      id: 2,
      name: "Bali Beach Connoisseur",
      image: "https://i.imgur.com/1A2B3C4.png",
      description: "Explored at least 5 different beaches in Bali",
      date: "2023-10-03"
    },
    {
      id: 3,
      name: "Culinary Adventurer",
      image: "https://i.imgur.com/5D6E7F8.png",
      description: "Tried 10 different traditional Indonesian dishes",
      date: "2023-11-20"
    }
  ];
  
  // Mock data for bookings
  const bookings = [
    {
      id: 101,
      destination: "Komodo National Park Tour",
      date: "2024-07-15",
      status: "Confirmed",
      description: "Full day tour including dragon viewing and Pink Beach visit"
    },
    {
      id: 102,
      destination: "Ubud Cultural Experience",
      date: "2024-08-02",
      status: "Pending",
      description: "Temple visits, traditional dance performance and art workshop"
    }
  ];
  
  // Mock data for recent conversations
  const conversations = [
    {
      id: 201,
      topic: "Bali Beach Recommendations",
      preview: "I'd like to know the best beaches in Bali for swimming and relaxation...",
      timestamp: "2024-05-12T14:30:00"
    },
    {
      id: 202,
      topic: "Java Temple Itinerary",
      preview: "Can you suggest a 3-day itinerary to explore temples in Java?",
      timestamp: "2024-05-10T09:15:00"
    },
    {
      id: 203,
      topic: "Local Food in Jakarta",
      preview: "What street foods should I try when visiting Jakarta?",
      timestamp: "2024-05-08T16:45:00"
    }
  ];
  
  // Format date string to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  
  // Format timestamp to relative time (e.g., "2 days ago")
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays === 1) {
      return "yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return formatDate(timestamp);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="bg-indonesia-teal text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="opacity-90">
              Manage your travel experiences, bookings, and NFT badges
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {isConnected ? (
            <div className="transition-all duration-700 transform"
                 style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
              
              {/* User Info Card */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="bg-indonesia-green/10 rounded-full p-4 mr-4">
                        <Wallet size={32} className="text-indonesia-green" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Wallet Connected</h2>
                        <p className="text-gray-500 text-sm">
                          {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-indonesia-teal">{badges.length}</p>
                        <p className="text-sm text-gray-500">NFT Badges</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-indonesia-terracotta">{bookings.length}</p>
                        <p className="text-sm text-gray-500">Bookings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-indonesia-gold">{conversations.length}</p>
                        <p className="text-sm text-gray-500">Conversations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tabs */}
              <Tabs defaultValue="badges" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="badges">NFT Badges</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                </TabsList>
                
                {/* NFT Badges Tab */}
                <TabsContent value="badges">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {badges.map((badge) => (
                      <Card key={badge.id} className="overflow-hidden">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img 
                            src={badge.image} 
                            alt={badge.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              // Fallback for broken images
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Badge+Image';
                            }}
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>{badge.name}</CardTitle>
                            <Medal className="text-indonesia-gold" size={20} />
                          </div>
                          <CardDescription>{badge.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="text-sm text-gray-500">
                          Earned on {formatDate(badge.date)}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Bookings Tab */}
                <TabsContent value="bookings">
                  <div className="space-y-6 mt-6">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardHeader>
                          <div className="flex justify-between">
                            <CardTitle>{booking.destination}</CardTitle>
                            <span className={`px-2 py-1 text-xs rounded ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <CardDescription>Booking #{booking.id}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mb-2">
                            <Calendar size={16} className="mr-2 text-gray-500" />
                            <span>{formatDate(booking.date)}</span>
                          </div>
                          <p className="text-gray-700">{booking.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="w-full">
                            <Link to={`/chat?bookingId=${booking.id}`}>
                              <MessageCircle size={16} className="mr-2" />
                              Ask about this booking
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Conversations Tab */}
                <TabsContent value="conversations">
                  <div className="space-y-4 mt-6">
                    {conversations.map((conversation) => (
                      <Card key={conversation.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{conversation.topic}</CardTitle>
                            <span className="text-xs text-gray-500">
                              {getRelativeTime(conversation.timestamp)}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 line-clamp-2">{conversation.preview}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className="text-sm text-gray-500">
                            <Clock size={14} className="inline mr-1" />
                            {new Date(conversation.timestamp).toLocaleTimeString()}
                          </div>
                          <Button asChild size="sm">
                            <Link to={`/chat?conversationId=${conversation.id}`}>
                              Continue
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 transition-all duration-700"
                 style={{ opacity: isVisible ? 1 : 0 }}>
              <div className="bg-indonesia-teal/10 rounded-full p-6 mb-6">
                <Wallet size={48} className="text-indonesia-teal" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">Connect Your Wallet</h2>
              <p className="text-gray-600 max-w-md text-center mb-8">
                Connect your Web3 wallet to access your profile, view your NFT badges, manage blockchain-secured bookings, 
                and see your conversation history.
              </p>
              <Button onClick={connectWallet} size="lg" className="bg-indonesia-gold text-black hover:bg-opacity-90">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
