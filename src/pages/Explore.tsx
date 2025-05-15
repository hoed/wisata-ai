
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, MessageCircle, Star, MapPin, 
  Sliders, Calendar, User, Clock, Menu, Grid
} from "lucide-react";
import { destinations, Destination } from "@/components/destinations";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations);
  const [isVisible, setIsVisible] = useState(false);
  
  // Extract all unique tags from destinations
  const allTags = Array.from(
    new Set(destinations.flatMap(destination => destination.tags))
  );

  // Filter destinations based on search term and selected tags
  useEffect(() => {
    const filtered = destinations.filter(destination => {
      const matchesSearch = 
        searchTerm === "" || 
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.some(tag => destination.tags.includes(tag));
        
      return matchesSearch && matchesTags;
    });
    
    setFilteredDestinations(filtered);
  }, [searchTerm, selectedTags]);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="bg-indonesia-teal text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Explore Indonesia</h1>
            <p className="opacity-90">
              Discover destinations, cultural experiences, and local treasures
            </p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white shadow-md border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search destinations, experiences, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className={viewType === "grid" ? "bg-gray-100" : ""}
                  onClick={() => setViewType("grid")}
                >
                  <Grid size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className={viewType === "list" ? "bg-gray-100" : ""}
                  onClick={() => setViewType("list")}
                >
                  <Menu size={18} />
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Sliders size={16} />
                  <span>Filters</span>
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className={`text-xs ${selectedTags.includes(tag) ? 'bg-indonesia-teal text-white' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Destinations */}
        <div className="container mx-auto px-4 py-8">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">
                {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'} Found
              </h2>
              
              {viewType === "grid" ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 transform"
                     style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                  {filteredDestinations.map((destination) => (
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
                        <p className="text-gray-500 text-sm mb-3">
                          <MapPin size={14} className="inline mr-1" />
                          {destination.location}
                        </p>
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
                            <MessageCircle size={16} className="mr-1" />
                            Ask AI about this place
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-4 transition-all duration-700 transform"
                     style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                  {filteredDestinations.map((destination) => (
                    <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
                      <img src={destination.image} alt={destination.name} className="w-full md:w-48 h-48 object-cover" />
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{destination.name}</h3>
                          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                            <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{destination.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-3">
                          <MapPin size={14} className="inline mr-1" />
                          {destination.location}
                        </p>
                        <p className="text-gray-600 mb-4">{destination.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {destination.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <Button 
                          asChild
                          variant="outline" 
                          className="border-indonesia-teal text-indonesia-teal hover:bg-indonesia-teal hover:text-white"
                        >
                          <Link to={`/chat?destination=${destination.id}`}>
                            <MessageCircle size={16} className="mr-1" />
                            Ask AI about this place
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Travel Planning */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Plan Your Indonesian Adventure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Calendar size={24} className="text-indonesia-green mb-3" />
                <h3 className="text-lg font-semibold mb-2">When to Visit</h3>
                <p className="text-gray-600 mb-4">
                  Indonesia has a tropical climate with two main seasons: dry (May to September) and wet (October to April).
                </p>
                <Button asChild variant="link" className="text-indonesia-teal p-0">
                  <Link to="/chat?query=best time to visit Indonesia">
                    Ask AI about timing
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <User size={24} className="text-indonesia-terracotta mb-3" />
                <h3 className="text-lg font-semibold mb-2">Cultural Etiquette</h3>
                <p className="text-gray-600 mb-4">
                  Learn about local customs, appropriate dress codes, and cultural practices for respectful travel.
                </p>
                <Button asChild variant="link" className="text-indonesia-teal p-0">
                  <Link to="/chat?query=Indonesian cultural etiquette">
                    Ask AI about etiquette
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Clock size={24} className="text-indonesia-gold mb-3" />
                <h3 className="text-lg font-semibold mb-2">Itinerary Planning</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized itineraries based on your interests, timeframe, and travel style.
                </p>
                <Button asChild variant="link" className="text-indonesia-teal p-0">
                  <Link to="/chat?query=2 week Indonesia itinerary">
                    Plan with AI assistant
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
