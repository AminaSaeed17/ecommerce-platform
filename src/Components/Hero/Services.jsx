import { Box, Container, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

// @ts-ignore
function Items({icon, title, desc}) {
  const theme = useTheme();
  return (
    <Box sx={{display: "flex", alignItems: "center",
     justifyContent: useMediaQuery('(min-width:600px)')? "center" : "left",
      gap: 1, p: 2, flexGrow: 1}}>
      {icon}
      <Box>
        <Typography variant="body1">{title}</Typography>
        <Typography  sx={{ fontWeight: 300, color: theme.palette.text.secondary }}
          variant="body1">{desc}</Typography>
      </Box>
    </Box>
  )
}

function Services() {
  const theme = useTheme();
  return (
    <Container sx={{bgcolor: theme.palette.mode === "dark"? "#000" : "#fff"}}>
      <Stack divider={useMediaQuery('(min-width:600px)') && <Divider orientation="vertical" flexItem />} sx={{flexWrap: "wrap"}} direction={"row"} alignItems={"center"}>
        <Items icon={<ElectricBoltIcon fontSize="large"/>} title={"Fast Delivery"} desc={"Start from $10"} />
        <Items icon={<CreditScoreOutlinedIcon fontSize="large"/>} title={"Money Guarantee"} desc={"7 Days Back"} />
        <Items icon={<WorkspacePremiumOutlinedIcon fontSize="large"/>} title={"365 Days"} desc={"For free Returns"} />
        <Items icon={<AccessAlarmOutlinedIcon fontSize="large"/>} title={"Payment"} desc={"Secure system"} />
      </Stack>
    </Container>
  )
}

export default Services
