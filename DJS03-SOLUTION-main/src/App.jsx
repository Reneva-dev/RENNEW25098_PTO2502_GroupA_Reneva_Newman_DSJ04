import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";

export default function App() {
  const [allPodcasts, setAllPodcasts] = useState([]);      // full list
  const [podcasts, setPodcasts] = useState([]);            // filtered list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");        // new state for search

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

useEffect(() => {
  const filtered = applyFilters(allPodcasts, searchTerm, sortOption);
  setPodcasts(filtered);
}, [searchTerm, sortOption, allPodcasts]);


  return (
    <>
      <Header onSearch={setSearchTerm} />
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
              Error occurred while trying fetching podcasts: {error}
            </div>
          </div>
        )}
        {!loading && !error && (
          <PodcastGrid podcasts={podcasts} genres={genres} />
        )}
      </main>
    </>
  );

  const [sortOption, setSortOption] = useState("latest"); // 'latest', 'az', or 'za'

// this function applies sorting after search/filter
const applyFilters = (data, searchTerm, sortOption) => {
  const term = searchTerm.trim().toLowerCase();

  // 1️⃣ Filter by search term
  let filtered = data.filter(podcast =>
    podcast.title.toLowerCase().includes(term)
  );

  // 2️⃣ Sort based on selected option
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
}
