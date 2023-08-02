import axios from "axios";
import { useQuery } from "react-query";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'content-type': 'application/json',
  },
});

function useUser(){
  const { data = [] } = useQuery("users", async () => {
    const response = await instance.get("users");
    return response.data;
  }, {
    enabled: true,
  });

  const userId = data.filter(x => x.nom == "Zita").map(x => x.id)[0]

  return {userId}
}

export default useUser;