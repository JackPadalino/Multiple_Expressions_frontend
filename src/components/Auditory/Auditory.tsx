import { useState, ChangeEvent, FormEvent } from "react";
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
  const currentTracks = filteredTracks.slice(indexOfFirstPost, indexOfLastPost);

  // search variables
  const [searchValue, setSearchValue] = useState<string>("");

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  const handleSeachChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tracks = storeTracks.filter(
      (track) =>
        track.title.toLowerCase() === searchValue ||
        track.artists
          .map((artist) => artist.name.toLowerCase())
          .includes(searchValue) ||
        track.tags.map((tag) => tag.title.toLowerCase()).includes(searchValue)
    );
    setFilteredTracks(tracks);
    setSearchValue("");
  };

  console.log(filteredTracks);

  if (Object.keys(storeTracks).length == 0) return null;
  return (
    <>
      <Box className="auditoryMainContainer">
        <Box className="filtersContainer">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search artists/tracks/tags"
              style={{ color: "black" }}
              value={searchValue}
              onChange={handleSeachChange}
            />
            <input type="submit" value="Search" style={{ color: "black" }} />
          </form>
        </Box>
        {/* <Box> */}
        <Box className="auditoryTracksDiv">
          {currentTracks.map((track) => (
            <SingleTrack key={track.id} track={track} handlePlay={handlePlay} />
          ))}
        </Box>
        {/* </Box> */}
        <Box className="pagination">
          <Paginate
            storeTracks={storeTracks}
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
