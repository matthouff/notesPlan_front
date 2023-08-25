import { Box, Button, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { Link } from 'react-router-dom';
import background from '../assets/paysageDesktop.jpg';
import backgroundDark from '../assets/darkPaysage.jpg';
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";
import useResponsive from "../hooks/useResponsive";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";

DefaultBox.propTypes = {
  persoStyle: PropTypes.object,
  dark: PropTypes.bool,
  children: PropTypes.array,
};

function DefaultBox({ persoStyle, dark, children }) {
  const { logout, isAuthenticated } = useAuth()
  const isTablet = useResponsive("down", "md");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout()
    localStorage.clear();
  }

  return (
    <Stack className="test" sx={{
      backgroundImage: `url(${dark ? backgroundDark : background})`,
      backgroundPosition: 'center',
      height: "100svh"
    }}>
      <Stack
        borderBottom="2px solid #FFF"
        bgcolor="#0008"
        paddingY={1}
        paddingX={5}
        flexDirection="row"
        justifyContent={isAuthenticated ? "space-between" : "center"}
        alignItems="center"
        width="100%"
        position="absolute"
        top={0}
        right={0}
      >
        <Link to="/"><Box height={isTablet && 40}><img height="100%" src="../../public/logo.svg" /></Box></Link>
        {!isTablet ?
          isAuthenticated &&
          <Stack fontSize={20} flexDirection="row" gap={5} display="flex" alignItems="center">
            <>
              <Link style={{ color: "#fff", textDecoration: "none" }} to="/notes">Mes notes</Link>
              <Link style={{ color: "#fff", textDecoration: "none" }} to="/taches">Mes tâches</Link>
              <Button onClick={handleLogout} variant="contained">Déconnexion</Button>
            </>

          </Stack>
          :
          isAuthenticated &&
          <IconButton
            color="primary"
            onClick={handleClick}
          >
            {open ? <X size={30} /> : <MenuIcon size={30} />}
          </IconButton>
        }
      </Stack>
      <Stack sx={{ pl: "5%", height: "100%", pt: 14, minWidth: "100%", ...persoStyle }}>
        {children}
      </Stack>

      {!!open &&
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={!!open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Link style={{ color: "#333", textDecoration: "none" }} to="/notes"><MenuItem>Mes notes</MenuItem></Link>
          <Link style={{ color: "#333", textDecoration: "none" }} to="/taches"><MenuItem>Mes tâches</MenuItem></Link>
          <MenuItem sx={{ color: "#C00" }} onClick={handleLogout} variant="contained">Déconnexion</MenuItem>
        </Menu>
      }
    </Stack>
  )
}

export default DefaultBox;