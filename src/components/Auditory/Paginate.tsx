import { Pagination, Stack } from "@mui/material";
import { TrackInt } from "../../ints/ints";
import "./auditory.css";
import { ChangeEvent } from "react";

interface PaginateProps {
  filteredTracks: TrackInt[];
  postsPerPage: number;
  currentPage: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
}

const Paginate = ({
  filteredTracks,
  postsPerPage,
  currentPage,
  handlePageChange,
}: PaginateProps) => {
  return (
    <Stack>
      <Pagination
        count={Math.ceil(filteredTracks.length / postsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        size="medium"
        sx={{
          "& button": {
            color: "white",
          },
        }}
      />
    </Stack>
  );
};

export default Paginate;
