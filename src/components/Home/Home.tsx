import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Box } from "@mui/material";

// React social Icons
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
// import "react-social-icons/tiktok";

import TrackSwiper from "./TrackSwiper";
import {
  setStoreWaveformTrack,
  setStoreDisplayWaveform,
} from "../../store/waveformSlice";
import { TrackInt } from "../../ints/ints";
import "./home.css";

const Home = () => {
  const dispatch = useAppDispatch();
  const { storeTracks } = useAppSelector((state) => state.music);
  const featuredTracks = storeTracks.filter((track) => track.featured == true);

  const handlePlay = (track: TrackInt) => {
    dispatch(setStoreDisplayWaveform(true));
    dispatch(setStoreWaveformTrack(track));
  };

  return (
    <Box className="homeMainContainer">
      <TrackSwiper featuredTracks={featuredTracks} handlePlay={handlePlay} />
      <Box className="homeIntroDiv">
        <h1 className="homeTitle">Multiple Expressions</h1>
        <p className="homeDesc">
          Showcasing the wealth of lesser-known talent of the NYC electronic
          music scene.
        </p>
      </Box>
      <p className="homeInvitation">
        Want to post with us? DM us on Instagram or email
        <span className="homeEmail"> multiple.expressionsnyc@gmail.com</span>.
      </p>
      <Box className="homeSocialsDiv">
        <p style={{ fontSize: "14px", fontStyle: "italic" }}>
          We post all tracks.
        </p>
        <SocialIcon
          bgColor="black"
          network="instagram"
          url="https://www.instagram.com/multiple.expressions?igsh=dzdiOHZsYXZqeXlr&utm_source=qr"
          target="_blank"
        />
      </Box>
    </Box>
  );
};

export default Home;
