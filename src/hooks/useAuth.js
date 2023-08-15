import axios from 'axios';
import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  credentials: 'include',
});

function useAuth() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const { data: user, isLoading, isError, refetch } = useQuery(
    "/auth/user",
    async () => {
      try {
        const response = await instance.get("/auth/user");
        return response.data;
      } catch (error) {
        throw new Error("Unauthorized");
      }
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  console.log(user);

  const isAuthenticated = !isLoading && !isError && !!user;

  //////////////////////////////////// CONNEXION ////////////////////////////////////

  const login = async (formData) => {
    try {
      await instance.post('auth/login', {
        email: formData.email,
        password: formData.password,
      });
      refetch();
      // Rafraîchir les données de l'utilisateur après la connexion
      queryClient.invalidateQueries('user');
    } catch (error) {
      setError({...error?.response?.data});
    }
  };

  //////////////////////////////////// INSCRIPTION ////////////////////////////////////

  const register = async (userDto) => {
    try {
      await instance.post('auth/register', userDto);

      // Rafraîchir les données après l'inscription
      queryClient.invalidateQueries('user');
    } catch (error) {
      setError({...error?.response?.data});
    }
  };

  //////////////////////////////////// DÉCONNEXION ////////////////////////////////////

  const logout = useCallback(async () => {
    try {
      await instance.post('auth/logout');
      refetch();
    } catch (error) {
      setError({...error?.response?.data});
    }
  }, [refetch]);

  return { user, isAuthenticated, login, register, logout, error };
}

export default useAuth;
