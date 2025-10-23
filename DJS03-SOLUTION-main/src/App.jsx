import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";

export default function App() {
  const [allPodcasts, setAllPodcasts] = useState([]); // full list
  const [podcasts, setPodcasts] = useState([]);       // filtered + sorted list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");   // search term
  const [sortOption, setSortOption] = useState("latest"); // 'latest', 'az', or 'za'
  const [genreFilter, setGenreFilter] = useState(""); // selected genre

  // Fetch podcasts on mount
  useEffect(() => {
    fetchPodcasts(
      (data) => { 
        setAllPodcasts(data);
        setPodcasts(data);
        setLoading(false);
      }, 
      setError, 
      setLoading
    );
  }, []);

  // Apply all filters and sorting whenever any dependency changes
  useEffect(() => {
    const filtered = applyFilters(allPodcasts, searchTerm, sortOption, genreFilter);
    setPodcasts(filtered);
  }, [searchTerm, sortOption, genreFilter, allPodcasts]);

  // Helper function: handles search, genre filter, and sort
  const applyFilters = (data, searchTerm, sortOption, genreFilter) => {
    const term = searchTerm.trim().toLowerCase();

    // Filter by search term
    let filtered = data.filter(podcast =>
      podcast.title.toLowerCase().includes(term)
    );

    // Filter by genre
    if (genreFilter) {
      filtered = filtered.filter(podcast => 
        podcast.genres.includes(Number(genreFilter))
      );
    }

    // Sort based on selected option
    if (sortOption === "latest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    } else if (sortOption === "az") {
      filtered = [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortOption === "za") {
      filtered = [...filtered].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return filtered;
  };

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
          <PodcastGrid podcasts={podcasts} genres={genres} />
        )}
      </main>
    </>
  );
}
