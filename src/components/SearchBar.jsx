export default function SearchBar({ onSearch }) {
  return (
    <input
      type="search"
      placeholder="Search by country name..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full md:w-80 py-3 px-4 text-lg text-gray-800 placeholder-gray-500 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-xl"
    />
  );
}
