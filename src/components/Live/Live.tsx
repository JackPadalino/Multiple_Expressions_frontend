import { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import "./live.css";

const Live = () => {
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const theme = createTheme();

  theme.typography.h6 = {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: "10px", // font size for portrait and landscape views
    "@media (min-width:1280px)": {
      fontSize: "16px",
    },
  };

  const initPlayer = async () => {
    // check if IVSPlayer is supported by the browser
    if (IVSPlayer.isPlayerSupported && videoPlayerRef.current) {
      const player = await IVSPlayer.create();

      // attach event listeners to listen for changes in player
      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        setIsPlaying(true);
        setHasEnded(false);
      });

      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        setIsPlaying(false);
        setHasEnded(true);
      });

      player.addEventListener(IVSPlayer.PlayerEventType.ERROR, (err) => {
        if (err.type === "ErrorNotAvailable") {
          setIsPlaying(false);
        }
      });

      player.attachHTMLVideoElement(videoPlayerRef.current);
      player.load(import.meta.env.VITE_LIVE_STREAM_LINK);
      player.play();

      // pause the player when the component unmounts
      return () => {
        player.pause();
      };
    }
  };

  useEffect(() => {
    initPlayer();
  }, []);

  return (
    <Box className="liveMainContainer">
      <Box className="phantomContainer" />
      <ThemeProvider theme={theme}>
        <Box className="playerContainer">
          <video
            ref={videoPlayerRef}
            className="player"
            id="video-player"
            playsInline
            controls
          ></video>
          {!isPlaying && !hasEnded && (
            <Typography variant="h6">
              Looks likes nothing is playing! Check back soon or refresh your
              browser.
            </Typography>
          )}
          {hasEnded && (
            <Typography variant="h6">
              Our live stream has ended. Thanks for coming!
            </Typography>
          )}
        </Box>
      </ThemeProvider>
      <Box className="chatContainer">
        <Chat isPlaying={isPlaying} />
      </Box>
    </Box>
  );
};

export default Live;
