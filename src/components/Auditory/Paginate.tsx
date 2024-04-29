import { Pagination, Stack } from "@mui/material";
import { TrackInt } from "../../ints/ints";
import "./auditory.css";
import { ChangeEvent } from "react";

interface PaginateProps {
  storeTracks: TrackInt[];
  postsPerPage: number;
  currentPage: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
}

const Paginate = ({
  storeTracks,
  postsPerPage,
  currentPage,
  handlePageChange,
}: PaginateProps) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(storeTracks.length / postsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        size="large"
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
