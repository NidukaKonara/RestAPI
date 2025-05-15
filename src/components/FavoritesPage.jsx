import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from session storage
    const favCountries = JSON.parse(sessionStorage.getItem("favoriteCountries")) || [];
    setFavorites(favCountries);
    setLoading(false);
  }, []);

  const clearAllFavorites = () => {
    sessionStorage.removeItem("favoriteCountries");
    setFavorites([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-4 md:mb-0">
          <Star className="fill-yellow-400 text-yellow-400" size={28} />
          Favorite Countries
        </h1>
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to All Countries
          </Link>
          {favorites.length > 0 && (
            <button 
              onClick={clearAllFavorites}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Clear All Favorites
            </button>
          )}
        </div>
      </div>

      {loading && <p className="text-center">Loading…</p>}

      {!loading && favorites.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Star size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-600 mb-4">You haven't added any favorite countries yet.</p>
          <Link to="/" className="text-indigo-600 hover:underline">
            Explore countries and add some favorites!
          </Link>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {favorites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}