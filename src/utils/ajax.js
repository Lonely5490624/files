import axios from 'axios'

let ajax = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000
})

ajax.defaults.withCredentials = true

ajax.interceptors.request.use(config => {
    return config
})

ajax.interceptors.response.use(response => {
    // if (response.data.code === 1003) {
    //     window.location.href = '/login'
    // }
    return response.data
}, error => {
    console.log(error)
    return Promise.reject(error)
})

export default ajax