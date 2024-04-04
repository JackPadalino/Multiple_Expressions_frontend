import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
import "react-social-icons/soundcloud";

import { Box } from "@mui/material";
import { ArtistInt } from "../../ints/ints";
import "./artist.css";

interface ArtistInfoProps {
  artist: ArtistInt;
}

const ArtistInfo = ({ artist }: ArtistInfoProps) => {
  return (
    <Box className="artistPageArtistDiv">
      <img className="artistPageMobileImg" src={artist.profile_photo} />
      <Box className="artistPageArtistInfo">
        <h1 className="artistPageName">{artist.name}</h1>
        <p>{artist.bio}</p>
        <Box className="artistPageSocials">
          {artist.social_media.map((social) => (
            <SocialIcon
              key={social.id}
              bgColor="black"
              network={social.platform}
              url={social.link}
              target="_blank"
            />
          ))}
        </Box>
      </Box>
      <img className="artistPageDesktopImg" src={artist.profile_photo} />
    </Box>
  );
};

export default ArtistInfo;
