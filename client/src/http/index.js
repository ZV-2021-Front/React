import axios from 'axios'

export const $host=axios.create({
    baseURL: 'https://zv21-api.zona-vidimosti.ru/'
})