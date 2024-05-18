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

  // sorting and searching state variables
  const [searchCriteria, setSearchCriteria] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("");

  // pagiation state variables
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

  const handleSearchChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(e.currentTarget.value.toLocaleLowerCase().trimEnd());
  };

  const handleSortChange = (e: FormEvent<HTMLSelectElement>) => {
    setSortCriteria(e.currentTarget.value);
  };

  let searchedTracks;
  if (searchCriteria !== "") {
    searchedTracks = storeTracks.filter(
      (track) =>
        // searching for character/substring match in track title
        track.title.toLowerCase().includes(searchCriteria) ||
        // searching for character/substring match in artist names
        track.artists.some((artist) =>
          artist.name.toLowerCase().includes(searchCriteria)
        ) ||
        // searching for character/substring match in track tags
        track.tags.some((tag) =>
          tag.title.toLowerCase().includes(searchCriteria)
        )
    );
  } else {
    searchedTracks = storeTracks;
  }

  // custom sort function to sort data based on sort criteri
  const customSort = (arr: TrackInt[], sortCriteria: string) => {
    return arr.sort((a, b) => {
      if (sortCriteria === "2") {
        return a.artists[0].name.localeCompare(b.artists[0].name);
      } else if (sortCriteria === "3") {
        return b.artists[0].name.localeCompare(a.artists[0].name);
      } else if (sortCriteria === "4") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };

  let sortedTracks = [...searchedTracks];
  if (sortCriteria === "" || sortCriteria === "0") {
    // pass
  } else if (sortCriteria === "1") {
    sortedTracks = sortedTracks.reverse();
  } else {
    customSort(sortedTracks, sortCriteria);
  }

  if (Object.keys(storeTracks).length == 0) return null;
  return (
    <>
      <Box className="auditoryMainContainer">
        <Box className="filtersContainer">
          <input
            className="filterSearch"
            type="text"
            placeholder="Search artists, tracks, tags..."
            onChange={handleSearchChange}
          />
          <select
            defaultValue={""}
            className="filterSort"
            onChange={handleSortChange}
          >
            <option value="">Sort</option>
            <option value="0">Most recent</option>
            <option value="1">Least recent</option>
            <option value="2">Artists A-Z</option>
            <option value="3">Artists Z-A</option>
            <option value="4">Tracks A-Z</option>
            <option value="5">Tracks Z-A</option>
          </select>
        </Box>
        <Box className="auditoryTracksDiv">
          {sortedTracks
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
            filteredTracks={searchedTracks}
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
