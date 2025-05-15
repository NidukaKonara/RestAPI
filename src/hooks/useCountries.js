import { useCallback, useEffect, useState } from "react";
import { fetchAll } from "../services/api";

export default function useCountries() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applyFilters = useCallback(() => {
    let result = allCountries;

    if (region) {
      result = result.filter((c) => c.region === region);
    }

    if (language) {
      result = result.filter((c) =>
        Object.values(c.languages || {}).includes(language)
      );
    }

    if (searchTerm) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(result);
  }, [allCountries, region, language, searchTerm]);

  const loadAll = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await fetchAll();
      setAllCountries(data);
      setFilteredCountries(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    countries: filteredCountries,
    loading,
    error,
    setRegion,
    setLanguage,
    setSearchTerm,
    reload: loadAll,
  };
}
