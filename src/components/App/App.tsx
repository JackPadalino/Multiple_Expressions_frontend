import { useState, useEffect } from "react";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { Routes, Route, useLocation } from "react-router-dom";
import { TrackInt, ArtistInt } from "../../ints/ints";

// import { setStoreArtists } from "../../store/artistSlice";
// import { setStoreTracks, setStoreVideos } from "../../store/musicSlice";
// import { setMobileView } from "../../store/mobileViewSlice";

import {
  // Home,
  // NotFound,
  Loading,
  // Entrance,
  // Track,
  // Visual,
  // Auditory,
  // Live,
  // Waveform,
  // MobileWaveform,
  // Nav,
  // Admin,
  // Artist,
} from "../index";

import { Box } from "@mui/material";

import "./app.css";

const App = () => {
  // const dispatch = useDispatch();
  // const { mobileView } = useSelector((state) => state.mobileView);
  const [loading, setLoading] = useState<boolean>(true);
  const [artists, setArtists] = useState<ArtistInt[]>([]);
  const [tracks, setTracks] = useState<TrackInt[]>([]);

  // check for mobile view - send state up to redux store
  // to be used by other components like waveform
  const checkMobileView = () => {
    const mediaQuery = window.matchMedia("(max-width: 1280px)");
    // dispatch(setMobileView(mediaQuery.matches));
  };

  const fetchData = () => {
    let url: string;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    axios
      .get(`${url}/api/music/artists/all`)
      .then((response) => {
        // dispatch(setStoreArtists(artistData.data));
        setArtists(response.data);
        return axios.get(`${url}/api/music/tracks/all`);
      })
      .then((response) => {
        const updatedTracks = formatDates(response.data);
        // dispatch(setStoreTracks(updatedTracks));
        setTracks(updatedTracks);
        setLoading(false);
        return axios.get(`${url}/api/music/videos/all`);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const formatDates = (tracks: TrackInt[]) => {
    const newDateTracks = tracks.map((track) => {
      const dateObject = new Date(track.upload_date);
      const formattedDate = dateObject.toISOString().split("T")[0];
      // creating a new object to append the new updated upload date
      // the original objects are 'read only'
      return {
        ...track,
        upload_date: formattedDate,
      };
    });
    return newDateTracks;
  };

  useEffect(() => {
    checkMobileView();
    fetchData();
  }, []);

  // useLocation to determine the path name and render a nav
  // only on certain routes
  // const location = useLocation();

  // array of routes that should include the Nav component
  const routesWithNav: string[] = [
    "home",
    "visual",
    "auditory",
    "live",
    "track",
    "admin",
    "artist",
  ];

  if (loading) return <Loading />;
  return (
    <Box className="appContainer">
      {/* {routesWithNav.includes(location.pathname.split("/")[1]) && <Nav />} */}
      {/* <Routes> */}
      {/* <Route path="/" element={<Entrance />} /> */}
      {/* <Route path="/home" element={<Home />} /> */}
      {/* <Route path="/visual" element={<Visual />} /> */}
      {/* <Route path="/auditory" element={<Auditory />} /> */}
      {/* <Route path="/live" element={<Live />} /> */}
      {/* <Route path="/admin" element={<Admin />} /> */}
      {/* <Route path="/artist/:id" element={<Artist />} /> */}
      {/* <Route path="/track/:id" element={<Track />} /> */}
      {/* <Route path="/*" element={<NotFound />} /> */}
      {/* </Routes> */}
      {/* {mobileView ? <MobileWaveform /> : <Waveform />} */}
    </Box>
  );
};

export default App;
