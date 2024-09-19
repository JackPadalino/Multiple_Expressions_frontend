import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Box } from "@mui/material";

// React social Icons
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";

import TrackSwiper from "./TrackSwiper";
import {
  setStoreWaveformTrack,
  setStoreDisplayWaveform,
} from "../../store/waveformSlice";

import { TrackInt } from "../../ints/ints";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { featuredTracks } = useAppSelector((state) => state.music);

  // state variables and refs for video player
  const [liveReady, setLiveReady] = useState<boolean>(false);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const imgRef = useRef<any>(null);
  const playerRef = useRef<any>(null); // ref to store the player instance

  const handleVideoPreview = (hovering: boolean) => {
    if (playerRef.current) {
      if (imgRef.current.classList.contains("faded")) {
        imgRef.current.classList.remove("faded");
      } else {
        imgRef.current.classList.add("faded");
      }
      if (liveReady && hovering) {
        //   playerRef.current.play();
        // } else {
        //   playerRef.current.pause();
      }
    }
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
      player.addEventListener(IVSPlayer.PlayerState.READY, () => {
        setLiveReady(true);
      });

      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        // setIsPlaying(true);
        // setHasEnded(false);
      });
      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        setLiveReady(false);
      });
      // @ts-expect-error: TS ignore error
      player.addEventListener(IVSPlayer.PlayerEventType.ERROR, (err) => {
        if (err.type === "ErrorNotAvailable") {
          // setLiveReady(false);
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

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  return (
    <Box component="main" className="homeMainContainer">
      <TrackSwiper featuredTracks={featuredTracks} handlePlay={handlePlay} />
      <Box component="section" className="homeIntroDiv">
        <h1 className="homeTitle">Multiple Expressions</h1>
        <p className="homeDesc">
          Showcasing the wealth of lesser-known talent of the NYC electronic
          music scene
        </p>
      </Box>
      {/* <Box component="section" className="homeInvitationDiv">
        <p className="homeInvitation">
          Want to post with us? DM us on Instagram or email
          <span className="homeEmail"> multiple.expressionsnyc@gmail.com</span>.
        </p>
        <SocialIcon
          bgColor="black"
          network="instagram"
          url="https://www.instagram.com/multiple.expressions?igsh=dzdiOHZsYXZqeXlr&utm_source=qr"
          target="_blank"
        />
      </Box> */}

      <Box className="homePlayerContainer">
        <img
          src={`https://${
            import.meta.env.VITE_AWS_S3_BUCKET
          }.s3.amazonaws.com/site_photos/logo.jpeg`}
          // src="https://multiple-expressions-s3-bucket.s3.amazonaws.com/site_photos/logo.jpeg"
          className="homePlayerImg"
          ref={imgRef}
          onMouseEnter={() => handleVideoPreview(true)} // Start playing on hover
          onMouseLeave={() => handleVideoPreview(false)} // Pause when mouse leaves
          onClick={() => navigate("/live")}
        />
        <video
          ref={videoPlayerRef}
          className="homePlayer"
          id="video-player"
          playsInline
          // controls
          onClick={() => console.log("Video clicked!")}
        ></video>
      </Box>
      {liveReady && <p className="liveReadyText">Psst...we're live rn ^^^</p>}
      <Box component="section">
        <p className="disclaimer">
          Mutliple Expressions does not own or claim to own any of the music
          posted on this platform and will not use any posted material for
          profit. Please email us at{" "}
          <span className="homeEmail"> multiple.expressionsnyc@gmail.com</span>{" "}
          with any copyright issues.
        </p>
      </Box>
    </Box>
  );
};

export default Home;
