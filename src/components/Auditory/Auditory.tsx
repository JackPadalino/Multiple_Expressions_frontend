import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Box } from "@mui/material";

import {
  setStoreWaveformTrack,
  setStoreDisplayWaveform,
} from "../../store/waveformSlice";

import SingleTrack from "./SingleTrack";
import Paginate from "./Paginate";

import { TrackInt } from "../../ints/ints";
import "./auditory.css";

const Auditory = () => {
  const dispatch = useAppDispatch();
  const { storeTracks } = useAppSelector((state) => state.music);
  const [filteredTracks, setFilteredTracks] = useState<TrackInt[]>(storeTracks);

  // pagiation variables
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  const handleSeachChange = (e: FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value.toLowerCase().trim();
    if (searchValue === "") {
      setFilteredTracks(storeTracks);
    } else {
      //~~~~~search function - explicit match~~~~~//
      // const tracks = storeTracks.filter(
      //   (track) =>
      //     // searching for character/substring match in track title
      //     track.title.toLowerCase().includes(searchValue) ||
      //     // searching for character/substring match in artist names
      //     track.artists
      //       .map((artist) => artist.name.toLowerCase())
      //       .includes(searchValue) ||
      //     // searching for character/substring match in track tags
      //     track.tags.map((tag) => tag.title.toLowerCase()).includes(searchValue)
      // );
      //~~~~~search function -  character/substring search~~~~~//
      const tracks2 = storeTracks.filter(
        (track) =>
          // searching for character/substring match in track title
          track.title.toLowerCase().includes(searchValue) ||
          // searching for character/substring match in artist names
          track.artists.some((artist) =>
            artist.name.toLowerCase().includes(searchValue)
          ) ||
          // searching for character/substring match in track tags
          track.tags.some((tag) =>
            tag.title.toLowerCase().includes(searchValue)
          )
      );
      setFilteredTracks(tracks2);
    }
  };

  useEffect(() => {
    setFilteredTracks(storeTracks);
  }, [storeTracks]);

  if (Object.keys(storeTracks).length == 0) return null;
  return (
    <>
      <Box className="auditoryMainContainer">
        <Box className="filtersContainer">
          <input
            className="filterSearch"
            type="text"
            placeholder="Search artists, tracks, tags..."
            onChange={handleSeachChange}
          />
        </Box>
        <Box className="auditoryTracksDiv">
          {filteredTracks
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((track) => (
              <SingleTrack
                key={track.id}
                track={track}
                handlePlay={handlePlay}
              />
            ))}
        </Box>
        <Box className="pagination">
          <Paginate
            filteredTracks={filteredTracks}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default Auditory;
