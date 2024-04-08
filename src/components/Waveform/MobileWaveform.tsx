import { useState, useEffect, useRef, MouseEvent } from "react";
import { useAppSelector } from "../../store/hooks";
import WaveSurfer from "wavesurfer.js";
import { Box } from "@mui/material";

import MobileWaveformDrawer1 from "./MobileWaveformDrawer1";
import MobileWaveformDrawer2 from "./MobileWaveformDrawer2";
import { TrackInt } from "../../ints/ints";
import "./mobileWaveform.css";

const MobileWaveform = () => {
  const [trackModalState, setTrackModalState] = useState<boolean>(false); // modal state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackDuration, setTrackDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<HTMLDivElement | null>(null);

  const { storeWaveformTrack } = useAppSelector((state) => state.waveform);

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
        const seconds = wavesurferRef.current.getDuration();
        // @ts-expect-error: TS ignore error
        setTrackDuration(formatTime(seconds));
        // @ts-expect-error: TS ignore error
        wavesurferRef.current.play();
      });

      // @ts-expect-error: TS ignore error
      wavesurferRef.current.on("audioprocess", () => {
        // @ts-expect-error: TS ignore error
        const seconds = wavesurferRef.current.getCurrentTime();
        // @ts-expect-error: TS ignore error
        setCurrentTime(formatTime(seconds));
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
      {Object.keys(storeWaveformTrack).length > 0 && (
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
        currentTime={currentTime}
        trackDuration={trackDuration}
      />
    </Box>
  );
};

export default MobileWaveform;
