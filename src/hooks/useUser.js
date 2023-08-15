// import axios from 'axios';
// import { useCallback } from 'react';
// import { useQuery } from 'react-query';

// const instance = axios.create({
//   baseURL: 'http://localhost:3000/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
//   credentials: 'include',
// });

// function useAuth() {
//   const { data: user, isLoading, isError, refetch } = useQuery(
//     "/auth/user",
//     async () => {
//       try {
//         const response = await instance.get("/auth/user");
//         return response.data;
//       } catch (error) {
//         throw new Error("Unauthorized"); // Vous pouvez personnaliser le message d'erreur si nécessaire
//       }
//     },
//     {
//       retry: false, // Désactiver les tentatives de récupération automatique en cas d'erreur
//       refetchOnMount: false, // Ne pas récupérer automatiquement lors du montage initial
//       refetchOnWindowFocus: false, // Ne pas récupérer automatiquement lors de la reprise du focus sur la fenêtre
//       refetchOnReconnect: false, // Ne pas récupérer automatiquement en cas de reconnexion
//     }
//   );

//   const isAuthenticated = !isLoading && !isError && !!user;

//   const authenticate = useCallback(async () => {
//     try {
//       refetch();
//     } catch (error) {
//       console.error("Error authenticating:", error);
//     }
//   }, [refetch]);
  
//   return { user, isAuthenticated, authenticate };
// }

// export default useAuth;
