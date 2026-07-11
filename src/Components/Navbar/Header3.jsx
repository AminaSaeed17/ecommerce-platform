// @ts-nocheck
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import {
  SportsEsportsOutlined,
  ElectricBikeOutlined,
  LaptopChromebookOutlined,
  MenuBookOutlined,
  CategoryOutlined,
  Close,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { userContext } from "../Context/UserContext";

export default function Header3() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    /** @type {{ currentTarget: import("react").SetStateAction<null>; }} */ event,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (/** @type {any} */ anchor, /** @type {boolean} */ open) =>
    (/** @type {{ type: string; }} */ event) => {
      if (
        event.type === "keydown" &&
        // @ts-ignore
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const Links = ["home", "products", "category", "brands"];
  let {userToken} =useContext(userContext)
  const isDesktop = useMediaQuery("(min-width:1200px)");
const isMobile = useMediaQuery("(max-width:1200px)");

  return (
    <>
      {userToken && <>
        <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 5,
        }}
      >
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              width: 222,
              // @ts-ignore
              bgcolor: theme.palette.mainColor.main,

              color: theme.palette.text.secondary,
            }}
          >
            <CategoryOutlined />
            <Typography
              sx={{
                padding: "0",
                textTransform: "capitalize",
                mx: 1,
              }}
            >
              Categories
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <KeyboardArrowRightOutlinedIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            aria-labelledby="basic-button"
            sx={{
              ".MuiPaper-root": {
                width: 220,
                // @ts-ignore
                bgcolor: theme.palette.mainColor.main,
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ElectricBikeOutlined fontSize="small" />
              </ListItemIcon>

              <ListItemText>Bikes</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LaptopChromebookOutlined fontSize="small" />
              </ListItemIcon>

              <ListItemText>Electronics</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <MenuBookOutlined fontSize="small" />
              </ListItemIcon>

              <ListItemText>Books</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SportsEsportsOutlined fontSize="small" />
              </ListItemIcon>

              <ListItemText>Games</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {isDesktop && (
          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={4}>
            {Links.map((item) => (
              <Link
                component={NavLink}
                sx={{
                  textDecoration: "none",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : theme.palette.text.primary,
                  textTransform: "capitalize",
                  "&.active": {
                    color: "red",
                  },
                }}
                to={`/${item}`}
              >
                {item}
              </Link>
            ))}
          </Stack>
        )}

        {isMobile && (
          <IconButton onClick={toggleDrawer("top", true)}>
            <MenuIcon />
          </IconButton>
        )}

        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
          sx={{
            ".MuiPaper-root.css-k1yagv-MuiPaper-root-MuiDrawer-paper": {
              height: "100%",
            },
          }}
        >
          <Box
            sx={{
              width: "444px",
              mx: "auto",
              mt: 5,
              pt: 10,
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                ":hover": {
                  rotate: "180deg",
                  transition: "0.3s",
                  color: "red",
                },
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <Close onClick={toggleDrawer("top", false)} />
            </IconButton>
            <Stack>
              {Links.map((item) => (
              <Link
                component={NavLink}
                sx={{
                  textDecoration: "none",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : theme.palette.text.primary,
                  textTransform: "capitalize",
                  "&.active": {
                    color: "red",
                  },
                  mb: 2
                }}
                to={`/${item}`}
              >
                {item}
              </Link>
            ))}
            </Stack>
          </Box>
        </Drawer>
      </Container>
      </>}
    </>
  );
}
