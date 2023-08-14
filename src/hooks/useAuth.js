import axios from 'axios';
import { useQueryClient } from 'react-query';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Activer l'envoi de cookies avec les requêtes
  credentials: 'include', // Indiquer au navigateur d'inclure les cookies
});

function useAuth() {
  const queryClient = useQueryClient();

  const login = async (formData) => {
    try {
      const jwt = await instance.post('auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const data = await jwt.json();
      if (jwt.ok) {
        console.log(data.access_token);
        login(data.access_token);
      }

      // Rafraîchir les données de l'utilisateur après la connexion
      queryClient.invalidateQueries('user');
    } catch (error) {
      // Gérer les erreurs ici
    }
  };

  const register = async (userDto) => {
    try {
      await instance.post('auth/register', userDto);

      // Rafraîchir les données après l'inscription
      queryClient.invalidateQueries('user');
    } catch (error) {
      // Gérer les erreurs ici
    }
  };

  const logout = async () => {
    try {
      await instance.post('auth/logout');

      // Rafraîchir les données après la déconnexion
      queryClient.invalidateQueries('user');
    } catch (error) {
      // Gérer les erreurs ici
    }
  };

  return { login, register, logout };
}

export default useAuth;
