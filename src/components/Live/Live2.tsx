import { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import { Box } from "@mui/material";

// React social Icons
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";

import "./live.css";

const Live = () => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const imgRef = useRef<any>(null);
  const playerRef = useRef<any>(null); // Ref to store the player instance

  const handleVideoPreview = (hovering: boolean) => {
    if (playerRef.current) {
      if (imgRef.current.classList.contains("faded")) {
        imgRef.current.classList.remove("faded");
      } else {
        imgRef.current.classList.add("faded");
      }
      if (hovering) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  };

  const handlePlay = () => {
    console.log("Playing video");
  };

  const initPlayer = async () => {
    // check if IVSPlayer is supported by the browser
    // @ts-expect-error: TS ignore error
    if (IVSPlayer.isPlayerSupported && videoPlayerRef.current) {
      // @ts-expect-error: TS ignore error
      const player = await IVSPlayer.create();
      playerRef.current = player;

      // attach event listeners to listen for changes in player
      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        // setIsPlaying(true);
        // setHasEnded(false);
      });
      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        // setIsPlaying(false);
        // setHasEnded(true);
      });
      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerEventType.ERROR, (err) => {
        if (err.type === "ErrorNotAvailable") {
          // setIsPlaying(false);
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
      <Box className="playerContainer">
        <img
          // data-src={`https://${
          //   import.meta.env.VITE_AWS_S3_BUCKET
          // }.s3.amazonaws.com/site_photos/logo.jpeg`}
          src="https://multiple-expressions-s3-bucket.s3.amazonaws.com/site_photos/logo.jpeg"
          className="livePlayerImg"
          ref={imgRef}
          onMouseEnter={() => handleVideoPreview(true)} // Start playing on hover
          onMouseLeave={() => handleVideoPreview(false)} // Pause when mouse leaves
        />
        <video
          ref={videoPlayerRef}
          className="player"
          id="video-player"
          playsInline
          controls
          onClick={handlePlay}
        ></video>
      </Box>
    </Box>
  );
};

export default Live;
