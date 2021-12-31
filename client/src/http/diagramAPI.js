// export const =async()=>{
//     await $host.get(``)
// }

// export const =async()=>{
//     const {data}=await $host.get(``)
//     return data
// }

import axios from 'axios'
import {$host} from './index'

export const fetchXY=async(params)=>{
    const {data}=await $host.get('api/linear', params)
    return data
}
export const fetchColumns=async(params)=>{
    const {data}=await $host.get('api/fields', params)
    return data
}
export const fetchFinance=async(params)=>{
    const {data}=await $host.get('api/exchange?products=all&yAxisField=price&xAxisField=date')
    return data
}
export const insertCardFromDatabase=async(graphTypes, databaseType, databaseName, userName, password, hostName, port, tables)=>{
    await $host.get(`api/source/add?sourceType=database&graphTypes=${graphTypes}&databaseType=${databaseType}&databaseName=${databaseName}&userName=${userName}&password=${password}&hostName=${hostName}&port=${port}&tables=${tables}`)
}
export const insertCardFromFile=async(tableName, jsonText, graphTypes)=>{
    await $host.post(`api/source/add?sourceType=file&title=${tableName}&graphTypes=${graphTypes}`, JSON.parse(jsonText))
}
export const removeCard=async(id)=>{
    await $host.get(`api/source/delete/${id}`)
}
export const selectCards=async()=>{
    const {data}=await $host.get(`api/source/update`)
    return data
}
export const selectOneCard=async(id)=>{
    const {data}=await $host.get(`api/source/get/${id}`)
    return data
}