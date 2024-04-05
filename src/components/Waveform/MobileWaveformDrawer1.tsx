import "./mobileWaveform.css";

// modal imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { TrackInt } from "../../ints/ints";

interface Props {
  waveformTrack: TrackInt;
  isPlaying: boolean;
  toggleDrawer: boolean;
  handlePlayPauseClick:
}

const MobileWaveformDrawer1 = ({
  waveformTrack,
  isPlaying,
  toggleDrawer,
  handlePlayPauseClick,
}) => {
  return (
    <Box
      className="waveformDrawer1Container"
      onClick={toggleDrawer("bottom", true)}
    >
      <img src={waveformTrack.track_photo} className="waveformDrawer1Img" />
      <Typography
        variant="h6"
        sx={{ color: "#EAA128", fontFamily: "Coolvetica" }}
      >
        {waveformTrack.title}
      </Typography>
      <IconButton onClick={handlePlayPauseClick}>
        {isPlaying ? (
          <PauseIcon
            fontSize="large"
            sx={{
              color: "white",
            }}
          />
        ) : (
          <PlayArrowIcon
            fontSize="large"
            sx={{
              color: "white",
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default MobileWaveformDrawer1;
