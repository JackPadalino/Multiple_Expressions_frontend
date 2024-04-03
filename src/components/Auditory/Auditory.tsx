import { useState, ChangeEvent } from "react";
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

  // pagiation variables
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTracks = storeTracks.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  if (Object.keys(storeTracks).length == 0) return null;
  return (
    <>
      <Box className="auditoryMainContainer">
        <Box>
          <Box className="auditoryTracksDiv">
            {currentTracks.map((track) => (
              <SingleTrack
                key={track.id}
                track={track}
                handlePlay={handlePlay}
              />
            ))}
          </Box>
        </Box>
        <Box className="pagination">
          <Paginate
            storeTracks={storeTracks}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            handleChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default Auditory;
