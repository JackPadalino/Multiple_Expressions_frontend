import { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
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
        <p className="liveTitle">Multiple Expressions</p>
        {/* <Box className="setList">
          <p className="setTime">7:30pm-9:00pm</p>
          <a
            className="artistHandle"
            href="https://www.instagram.com/scottcantstop/?igsh=eDRhbTZuMnAzdDJk"
            target="_blank"
          >
            Partylord
          </a>
          <p className="setTime">9:00pm-10:00pm</p>
          <a
            className="artistHandle"
            href="https://www.instagram.com/luciahaze/?igsh=ZGJ6Z2V4MmM1enM%3D"
            target="_blank"
          >
            Lucia Haze
          </a>
          <p className="setTime">10:00pm-11:00pm</p>
          <a
            className="artistHandle"
            href="https://www.instagram.com/1800than/?igsh=MXhmOXc3N2Y5MWdsbA%3D%3D"
            target="_blank"
          >
            1800than
          </a>
          <p className="setTime">11:00pm-12:00am</p>
          <a
            className="artistHandle"
            href="https://www.instagram.com/steelyphilmusic/?igsh=OW5uMm15N3FqbHY4"
            target="_blank"
          >
            SteelyPhil
          </a>
          <p className="setTime">12:00am-1:00am</p>
          <a
            className="artistHandle"
            href="https://www.instagram.com/slkt.dj/?igsh=Y2h4bzl4OHh4M2Fk&utm_source=qr"
            target="_blank"
          >
            SLKT
          </a>
        </Box> */}
        <SocialIcon
          bgColor="black"
          network="instagram"
          url="https://www.instagram.com/multiple.expressions?igsh=dzdiOHZsYXZqeXlr&utm_source=qr"
          target="_blank"
        />
        <p className="liveInvitation">
          Follow us to stay updated about future events!
        </p>
      </Box>
      <Box className="chatContainer">
        <Chat isPlaying={isPlaying} />
      </Box>
    </Box>
  );
};

export default Live;
