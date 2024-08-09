import { MouseEvent, RefObject } from "react";
import { Link } from "react-router-dom";

// MUI imports
import { Box, Typography, Avatar, IconButton, Drawer } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";
import { TrackInt } from "../../ints/ints";
import "./mobileWaveform.css";

interface Drawer2Props {
  waveformTrack: TrackInt;
  isPlaying: boolean;
  handleToggleDrawer: () => void;
  handlePlayPauseClick: (event: MouseEvent) => void;
  handleJumpBack: () => void;
  handleJumpForward: () => void;
  trackModalState: boolean;
  waveformRef: RefObject<HTMLDivElement | null>;
  currentTime: number;
  trackDuration: number;
}

const MobileWaveformDrawer2 = ({
  waveformTrack,
  isPlaying,
  handleToggleDrawer,
  handlePlayPauseClick,
  handleJumpBack,
  handleJumpForward,
  trackModalState,
  waveformRef,
  currentTime,
  trackDuration,
}: Drawer2Props) => {
  // handling clicking on elements in the modal to play/pause
  // check if the clicked element is the div itself and not a child element
  const handleClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      handlePlayPauseClick(event);
    }
  };
  return (
    <Drawer
      anchor={"bottom"}
      open={trackModalState}
      onClose={handleToggleDrawer}
      // variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
    >
      <img src={waveformTrack.track_photo} className="backgroundImage" />
      <Box className="waveformDrawer2Container" onClick={handleClick}>
        <IconButton
          onClick={handleToggleDrawer}
          sx={{
            position: "absolute",
            top: 10,
            left: "5%",
          }}
        >
          <KeyboardArrowDownIcon
            fontSize="large"
            sx={{
              color: "white",
            }}
          />
        </IconButton>
        <img
          src={waveformTrack.track_photo}
          className={`waveformDrawer2Img ${
            isPlaying ? "visible" : "invisible"
          }`}
          onClick={handleClick}
        />
        <Box className="waveformDrawer2TrackArtistsDiv">
          {Object.keys(waveformTrack).length > 0 && (
            <>
              <Typography
                variant="h4"
                sx={{ color: "#EAA128", fontFamily: "Quantify" }}
                // className={`${isPlaying ? "visible" : "invisible"}`}
                onClick={handleClick}
              >
                {waveformTrack.title}
              </Typography>
              {waveformTrack.artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className={`waveformDrawer2ArtistLink`}
                  onClick={handleToggleDrawer}
                >
                  {artist.name}
                </Link>
              ))}
            </>
          )}
        </Box>
        <Box
          ref={waveformRef}
          className="waveformRef"
          // className={`waveformRef ${isPlaying ? "visible" : "invisible"}`}
        />
        <Box className="waveformDrawer2ControlsDiv">
          <IconButton onClick={handleJumpBack}>
            <Replay10Icon
              fontSize="large"
              sx={{
                color: "white",
              }}
              className={isPlaying ? "visible" : "invisible"}
            />
          </IconButton>
          <IconButton
            className={isPlaying ? "visible" : "invisible"}
            onClick={handlePlayPauseClick}
          >
            {isPlaying ? (
              <Avatar
                sx={{
                  bgcolor: "white",
                  border: "1px solid white",
                  width: 50,
                  height: 50,
                }}
              >
                <PauseIcon
                  fontSize="large"
                  sx={{
                    color: "black",
                  }}
                />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: "white",
                  border: "1px solid white",
                  width: 50,
                  height: 50,
                }}
              >
                <PlayArrowIcon
                  fontSize="large"
                  sx={{
                    color: "black",
                  }}
                />
              </Avatar>
            )}
          </IconButton>
          <IconButton onClick={handleJumpForward}>
            <Forward10Icon
              fontSize="large"
              sx={{
                color: "white",
              }}
              className={isPlaying ? "visible" : "invisible"}
            />
          </IconButton>
        </Box>
        <Typography
          sx={{ color: "white", fontSize: "16px" }}
          className={isPlaying ? "visible" : "invisible"}
          onClick={handlePlayPauseClick}
        >
          {currentTime}/{trackDuration}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default MobileWaveformDrawer2;
