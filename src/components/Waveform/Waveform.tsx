import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { Link } from "react-router-dom";

// MUI imports
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";

import { TrackInt, ArtistInt } from "../../ints/ints";
import "./waveform.css";

const Waveform = () => {
  const { storeWaveformTrack, storeDisplayWaveform } = useAppSelector(
    (state) => state.waveform
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  // track "listens" state variables
  // const [listenIssued, setListenIssued] = useState<boolean>(false);
  const listenIssued = useRef<boolean>(false);

  // function to issue listen for track
  const updateTrackListens = () => {
    let url: string;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    const trackId = storeWaveformTrack.id;
    axios
      .post(`${url}/api/music/tracks/update/${trackId}`)
      .then((response) => {
        console.log(response);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // function to format seconds into 00:00 format
  const formatTime = (seconds: number) =>
    [seconds / 60, seconds % 60]
      .map((v) => `0${Math.floor(v)}`.slice(-2))
      .join(":");

  const playSong = (track: TrackInt) => {
    if (waveformRef.current) {
      if (wavesurferRef.current) {
        // @ts-expect-error: TS ignore error
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }

      // @ts-expect-error: TS ignore error
      wavesurferRef.current = WaveSurfer.create({
        url: track.file,
        container: waveformRef.current,
        waveColor: "rgb(232, 214, 184)",
        progressColor: "rgb(234, 162, 42)",
        height: 75,
        mediaControls: false,
        barWidth: 2,
        barGap: NaN,
        barRadius: 5,
        barHeight: NaN,
        interact: true,
        dragToSeek: true,
        backend: "MediaElement",
        normalize: true,
        // for now we are pre-generating a random array of peaks
        // to help speed up loading - not ideal!
        // @ts-expect-error: TS ignore error
        peaks: Array.from({ length: 1000 }, () => Math.random()),
      });

      // @ts-expect-error: TS ignore error
      wavesurferRef.current.on("ready", () => {
        // @ts-expect-error: TS ignore error
        const seconds = wavesurferRef.current.getDuration();
        // @ts-expect-error: TS ignore error
        setTrackDuration(formatTime(seconds));
        // @ts-expect-error: TS ignore error
        wavesurferRef.current.play();
      });

      // @ts-expect-error: TS ignore error
      wavesurferRef.current.on("audioprocess", () => {
        // @ts-expect-error: TS ignore error
        const durationSeconds = wavesurferRef.current.getDuration();
        // @ts-expect-error: TS ignore error
        const currentTimeSeconds = wavesurferRef.current.getCurrentTime();
        // @ts-expect-error: TS ignore error
        setCurrentTime(formatTime(currentTimeSeconds));
        //logic for issue a new "listen"
        if (
          currentTimeSeconds / durationSeconds > 0.1 &&
          !listenIssued.current // no listen issued yet
        ) {
          listenIssued.current = true;
          updateTrackListens();
        }
      });

      // @ts-expect-error: TS ignore error
      wavesurferRef.current.on("play", () => {
        setIsPlaying(true);
      });

      // @ts-expect-error: TS ignore error
      wavesurferRef.current.on("pause", () => {
        setIsPlaying(false);
      });

      // we can log the actual peaks data once the audio file has been
      // decoded
      // wavesurferRef.current.on("decode", () => {
      //   const peaks = wavesurferRef.current.exportPeaks();
      //   console.log(JSON.stringify(peaks));
      // });
    }
  };

  useEffect(() => {
    playSong(storeWaveformTrack);
  }, [storeWaveformTrack]);

  return (
    <>
      {storeDisplayWaveform && (
        <Box className="waveformMain">
          <Box className="waveformTrackInfoDiv">
            <img
              src={storeWaveformTrack.track_photo}
              className="waveformTrackImg"
            />
            <Box className="waveformTrackArtistsDiv">
              <Typography
                variant="h6"
                sx={{ color: "#EAA128", fontFamily: "Coolvetica" }}
              >
                {storeWaveformTrack.title}
              </Typography>
              {Object.keys(storeWaveformTrack).length > 0 &&
                storeWaveformTrack.artists.map((artist: ArtistInt) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="waveformArtistLink"
                  >
                    {artist.name}
                  </Link>
                ))}
              <Typography sx={{ color: "white", fontSize: "12px" }}>
                {currentTime}/{trackDuration}
              </Typography>
            </Box>
          </Box>
          <Box ref={waveformRef}></Box>
          <Box className="waveformControlsDiv">
            {/* @ts-expect-error: TS ignore error */}
            <IconButton onClick={() => wavesurferRef.current.skip(-10)}>
              <Replay10Icon
                fontSize="large"
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
            {/* @ts-expect-error: TS ignore error */}
            <IconButton onClick={() => wavesurferRef.current.playPause()}>
              {isPlaying ? (
                <Avatar
                  sx={{
                    bgcolor: "black",
                    border: "2px solid white",
                    width: 50,
                    height: 50,
                  }}
                >
                  <PauseIcon
                    fontSize="large"
                    sx={{
                      color: "white",
                    }}
                  />
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    bgcolor: "white",
                    border: "2px solid white",
                    width: 50,
                    height: 50,
                  }}
                >
                  <PlayArrowIcon
                    fontSize="large"
                    sx={{
                      color: "black",
                    }}
                  />
                </Avatar>
              )}
            </IconButton>
            {/* @ts-expect-error: TS ignore error */}
            <IconButton onClick={() => wavesurferRef.current.skip(10)}>
              <Forward10Icon
                fontSize="large"
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Waveform;
