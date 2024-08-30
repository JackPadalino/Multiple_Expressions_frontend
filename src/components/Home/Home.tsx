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

const Home = () => {
  const dispatch = useAppDispatch();
  const { featuredTracks } = useAppSelector((state) => state.music);

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
      <Box component="section" className="homeInvitationDiv">
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
      </Box>
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
