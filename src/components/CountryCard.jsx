import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function CountryCard({ country }) {
  const { name, flags, population, region, cca3 } = country;
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if country is already a favorite on component mount
  useEffect(() => {
    const favCountries = JSON.parse(sessionStorage.getItem("favoriteCountries")) || [];
    setIsFavorite(favCountries.some(fav => fav.cca3 === cca3));
  }, [cca3]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent link navigation when clicking the star
    e.stopPropagation();
    
    // Get current favorites from session storage
    const favCountries = JSON.parse(sessionStorage.getItem("favoriteCountries")) || [];
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favCountries.filter(fav => fav.cca3 !== cca3);
      sessionStorage.setItem("favoriteCountries", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const updatedFavorites = [...favCountries, country];
      sessionStorage.setItem("favoriteCountries", JSON.stringify(updatedFavorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/country/${cca3}`}
      className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6 flex flex-col justify-between relative"
    >
      {/* Favorite Button */}
      <button 
        onClick={toggleFavorite}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md z-10"
      >
        <Star 
          size={24} 
          className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} 
        />
      </button>

      {/* Flag Image */}
      <img
        src={flags.svg}
        alt={`${name.common} flag`}
        className="h-40 w-full object-cover rounded-t-lg"
      />

      {/* Country Name */}
      <h3 className="font-bold text-xl mt-4 mb-2 text-gray-900 hover:text-indigo-600 transition-all duration-200">
        {name.common}
      </h3>

      {/* Population */}
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Population: </span>
        {population.toLocaleString()}
      </p>

      {/* Region */}
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Region: </span>
        {region}
      </p>
    </Link>
  );
}