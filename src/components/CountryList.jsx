import useCountries from "../hooks/useCountries";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

export default function CountryList() {
  const {
    countries,
    loading,
    error,
    setSearchTerm,
    setRegion,
    setLanguage,
    reload,
  } = useCountries();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar onSearch={(v) => setSearchTerm(v)} />
        <FilterBar onRegion={setRegion} onLanguage={setLanguage} />
      </div>

      {loading && <p className="text-center">Loading…</p>}

      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button onClick={reload} className="underline">
            Retry
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {!loading && !error && countries.length === 0 && (
          <p className="text-center col-span-full text-gray-500 text-lg">
            There are no countries in this region matching that name.
          </p>
        )}

        {countries.map((c) => (
          <CountryCard key={c.cca3} country={c} />
        ))}
      </div>
    </div>
  );
}