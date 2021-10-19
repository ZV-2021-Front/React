import {$host} from './index'

export const fetchXY=async(params)=>{
    const {data}=await $host.get('api/linear', params)
    return data
}
export const fetchColumns=async(params)=>{
    const {data}=await $host.get('api/fields', params)
    return data
}