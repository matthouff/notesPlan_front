import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'content-type': 'application/json',
  },
});

function useEntityCrud({ entity, complement, id, enabled }) {
  const queryClient = useQueryClient();
  const fullEntity = `${entity}${ complement ? "/" + complement : ""}${id ? "/" + id : ""}`

  const createdData = async (x) => {
    await instance.post(entity, x);
    queryClient.invalidateQueries({entity});
  };
  
  const editData = async (x) => {
    const url = entity + "/" + x.id;
    await instance.patch(url, x);
    queryClient.invalidateQueries({entity});
  };

  const deletedData = async (entityId) => {
    const url = entity + "/" + entityId;
    await instance.delete(url);
    queryClient.invalidateQueries({entity});
  };

  const { data = [], error, isLoading } = useQuery(fullEntity, async () => {
    const response = await instance.get(fullEntity);
    return response.data;
  }, {
    enabled: enabled,
  });

  return { data, error, isLoading, createdData, deletedData, editData };
}

export default useEntityCrud;
