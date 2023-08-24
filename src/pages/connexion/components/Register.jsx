import { Button, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { User2 } from "lucide-react";
import Theme from "../../../utils/style";
import { Lock } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import useAuth from "../../../hooks/useAuth";
import PropTypes from "prop-types";
import useResponsive from "../../../hooks/useResponsive";

Register.propTypes = {
  setAuth: PropTypes.func,
  setResponse: PropTypes.func,
};

function Register({ setAuth, setResponse }) {
  const [showPassword, setShowPassword] = useState(false)
  const isTablet = useResponsive("down", "xl");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { register } = useAuth()

  const { mutate } = useMutation(register, {
    onSuccess: (response) => {
      if (response.data.type === "success") {
        setAuth(true)
      }
      setResponse({ ...response.data, key: new Date().getTime(), open: true });
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData)
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
          size={isTablet && "small"}
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
          size={isTablet && "small"}
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
          size={isTablet && "small"}
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
          size={isTablet && "small"}
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
    </form>
  )
}

export default Register;