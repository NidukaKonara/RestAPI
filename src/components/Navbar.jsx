import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Globe, Heart, LogIn, LogOut, UserPlus } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      // No need for navigation here, as the AuthContext will likely handle redirects
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600";
  };

  return (
    <nav 
      className={`sticky top-0 z-50 w-full ${
        scrolled 
          ? "bg-white shadow-md" 
          : "bg-white/95 backdrop-blur-sm"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Rest API</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive("/")}`}
              >
                Countries
              </Link>

              
              
                <Link
                  to="/favorites"
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition ${isActive("/favorites")}`}
                >
                  Favorites
                </Link>
              
            </div>
          </div>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className={`flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md transition ${isActive("/login") ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md transition hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md transition text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Log Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg bg-white">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            Countries
          </Link>

            <Link
              to="/favorites"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/favorites"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              Favorites
            </Link>
          

          {!currentUser ? (
            <>
              <Link
                to="/login"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/login"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Log In
              </Link>
              <Link
                to="/signup"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/signup"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}