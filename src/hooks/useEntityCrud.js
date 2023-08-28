import axios from 'axios';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true, // Envoyer les cookies avec les requêtes
  headers: {
    'content-type': 'application/json',
    'Cache-Control': 'no-cache' // désactiver le cache (évite les erreurs 304: Not modified)
  },
});


function useEntityCrud({ entity, complement, id, enabled }) {
  const queryClient = useQueryClient();
  const fullEntity = `${entity}${ complement ? "/" + complement : ""}${id ? "/" + id : ""}`
  
  const createdData = useCallback(async (x) => {
    try{
      const response = await instance.post(entity, {...x});
      queryClient.invalidateQueries({entity});

      return response;
    }catch(error){
      return {...error.message ? {...error?.response?.data} : {...error}};
    }
  },[entity, queryClient]);
  
  const editData = useCallback(async (x) => {
    try{
      const url = entity + "/" + x.id;
      const response = await instance.patch(url, x);
      queryClient.invalidateQueries({entity});

      return response;
    }catch(error){
      return {...error.message ? {...error?.response?.data} : {...error}};
    }
  }, [entity, queryClient]);

  const addRelationData = useCallback(async (x) => {
    const url = `${entity}/${x.id}${ complement ? "/" + complement : ""}${id ? "/" + id : ""}`;
    await instance.patch(url, x);
    queryClient.invalidateQueries({entity});
  },[complement, entity, id, queryClient]);
  
  const deletedData = useCallback(async (entityId) => {
    try{
      const url = entity + "/" + entityId;
      const response = await instance.delete(url);
      queryClient.invalidateQueries({entity});

      return response;
    }catch(error){
      return {...error.message ? {...error?.response?.data} : {...error}};
    }
  },[entity, queryClient]);

  const { data = [], isLoading } = useQuery(fullEntity, async () => {
    const response = await instance.get(fullEntity);

    return response.data;
  }, {
    enabled: enabled,
  });

  return { data, isLoading, createdData, deletedData, editData, addRelationData };
}

export default useEntityCrud;
