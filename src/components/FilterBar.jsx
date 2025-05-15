export default function FilterBar({ onRegion, onLanguage }) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const languages = ["English", "Spanish", "Arabic", "French", "Chinese"];

  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {/* Region Filter */}
      <select
        onChange={(e) => onRegion(e.target.value)}
        className="w-full md:w-56 py-3 px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-lg"
        defaultValue=""
      >
        <option value="" disabled className="text-gray-400">
          Filter by region
        </option>
        {regions.map((r) => (
          <option key={r} className="text-gray-700">
            {r}
          </option>
        ))}
      </select>

      {/* Language Filter */}
      <select
        onChange={(e) => onLanguage(e.target.value)}
        className="w-full md:w-56 py-3 px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-lg"
        defaultValue=""
      >
        <option value="" disabled className="text-gray-400">
          Filter by language
        </option>
        {languages.map((l) => (
          <option key={l} className="text-gray-700">
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
