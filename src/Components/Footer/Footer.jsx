import { Box, Button, Typography } from "@mui/material";

export default function Footer() {
  return <>
    <Box
      sx={{
        bgcolor: "#2B3445",
        
        py: 1.3,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <Typography sx={{color: "white",display: "flex", justifyContent: "center",alignContent: "center" ,alignItems: "center, fontSize: 18" }}
        // color={"HighlightText"}
        
        variant="h6"
      >
        Designed and developed by
        <Button
          sx={{
            mx: 0.5,
            fontSize: "18px",
            textTransform: "capitalize",
            color: "#ff7790",
          }}
          variant="text"
          // color="primary"
        >
          Amina Saeed
        </Button>
        ©2023
      </Typography>
    </Box>
  </>
}
