import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getByCode } from "../services/api";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await getByCode(code);
      setCountry(data[0]);
    })();
  }, [code]);

  if (!country)
    return <p className="text-center text-lg text-gray-500">Loading…</p>;

  const { name, flags, population, region, capital, languages } = country;

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
      {/* Back Link */}
      <Link
        to="/"
        className="text-indigo-600 font-semibold text-lg hover:text-indigo-800 transition-all duration-200"
      >
        &larr; Back
      </Link>

      {/* Country Information */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Flag */}
        <img
          src={flags.svg}
          alt={`${name.common} flag`}
          className="w-full md:w-1/2 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
        />

        {/* Details */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {name.common}
          </h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Official Name:</span>{" "}
            {name.official}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Capital:</span> {capital?.[0]}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Region:</span> {region}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Population:</span>{" "}
            {population.toLocaleString()}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Languages:</span>{" "}
            {Object.values(languages).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
