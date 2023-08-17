import { Button, FormControl, IconButton, InputAdornment, TextField } from "@mui/material";
import { User2 } from "lucide-react";
import Theme from "../../../utils/style";
import { Lock } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "react-query";
import SnackBarPerso from "../../../components/SnackbarPerso";

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [responseInfo, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth()

  const { mutate } = useMutation(login, {
    onSuccess: (response) => {
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
          required
          id="input-with-email-textfield"
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
          id="input-with-password-textfield"
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
        <Button type="submit" sx={{ alignSelf: "end" }} color="success" variant="contained">
          Connexion
        </Button>
      </FormControl>
      {responseInfo?.open && <SnackBarPerso response={responseInfo} />}
    </form>
  )
}

export default Login;