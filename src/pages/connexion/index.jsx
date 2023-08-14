import { Box, Button, Divider, FormControl, Grid, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import DefaultBox from "../../components/DefaultBox";
import Theme from "../../utils/style";
import { Lock, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../connexion/"
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const { data } = useUser()
  // console.log(data);

  const { login } = useAuth()


  // const CssTextField = styled(TextField)({
  //   '& label.Mui-focused': {
  //     color: Theme.palette.secondary.main,
  //   },
  //   '& label': {
  //     color: Theme.palette.primary.main,
  //   },
  //   '& .MuiInput-underline:after': {
  //     borderBottomColor: Theme.palette.primary.main,
  //   },
  //   '& .MuiOutlinedInput-root': {
  //     '& fieldset': {
  //       borderColor: Theme.palette.primary.main,
  //     },
  //     '&:hover fieldset': {
  //       borderColor: Theme.palette.primary.main,
  //     },
  //     '&.Mui-focused fieldset': {
  //       borderColor: Theme.palette.secondary.main,
  //     },
  //     '& .MuiOutlinedInput-input': {
  //       color: Theme.palette.primary.main,
  //     },
  //   },
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
    // sign({ ...formData, endPoint: complement, password: bcrypt.hashSync(formData.password, 12) })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <DefaultBox
      persoStyle={{ px: "5%", pt: 15 }}
    >
      <Grid container height="100%">
        <Grid item xs={3}>
          <Box>
            <Typography variant="h1" color="primary">Souviens <span>Toi</span></Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Stack width="100%" marginX="auto" alignItems="center" justifyContent="center" height="100%" >
            <Paper sx={{ borderRadius: 7, width: "50%", bgcolor: "#0008", border: `2px solid ${Theme.palette.primary.main}`, display: "flex", gap: 4, flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2 }}>
              <Typography variant="h2" fontSize={30} color="primary">
                Connexion
              </Typography>
              <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", justifyContent: "center" }}>
                <FormControl sx={{ gap: 4 }} variant="standard" >
                  <TextField
                    required
                    id="input-with-icon-textfield"
                    label="Identifiant"
                    color="primary"
                    name="email"
                    value={formData.login}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User2 stroke={Theme.palette.primary.main} />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="input-with-icon-textfield"
                    label="Mot de passe"
                    color="primary"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type={'password'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock stroke={Theme.palette.primary.main} />
                        </InputAdornment>
                      ),
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <IconButton
                      //       aria-label="toggle password visibility"
                      //       onClick={handleClickShowPassword}
                      //       edge="end"
                      //     >
                      //       {!showPassword ? <Eye stroke={Theme.palette.primary.main} /> : <EyeOff stroke={Theme.palette.primary.main} />}
                      //     </IconButton>
                      //   </InputAdornment>
                      // )
                    }}
                    variant="outlined"
                  />
                  <Button type="submit" sx={{ alignSelf: "end" }} variant="contained">
                    Connexion
                  </Button>
                </FormControl>
              </form>
              <Divider sx={{ border: `1px solid ${Theme.palette.primary.main}` }} width="80%" />
              <Typography color="primary">
                Pas de compte ? {" "}
                <Link color={Theme.palette.primary.main} to="/notes">Créer un compte</Link>
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </DefaultBox >
  )
}

export default Connexion;