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