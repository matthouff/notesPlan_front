import axios from 'axios';
import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  withCredentials: true,
  credentials: 'include',
});

function useAuth() {
  const queryClient = useQueryClient();
  const [response, setResponse] = useState(null)

  //////////////////////////////////// USER CONNECTÉ ////////////////////////////////////

  const { data: user, isLoading, isError, refetch } = useQuery(
    "/auth/user",
    async () => {
      try {
        const user = await instance.get("/auth/user");

        return user.data
      } catch (error) {
        return;
      }
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const isAuthenticated = !isLoading && !isError && !!user;

  //////////////////////////////////// CONNEXION ////////////////////////////////////

  const login = useCallback(async (formData) => {
    try {
      const response = await instance.post('auth/login', {
        email: formData.email,
        password: formData.password,
      });
      refetch();
      // Rafraîchir les données de l'utilisateur après la connexion
      queryClient.invalidateQueries('user');
      setResponse(response)
      return response;
    } catch (error) {
      return error?.response;
    }
  },[queryClient, refetch]);

  //////////////////////////////////// INSCRIPTION ////////////////////////////////////

  const register = useCallback(async (userDto) => {
    try {
      const response = await instance.post('auth/register', userDto);

      // Rafraîchir les données après l'inscription
      queryClient.invalidateQueries('user');
      setResponse(response)
      return response;
    } catch (error) {
      return error?.response;
    }
  },[queryClient]);

  //////////////////////////////////// DÉCONNEXION ////////////////////////////////////

  const logout = useCallback(async () => {
    try {
      const response = await instance.post('auth/logout');
      refetch();
      setResponse(response)
      return response;
    } catch (error) {
      return error?.response;
    }
  }, [refetch]);

  return { user, response, isAuthenticated, login, register, logout };
}

export default useAuth;
