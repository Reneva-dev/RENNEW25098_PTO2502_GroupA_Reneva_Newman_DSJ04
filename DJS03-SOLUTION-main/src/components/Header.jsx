import { useState } from "react";

export default function Header({ onSearch, onSortChange, onFilterChange, genres }) {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
    onFilterChange?.(value);
  };

  return (
    <header className="flex flex-wrap justify-between items-center gap-4 p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Podcast Explorer</h1>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search podcasts..."
          value={query}
          onChange={handleSearchChange}
          className="px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring"
        />

        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="px-2 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.title}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => onSortChange?.(e.target.value)}
          className="px-2 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring"
        >
          <option value="latest">Newest</option>
          <option value="az">Title (A-Z)</option>
          <option value="za">Title (Z-A)</option>
        </select>
      </div>
    </header>
  );
}
