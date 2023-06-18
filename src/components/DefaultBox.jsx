import { Box, Stack } from "@mui/material";
import { Link } from 'react-router-dom';
// import { ReactComponent as Logo } from '../assets/logo.svg';
import background from '../assets/paysageDesktop.jpg';

function DefaultBox({ persoStyle, dark, children }) {

  console.log(background);

  return (
    <Box className="test" sx={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      minHeight: "100vh"
    }}>
      <Box width="100%" height="100%" position="absolute" top={0} left={0} bgcolor={!dark ? "#0000001A" : "#00000088"} zIndex={1}>
        <Stack
          borderBottom="2px solid #FFF"
          bgcolor="#0008"
          paddingY={1}
          paddingX={5}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          width="100%"
        >
          <Link to="/"></Link>
          <Stack flexDirection="row" gap={5} position="absolute" right={100}>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/notes">Mes notes</Link>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/taches">Mes tâches</Link>
          </Stack>
        </Stack>
        <Stack sx={{ pl: 10, height: "100%", minWidth: "100%", ...persoStyle }}>
          {children}
        </Stack>
      </Box>
    </Box>
  )
}

export default DefaultBox;