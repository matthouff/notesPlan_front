import axios from "axios";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true, // Envoyer les cookies avec les requêtes
  headers: {
    "content-type": "application/json",
    "Cache-Control": "no-cache", // désactiver le cache (évite les erreurs 304: Not modified)
  },
});

function useEntityCrud({
  entity,
  complement,
  id,
  enabled,
  queryOption = { suspense: false },
}) {
  const queryClient = useQueryClient();
  const fullEntity = `${entity}${complement ? "/" + complement : ""}${id ? "/" + id : ""
    }`;

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

  const addRelationData = useCallback(
    async (data) => {
      const url = `${entity}/${data.id}${complement ? "/" + complement : ""}${id ? "/" + id : ""
        }`;
      await instance.patch(url, data);
      queryClient.invalidateQueries({ entity });
    },
    [complement, entity, id, queryClient]
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

  const { data = [], isLoading } = useQuery(
    fullEntity,
    async () => {
      const response = await instance.get(fullEntity);
      return response.data;
    },
    {
      enabled: enabled,
      ...queryOption,
    }
  );

  return {
    data,
    isLoading,
    createdData,
    deletedData,
    editData,
    addRelationData,
  };
}

export default useEntityCrud;
