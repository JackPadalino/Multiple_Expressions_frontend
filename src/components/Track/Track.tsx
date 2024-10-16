import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
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
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { storeTracks } = useAppSelector((state) => state.music);
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
    listens: 0,
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

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  useEffect(() => {
    const foundTrack = storeTracks.find((track) => track.id === Number(id));
    if (foundTrack) {
      const formattedTrack = formatDate(foundTrack);
      setTrack(formattedTrack);
      setLoading(false);
    }
  }, [storeTracks]);

  if (loading) return null;
  return (
    <Box component="main" className="trackMainContainer">
      <img
        className="trackPhoto"
        src={track.track_photo}
        onClick={() => handlePlay(track)}
        alt={`Cover are for track "${track.title}".`}
      />
      <Box component="section" className="trackTrackInfo">
        <Box className="trackTitlePlayDiv">
          <h2 className="trackTitle">{track.title}</h2>
          {/* <IconButton
            role="button"
            onClick={() => handlePlay(track)}
            className="playButton"
          >
            <PlayArrowIcon
              fontSize="large"
              sx={{
                color: "orange",
              }}
            />
          </IconButton> */}
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
