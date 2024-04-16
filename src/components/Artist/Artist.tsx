import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Box } from "@mui/material";
import {
  setStoreWaveformTrack,
  setStoreDisplayWaveform,
} from "../../store/waveformSlice";

import ArtistInfo from "./ArtistInfo";
import ArtistTracks from "./ArtistTracks";
import { ArtistInt, TrackInt } from "../../ints/ints";
import "./artist.css";

const Artist = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { storeArtists } = useAppSelector((state) => state.artists);
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState<ArtistInt>({
    id: 0,
    name: "",
    profile_photo: "",
    bio: "",
    tracks: [],
    social_media: [],
  });

  const formatDates = (tracks: TrackInt[]) => {
    const newDateTracks = tracks.map((track) => {
      const dateObject = new Date(track.upload_date);
      const formattedDate = dateObject.toISOString().split("T")[0];
      // creating a new object to append the new updated upload date
      // the original objects are 'read only'
      return {
        ...track,
        upload_date: formattedDate,
      };
    });
    return newDateTracks;
  };

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  useEffect(() => {
    const foundArtist = storeArtists.find((artist) => artist.id === Number(id));
    if (foundArtist) {
      const formattedTracks = formatDates(foundArtist.tracks);
      // Have to create a new object with the formatted tracks.
      // State variables (storeArtists and storeTracks) that are being
      // pulled from the Redux store are read-only and cannot be modified
      const newArtistCopy = { ...foundArtist, tracks: formattedTracks };
      setArtist(newArtistCopy);
      setLoading(false);
    }
  }, []);

  if (loading) return null;
  return (
    <>
      <Box className="artistPageMainContainer">
        <ArtistInfo artist={artist} />
        <ArtistTracks artist={artist} handlePlay={handlePlay} />
      </Box>
    </>
  );
};

export default Artist;
