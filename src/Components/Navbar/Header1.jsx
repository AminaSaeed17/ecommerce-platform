// @ts-nocheck
import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  DarkModeOutlined,
  ExpandMore,
  LightModeOutlined,
} from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext";

const options = ["AR", "EN"];

export default function Header1() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (
    /** @type {{ currentTarget: import("react").SetStateAction<null>; }} */ event,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    /** @type {import("react").MouseEvent<HTMLLIElement, MouseEvent>} */ _event,
    /** @type {import("react").SetStateAction<number>} */ index,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let { userToken, setUserToken } = useContext(userContext);
  let navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/signin");
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "#283455",
          py: "4px",
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              p: "3px 10px",
            }}
          >
            <Typography
              sx={{
                mr: 2,
                p: "3px 10px",
                bgcolor: "#D23F57",
                borderRadius: "12px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "#fff",
              }}
              variant="body2"
            >
              HOT
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "300", color: "#fff" }}
              variant="body2"
            >
              Free Express Shipping
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <div>
              {theme.palette.mode === "light" ? (
                <IconButton
                  onClick={() => {
                    localStorage.setItem(
                      "mode",
                      theme.palette.mode === "dark" ? "light" : "dark",
                    );
                    colorMode.toggleColorMode();
                  }}
                  color="inherit"
                >
                  <LightModeOutlined sx={{ fontSize: "16px", color: "#fff" }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    localStorage.setItem(
                      "mode",
                      theme.palette.mode === "dark" ? "light" : "dark",
                    );
                    colorMode.toggleColorMode();
                  }}
                  color="inherit"
                >
                  <DarkModeOutlined fontSize="small" />
                </IconButton>
              )}
            </div>

            <List
              component="nav"
              aria-label="Device settings"
              sx={{ p: 0, m: 0 }}
            >
              <ListItem
                // @ts-ignore
                ListItem
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickListItem}
                sx={{ "&:hover": { cursor: "pointer" }, px: 1 }}
              >
                <ListItemText
                  sx={{
                    ".MuiTypography-root": { fontSize: "11px", color: "#fff" },
                  }}
                  secondary={options[selectedIndex]}
                />
                <ExpandMore sx={{ fontSize: "16px", color: "#fff" }} />
              </ListItem>
            </List>

            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              // @ts-ignore
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  sx={{ fontSize: "11px", p: "3px 10px", minHeight: "10px" }}
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <TwitterIcon
              sx={{
                fontSize: "16px",
                color: "#fff",
              }}
            />
            <FacebookIcon
              sx={{
                fontSize: "16px",
                mx: 1,
                color: "#fff",
              }}
            />
            <InstagramIcon
              sx={{
                fontSize: "16px",
                color: "#fff",
              }}
            />
            <Stack
              direction={"row"}
              sx={{ ml: 2, alignItems: "center", gap: 2 }}
            >
              {userToken ? (
                <Link
                  onClick={() => Logout()}
                  sx={{
                    fontSize: "16px",
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  LogOut
                </Link>
              ) : (
                <>
                  <Link
                    component={NavLink}
                    to={"/"}
                    sx={{
                      fontSize: "16px",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Register
                  </Link>
                  <Link
                    component={NavLink}
                    to={"/signin"}
                    sx={{
                      fontSize: "16px",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
