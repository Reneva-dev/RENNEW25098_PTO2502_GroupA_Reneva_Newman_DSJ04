import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";

/**
 * Root component of the Podcast Explorer application.
 * Handles fetching podcast data, search, filter, sort, pagination logic and rendering.
 *
 * @component
 * @returns {JSX.Element} The rendered application interface.
 */


export default function App() {
  const [allPodcasts, setAllPodcasts] = useState([]); // full list
  const [filteredList, setFilteredList] = useState([]); // list after search/filter/sort
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest"); // 'latest', 'az', 'za'
  const [genreFilter, setGenreFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data once
  useEffect(() => {
    fetchPodcasts(
      (data) => {
        setAllPodcasts(data);
        setLoading(false);
      },
      setError,
      setLoading
    );
  }, []);

  // Apply filtering + sorting whenever dependencies change
  useEffect(() => {
    const updated = applyFilters(allPodcasts, searchTerm, sortOption, genreFilter);
    setFilteredList(updated);
    setCurrentPage(1); // reset to first page whenever filter/search/sort changes
  }, [allPodcasts, searchTerm, sortOption, genreFilter]);

  // Helper function
  const applyFilters = (data, search, sortOpt, genre) => {
    const term = search.trim().toLowerCase();

    // 1. Filter by search
    let result = data.filter(podcast =>
      podcast.title.toLowerCase().includes(term)
    );

    // 2. Filter by genre
    if (genre) {
      result = result.filter(podcast =>
        podcast.genres.includes(Number(genre))
      );
    }

    // 3. Sort
    if (sortOpt === "latest") {
      result = [...result].sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    } else if (sortOpt === "az") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortOpt === "za") {
      result = [...result].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return result;
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <Header
        onSearch={setSearchTerm}
        onSortChange={setSortOption}
        onFilterChange={setGenreFilter}
        genres={genres}
      />
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}
        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while fetching podcasts: {error}
            </div>
          </div>
        )}
        {!loading && !error && (
          <>
            <PodcastGrid podcasts={currentItems} genres={genres} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </main>
    </>
  );
}

