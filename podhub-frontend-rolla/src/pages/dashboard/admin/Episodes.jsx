import { useEffect, useState } from "react";
import episodesService from "../../../services/episode.service";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  const fetchEpisodes = async () => {
    const data = await episodesService.getEpisodes();
    setEpisodes(data);
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handleDelete = async (id) => {
    await episodesService.deleteEpisode(id);
    fetchEpisodes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Manage Episodes</h1>
      <ul className="mt-4 space-y-3">
        {episodes.map((ep) => (
          <li key={ep._id} className="p-3 border rounded-md flex justify-between">
            <span>{ep.title}</span>
            <button
              onClick={() => handleDelete(ep._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
