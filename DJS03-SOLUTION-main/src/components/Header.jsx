import { useState } from "react";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  <select
  onChange={(e) => onSortChange && onSortChange(e.target.value)}
  className="ml-4 px-2 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring"
>
  <option value="latest">Newest</option>
  <option value="az">Title (A-Z)</option>
  <option value="za">Title (Z-A)</option>
</select>


  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Podcast Explorer</h1>
      <input
        type="text"
        placeholder="Search podcasts..."
        value={query}
        onChange={handleChange}
        className="px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring"
      />
    </header>
  );
}

