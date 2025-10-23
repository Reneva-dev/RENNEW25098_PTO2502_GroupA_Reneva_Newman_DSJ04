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
    // whenever searchTerm (or future filters/sorts) changes — apply filtering
    const term = searchTerm.trim().toLowerCase();
    const filtered = allPodcasts.filter(podcast =>
      podcast.title.toLowerCase().includes(term)
    );
    setPodcasts(filtered);
  }, [searchTerm, allPodcasts]);

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
}
