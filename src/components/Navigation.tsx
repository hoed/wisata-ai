
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, MessageCircle, Compass, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from "@/context/Web3Context";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { account, isConnected, connectWallet, disconnectWallet, isConnecting } = useWeb3();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/chat', label: 'AI Tour Guide', icon: <MessageCircle size={20} /> },
    { to: '/explore', label: 'Explore', icon: <Compass size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const activeClass = 'border-b-2 border-indonesia-gold';

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indonesia-teal to-indonesia-green">
            WisataAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center space-x-1 px-2 py-1 text-sm font-medium hover:text-indonesia-teal transition-colors",
                location.pathname === link.to ? activeClass : ""
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Wallet Connect Button */}
        <div className="hidden md:block">
          <Button
            onClick={isConnected ? disconnectWallet : connectWallet}
            className={cn(
              "web3-button",
              isConnected ? "web3-connected" : ""
            )}
            disabled={isConnecting}
          >
            <Wallet size={18} />
            <span>
              {isConnecting ? "Connecting..." : isConnected ? formatAddress(account!) : "Connect Wallet"}
            </span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} size="icon">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-slide-up">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg",
                  location.pathname === link.to 
                    ? "bg-indonesia-teal text-white" 
                    : "hover:bg-gray-100"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            <Button
              onClick={isConnected ? disconnectWallet : connectWallet}
              className={cn(
                "web3-button w-full mt-4",
                isConnected ? "web3-connected" : ""
              )}
              disabled={isConnecting}
            >
              <Wallet size={18} />
              <span>
                {isConnecting ? "Connecting..." : isConnected ? formatAddress(account!) : "Connect Wallet"}
              </span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
