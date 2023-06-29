import { useState, useEffect, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { userActions } from "../store/userSlice";
import { postActions } from "../store/postSlice";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import { Create as CreateIcon } from "@mui/icons-material/";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const favorites = useSelector((state: RootState) => state.post.favorites);
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(postActions.setSearchValue(searchValue));
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchValue, dispatch]);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const profileMenuOpenHandler = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const mobileMenuCloseHandler = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuCloseHandler = () => {
    setAnchorEl(null);
    mobileMenuCloseHandler();
  };

  const mobileMenuOpenHandler = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(userActions.logout());
    menuCloseHandler();
  };
  const profileHandler = () => {
    navigate("/profile");
    menuCloseHandler();
  };
  const newPostHandler = () => {
    navigate("/create/post");
    menuCloseHandler();
  };
  const favoritesHandler = () => {
    navigate("/favorite");
    menuCloseHandler();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={menuCloseHandler}
    >
      <MenuItem onClick={profileHandler}>Профиль</MenuItem>
      <MenuItem onClick={logoutHandler}>Выход</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={mobileMenuCloseHandler}
    >
      <MenuItem onClick={favoritesHandler}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={favorites.length} color="error">
            <TurnedInIcon />
          </Badge>
        </IconButton>
        <p>Избранное</p>
      </MenuItem>
      <MenuItem onClick={newPostHandler}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <CreateIcon />
        </IconButton>
        <p>Новый пост</p>
      </MenuItem>
      <MenuItem onClick={profileHandler}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Профиль</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                Or1nn
              </Link>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Поиск..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {isAuth ? (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => navigate("/favorite")}
                  >
                    <Badge badgeContent={favorites.length} color="error">
                      <TurnedInIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={() => navigate("/create/post")}
                  >
                    <Badge>
                      <CreateIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={profileMenuOpenHandler}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={mobileMenuOpenHandler}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => navigate("/login")}
                >
                  Вход
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/registration")}
                  sx={{ marginLeft: "10px" }}
                >
                  Регистрация
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
