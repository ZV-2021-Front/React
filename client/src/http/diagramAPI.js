import {$host} from './index'

export const fetchDataPrice=async()=>{
    const {data}=await $host.get('api/linear?products=all&yAxisField=price&xAxisField=date')
    return data
}