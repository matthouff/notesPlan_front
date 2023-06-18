import axios from 'axios'
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'content-type': 'application/json',
    },
});

function useEntityCrud({entity, enabled, createdData}){

  useEffect(() => {
    if(createdData){
      instance.post(entity, createdData);
    }
}, [createdData])

  // "entity" du useQuery sert de clé pour distinguer les différents appels et que les données ne sent  pas écrasés par le dernier appel
    const { data, error, isLoading } = useQuery(entity, async () => {
        const response = await instance.get(entity);
        return response.data;
    }, {
      enabled: enabled, // Conditionne l'exécution de la requête
    });
    
    return {data, error, isLoading};
}

export default useEntityCrud;
