import { useState, useEffect, useRef } from "react";
// import Chat from "./Chat";
import { Box } from "@mui/material";

// React social Icons
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";

import "./live.css";

const Live = () => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  const initPlayer = async () => {
    // check if IVSPlayer is supported by the browser
    // @ts-expect-error: TS ignore error
    if (IVSPlayer.isPlayerSupported && videoPlayerRef.current) {
      // @ts-expect-error: TS ignore error
      const player = await IVSPlayer.create();

      // attach event listeners to listen for changes in player
      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        setIsPlaying(true);
        setHasEnded(false);
      });
      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        setIsPlaying(false);
        setHasEnded(true);
      });
      // @ts-expect-error: TS ignore error
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
      <Box className="playerContainer">
        {!isPlaying && !hasEnded && (
          <p className="streamMsg">
            Looks like nothing is playing! Check back soon or refresh your
            browser.
          </p>
        )}
        {hasEnded && (
          <p className="streamMsg">
            Our live stream has ended. Thanks for coming!
          </p>
        )}
        <video
          ref={videoPlayerRef}
          className="player"
          id="video-player"
          playsInline
          controls
        ></video>
        <p className="partyAnn">
          Psst...Multiple Expressions is having a party at{" "}
          <span className="partyAnnSpan">Cafe Kitsune</span> on{" "}
          <span className="partyAnnSpan">05.30.2024</span>!
        </p>
        <SocialIcon
          bgColor="black"
          network="instagram"
          url="https://www.instagram.com/multiple.expressions?igsh=dzdiOHZsYXZqeXlr&utm_source=qr"
          target="_blank"
        />
        <p className="partyAnn">Follow us to stay updated!</p>
      </Box>
      {/* <Box className="chatContainer">
        <Chat isPlaying={isPlaying} />
      </Box> */}
    </Box>
  );
};

export default Live;
