import { Button, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { User2 } from "lucide-react";
import Theme from "../../../utils/style";
import { Lock } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import SnackBarPerso from "../../../components/SnackbarPerso";

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { error, register } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData)
  }

  const handleInputChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", justifyContent: "center" }}>
      <FormControl sx={{ gap: 4 }} variant="standard" >
        <TextField
          id="input-with-icon-textfield"
          label="Nom"
          color="secondary"
          name="nom"
          value={formData.login}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <User2 stroke={Theme.palette.secondary.main} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          required
          id="input-with-icon-textfield"
          label="Prénom"
          color="secondary"
          name="prenom"
          value={formData.login}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <User2 stroke={Theme.palette.secondary.main} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          required
          id="input-with-icon-textfield"
          label="Email"
          color="secondary"
          name="email"
          type="email"
          value={formData.login}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <User2 stroke={Theme.palette.secondary.main} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          required
          id="input-with-icon-textfield"
          label="Mot de passe"
          color="secondary"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type={'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock stroke={Theme.palette.secondary.main} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={setShowPassword}
                  edge="end"
                >
                  {!showPassword ? <Eye stroke={Theme.palette.primary.main} /> : <EyeOff stroke={Theme.palette.primary.main} />}
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="outlined"
        />
        <Typography variant="caption" textAlign="right" mt={-2}>* obigatoire</Typography>
        <Button type="submit" sx={{ alignSelf: "end" }} color="success" variant="contained">
          Valider
        </Button>
      </FormControl>

      {error &&
        <SnackBarPerso type={error?.type} message={error?.message} />
      }
    </form>
  )
}

export default Register;