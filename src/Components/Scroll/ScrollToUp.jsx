import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";

export default function ScrollToUp() {
  return (
    <>
      <Zoom
        in={useScrollTrigger({
          // @ts-ignore
          Threshold: 100,
        })}
      >
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 9999,
          }}
        >
          <Fab onClick={()=>{window.scrollTo(0,0)}} size="small" color="primary" aria-label="add">
            <KeyboardArrowUp />
          </Fab>
        </Box>
      </Zoom>
    </>
  );
}
