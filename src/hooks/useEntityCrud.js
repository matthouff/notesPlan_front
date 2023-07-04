import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'content-type': 'application/json',
  },
});

function useEntityCrud({ entity, enabled }) {
  const queryClient = useQueryClient();

  const createdData = async (x) => {
    await instance.post(entity, x);
    queryClient.invalidateQueries(entity);
  };

  const deletedData = async (entityId) => {
    const url = entity + "/" + entityId;
    await instance.delete(url);
    queryClient.invalidateQueries(entity);
  };

  const { data = [], error, isLoading } = useQuery(entity, async () => {
    const response = await instance.get(entity);
    return response.data;
  }, {
    enabled: enabled,
  });

  return { data, error, isLoading, createdData, deletedData };
}

export default useEntityCrud;
