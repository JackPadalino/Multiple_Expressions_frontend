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
  const [auditoryTracks, setAuditoryTracks] = useState<TrackInt[]>([]);

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
      setAuditoryTracks(storeTracks);
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
      setAuditoryTracks(tracks2);
    }
  };

  // custom sort function
  const customSort = (arr: TrackInt[], sortOption: string) => {
    return arr.sort((a, b) => {
      if (sortOption === "2") {
        return a.artists[0].name.localeCompare(b.artists[0].name);
      } else if (sortOption === "3") {
        return b.artists[0].name.localeCompare(a.artists[0].name);
      } else if (sortOption === "4") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };

  // sort change handler - will need to make some kind of
  // custom sorting function to sort tracks by title and
  // artist name
  const handleSortChange = (e: FormEvent<HTMLSelectElement>) => {
    const sortOption = e.currentTarget.value;
    const sortedTracks = [...storeTracks];
    if (sortOption === "default" || sortOption === "0") {
      setAuditoryTracks(sortedTracks);
    } else if (sortOption === "1") {
      setAuditoryTracks(sortedTracks.reverse());
    } else {
      setAuditoryTracks(customSort(sortedTracks, sortOption));
    }
  };

  useEffect(() => {
    setAuditoryTracks(storeTracks);
  }, [storeTracks]);

  if (Object.keys(auditoryTracks).length == 0) return null;
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
          <select
            defaultValue={"default"}
            className="filterSort"
            onChange={handleSortChange}
          >
            <option value="default">Sort</option>
            <option value="0">Most recent</option>
            <option value="1">Least recent</option>
            <option value="2">Artists A-Z</option>
            <option value="3">Artists Z-A</option>
            <option value="4">Tracks A-Z</option>
            <option value="5">Tracks Z-A</option>
          </select>
        </Box>
        <Box className="auditoryTracksDiv">
          {auditoryTracks
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
            filteredTracks={auditoryTracks}
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
