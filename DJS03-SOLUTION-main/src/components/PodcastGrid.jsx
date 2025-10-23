import PodcastCard from "./PodcastCard";

/**
 * Displays a grid layout of podcast preview cards.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.podcasts – Array of podcast objects to display.
 * @param {Array<Object>} props.genres – Array of genre objects used to map genre IDs to titles.
 * @returns {JSX.Element}
 */
export default function PodcastGrid({ podcasts, genres }) {
  if (!podcasts || podcasts.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-600">
        No podcasts found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} genres={genres} />
      ))}
    </div>
  );
}

