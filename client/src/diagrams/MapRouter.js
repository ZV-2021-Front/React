import React from 'react'
import ClusterMap from './ClusterMap';
import MarkerMap from './MarkerMap';
import RegionsMap from './Map';

export const MapRouter = ({mapConfig, data}) => {
    if(mapConfig?.mapType=='Регионы России'){
        return(
            <RegionsMap props={{mapConfig, data}} />
        );
    }
    if(mapConfig?.mapType=='Отдельные маркеры'){
        return(
            <MarkerMap props={{mapConfig, data}} />
        );
    }
    if(mapConfig?.mapType=='Скопление маркеров'){
        return(
            <ClusterMap props={{mapConfig, data}} />
        );
    }
    return (
        <div>
            
        </div>
    )
}
