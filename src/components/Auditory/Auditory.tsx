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

  // search variables
  // const [searchValue, setSearchValue] = useState<string>("");

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
      const tracks = storeTracks.filter(
        (track) =>
          track.title.toLowerCase() === searchValue ||
          track.artists
            .map((artist) => artist.name.toLowerCase())
            .includes(searchValue) ||
          track.tags.map((tag) => tag.title.toLowerCase()).includes(searchValue)
      );
      setFilteredTracks(tracks);
    }
  };

  // const handleSearch = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const tracks = storeTracks.filter(
  //     (track) =>
  //       track.title.toLowerCase() === searchValue ||
  //       track.artists
  //         .map((artist) => artist.name.toLowerCase())
  //         .includes(searchValue) ||
  //       track.tags.map((tag) => tag.title.toLowerCase()).includes(searchValue)
  //   );
  //   setFilteredTracks(tracks);
  //   setSearchValue("");
  // };

  useEffect(() => {
    setFilteredTracks(storeTracks);
  }, [storeTracks]);

  if (Object.keys(storeTracks).length == 0) return null;
  return (
    <>
      <Box className="auditoryMainContainer">
        <Box className="filtersContainer">
          <input
            type="text"
            placeholder="Search artists, tracks, tags..."
            style={{
              color: "black",
              width: "200px",
              borderRadius: "3px",
              paddingLeft: "5px",
              height: "25px",
              border: "none",
            }}
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
