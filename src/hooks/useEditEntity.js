import axios from "axios";
import { useCallback } from "react";
import { useQueryClient } from "react-query";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  withCredentials: true, // Envoyer les cookies avec les requêtes
  headers: {
    "content-type": "application/json",
    "Cache-Control": "no-cache", // désactiver le cache (évite les erreurs 304: Not modified)
  },
});

function useEditEntity({
  entity,
}) {
  const queryClient = useQueryClient();

  const createdData = useCallback(
    async (data) => {
      try {
        const response = await instance.post(entity, { ...data });
        queryClient.invalidateQueries({ entity });

        return response;
      } catch (error) {
        return {
          ...(error.message ? { ...error?.response?.data } : { ...error }),
        };
      }
    },
    [entity, queryClient]
  );

  const editData = useCallback(
    async (data) => {
      try {
        const url = entity + "/" + data.id;
        const response = await instance.patch(url, data);
        queryClient.invalidateQueries({ entity });

        return response;
      } catch (error) {
        return {
          ...(error.message ? { ...error?.response?.data } : { ...error }),
        };
      }
    },
    [entity, queryClient]
  );

  const deletedData = useCallback(
    async (entityId) => {
      try {
        const url = entity + "/" + entityId;
        const response = await instance.delete(url);
        queryClient.invalidateQueries({ entity });

        return response;
      } catch (error) {
        return {
          ...(error.message ? { ...error?.response?.data } : { ...error }),
        };
      }
    },
    [entity, queryClient]
  );

  return {
    createdData,
    deletedData,
    editData,
  };
}

export default useEditEntity;
