import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  setStoreDisplayWaveform,
  setStoreWaveformTrack,
} from "../../store/waveformSlice";
import { ArtistInt, TrackInt } from "../../ints/ints";
import "./track.css";

const Track = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [track, setTrack] = useState<TrackInt>({
    id: 0,
    title: "",
    artists: [],
    description: "",
    file: "",
    track_photo: "",
    tags: [],
    featured: false,
    upload_date: "",
  });

  const formatDate = (track: TrackInt) => {
    const dateObject = new Date(track.upload_date);
    const formattedDate = dateObject.toISOString().split("T")[0];
    return {
      ...track,
      upload_date: formattedDate,
    };
  };

  const fetchTrackData = async () => {
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    try {
      const response = await axios.get(`${url}/api/music/tracks/${id}`);
      const updatedTrack = formatDate(response.data);
      setTrack(updatedTrack);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            "Request failed with status code:",
            error.response.status
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  useEffect(() => {
    fetchTrackData();
  }, []);

  if (loading) return null;
  return (
    <Box className="trackMainContainer">
      <img
        className="trackPhoto"
        src={track.track_photo}
        onClick={() => handlePlay(track)}
      />
      <Box className="trackTrackInfo">
        <Box className="trackTitlePlayDiv">
          <h2 className="trackTitle">{track.title}</h2>
          <IconButton
            onClick={() => handlePlay(track)}
            sx={{ padding: "0px", margin: "0px" }}
          >
            <PlayArrowIcon
              fontSize="large"
              sx={{
                color: "orange",
              }}
            />
          </IconButton>
        </Box>
        <Box className="trackArtists">
          {track.artists.map((artist: ArtistInt) => (
            <Link
              key={artist.id}
              className="trackArtistLink"
              to={`/artist/${artist.id}`}
            >
              {artist.name}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Track;
