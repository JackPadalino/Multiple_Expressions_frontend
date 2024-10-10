import { Link } from "react-router-dom";

import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Swiper required modules
import {
  // Navigation,
  Autoplay,
  // Pagination
} from "swiper/modules";
import { TrackInt } from "../../ints/ints";
import "./trackSwiper.css";

interface SwiperProps {
  featuredTracks: TrackInt[];
  handlePlay: (track: TrackInt) => void;
}

const TrackSwiper = ({ featuredTracks, handlePlay }: SwiperProps) => {
  return (
    <Box component="section" className="swiperMainContainer">
      <Swiper
        // navigation={true}
        // pagination={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {featuredTracks.map((track, index) => (
          <SwiperSlide key={index}>
            <img
              src={track.track_photo}
              className="swiperTrackImg"
              alt={`Covert art for new featured track "${track.title}".`}
            />
            <Box component="section" className="swiperTrackInfo">
              <h3>New featured track</h3>
              <Box className="swiperTrackTitlePlayDiv">
                <Link className="swiperTrackLink" to={`/track/${track.id}`}>
                  <h2 className="swiperTrackTitle">{track.title}</h2>
                </Link>
                <IconButton
                  role="button"
                  onClick={() => handlePlay(track)}
                  sx={{ padding: "0px", margin: "0px" }}
                >
                  <PlayArrowIcon
                    fontSize="medium"
                    sx={{
                      color: "orange",
                      fontSize: "35px",
                    }}
                  />
                </IconButton>
              </Box>
              <Box className="swiperArtistInfoDiv">
                {track.artists.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="swiperArtistLink"
                  >
                    {artist.name}
                  </Link>
                ))}
              </Box>
              <Box className="swiperTagsDiv">
                {track.tags.map((tag) => (
                  <p className="swiperTag" key={tag.id}>
                    #{tag.title}
                  </p>
                ))}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TrackSwiper;
