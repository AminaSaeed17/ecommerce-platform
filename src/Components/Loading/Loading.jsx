import { Box } from "@mui/material";
import { FadeLoader } from "react-spinners";

export default function Loading() {

  const override = {
    display: "block",
    margin: "0 auto",
    Padding: "15px"
  };

  return (
    <Box className="sweet-loading" sx={{py:15}}>
      <FadeLoader
        color="#1976d2"
        loading={true}
        cssOverride={override}
        aria-label="Loading Spinner"
      />
    </Box>
  );
}