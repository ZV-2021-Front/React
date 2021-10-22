import {React, useState, useEffect} from 'react'
import ChartForm from '../components/ChartForm'
import mapData from '../data/MapValues.json'

export const TestPage = () => {
    const [json, setjson] = useState(require('../data/geo.json'))
    const [array, setarray] = useState()
    useEffect(() => {
        let newarray=[]
        json['features'].map((feature)=>{
            feature.properties.VALUE=mapData.find((element)=>
                element["regionName"]==feature.properties.NAME_RU
            ).value
            newarray.push({regionId: feature.properties.OKATO_ID, regionName: feature.properties.NAME_RU, regionValue: feature.properties.VALUE})
        })
        setarray(newarray)
    }, [])
    return (
        <div>
            <ChartForm/>
        </div>
    )
}
