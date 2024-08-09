import { useState, useEffect, useRef, MouseEvent } from "react";
import { useAppSelector } from "../../store/hooks";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { Box } from "@mui/material";

import MobileWaveformDrawer1 from "./MobileWaveformDrawer1";
import MobileWaveformDrawer2 from "./MobileWaveformDrawer2";
import { TrackInt } from "../../ints/ints";
import "./mobileWaveform.css";

const MobileWaveform = () => {
  const { storeDisplayWaveform, storeWaveformTrack } = useAppSelector(
    (state) => state.waveform
  );

  const [trackModalState, setTrackModalState] = useState<boolean>(false); // modal state
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDurationDisplay, setTrackDurationDisplay] = useState(0);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState(0);

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<HTMLDivElement | null>(null);

  // track "listens" ref variables
  let listenIssued = useRef<boolean>(false);
  let trackDuration = useRef<number>(0);
  let listenReference = useRef<number>(0);
  let currentListenTime = useRef<number>(0);
  let totalListenTime = useRef<number>(0);

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
        height: 35,
        mediaControls: false,
        barWidth: 2,
        barGap: NaN,
        barRadius: 5,
        barHeight: NaN,
        interact: true,
        dragToSeek: true,
        backend: "MediaElement",
        normalize: true,
        // for now we are pre-generating a random array of peaks - not ideal!
        // @ts-expect-error: TS ignore error
        peaks: Array.from({ length: 1000 }, () => Math.random()),
      });

      // @ts-expect-error: TS ignore error
      wavesurferRef.current.on("ready", () => {
        // @ts-expect-error: TS ignore error
        const durationSeconds = wavesurferRef.current.getDuration();
        // set ref for calculating track listens
        trackDuration.current = durationSeconds;
        // @ts-expect-error: TS ignore error
        setTrackDurationDisplay(formatTime(durationSeconds));
        // @ts-expect-error: TS ignore error
        wavesurferRef.current.play();
      });

      /**~~~~~Logic for issuing track listens~~~~~**/
      /**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      // @ts-expect-error: TS ignore error
      wavesurferRef.current.on("timeupdate", (time) => {
        if (
          !listenIssued.current &&
          totalListenTime.current / trackDuration.current >= 0.1
        ) {
          listenIssued.current = true;
          updateTrackListens();
        }
        // @ts-expect-error: TS ignore error
        setCurrentTimeDisplay(formatTime(time));
        // calculation to determine "distance" from listenReference point
        totalListenTime.current =
          currentListenTime.current - listenReference.current;
        currentListenTime.current = time;
      });

      // @ts-expect-error: TS ignore error
      // resetting listen reference if user skips ahead/jumps back in track
      wavesurferRef.current.on("interaction", (time) => {
        listenReference.current = time;
      });

      /**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      /**~~~~~Logic for issuing track listens~~~~~**/

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

  const handlePlayPauseClick = (event: MouseEvent) => {
    event.stopPropagation();

    if (wavesurferRef.current) {
      // @ts-expect-error: TS ignore error
      wavesurferRef.current.playPause();
    }
  };

  // modal toggle function
  const handleToggleDrawer = () => {
    setTrackModalState(!trackModalState);
  };

  const handleJumpBack = () => {
    // @ts-expect-error: TS ignore error
    wavesurferRef.current.skip(-10);
  };

  const handleJumpForward = () => {
    // @ts-expect-error: TS ignore error
    wavesurferRef.current.skip(10);
  };

  useEffect(() => {
    playSong(storeWaveformTrack);
  }, [storeWaveformTrack]);

  return (
    <Box className="mobileWaveformContainer">
      {storeDisplayWaveform && (
        <MobileWaveformDrawer1
          waveformTrack={storeWaveformTrack}
          isPlaying={isPlaying}
          handleToggleDrawer={handleToggleDrawer}
          handlePlayPauseClick={handlePlayPauseClick}
        />
      )}
      <MobileWaveformDrawer2
        waveformTrack={storeWaveformTrack}
        isPlaying={isPlaying}
        handleToggleDrawer={handleToggleDrawer}
        handlePlayPauseClick={handlePlayPauseClick}
        handleJumpBack={handleJumpBack}
        handleJumpForward={handleJumpForward}
        trackModalState={trackModalState}
        waveformRef={waveformRef}
        currentTime={currentTimeDisplay}
        trackDuration={trackDurationDisplay}
      />
    </Box>
  );
};

export default MobileWaveform;
