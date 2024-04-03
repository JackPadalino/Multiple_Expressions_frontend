import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { TrackInt } from "../../ints/ints";
import "./auditory.css";

interface SingleTrackProps {
  track: TrackInt;
  handlePlay: (track: TrackInt) => void;
}

const SingleTrack = ({ track, handlePlay }: SingleTrackProps) => {
  return (
    <Box key={track.id} className="auditoryTrackContainer">
      <Link to={`/track/${track.id}`} className="auditoryTrackLink">
        <img className="auditoryTrackPhoto" src={track.track_photo} />
      </Link>
      <Box>
        <Box className="auditoryTrackTitlePlayDiv">
          <h2 className="auditoryTrackTitle">{track.title}</h2>
          <IconButton
            onClick={() => handlePlay(track)}
            sx={{ padding: "0px", margin: "0px" }}
          >
            <PlayArrowIcon
              fontSize="medium"
              sx={{
                color: "orange",
              }}
            />
          </IconButton>
        </Box>
        <Box className="auditoryArtistInfoDiv">
          {track.artists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="auditoryArtistLink"
            >
              {artist.name}
            </Link>
          ))}
        </Box>
        <Box className="auditoryTagsDiv">
          {track.tags.map((tag) => (
            <p className="auditoryTag" key={tag.id}>
              #{tag.title}
            </p>
          ))}
        </Box>
        <p className="auditoryPostedDate">Posted {track.upload_date}</p>
      </Box>
    </Box>
  );
};

export default SingleTrack;
