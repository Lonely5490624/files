import axios from 'axios'

let ajax = axios.create({
    baseURL: 'http://192.168.1.98:3333/api',
    timeout: 10000
})

ajax.defaults.withCredentials = true

ajax.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (config.method === 'post') {
        let data = config.data || {}
        data.token = token
        config.data = data
    } else if (config.method === 'get') {
        if (config.url.includes('?')) {
            config.url += `&token=${token}`
        } else {
            config.url += `?token=${token}`
        }
    }
    return config
})

ajax.interceptors.response.use(response => {
    if (response.data.code === 1001) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return response.data
}, error => {
    console.log(error)
    return Promise.reject(error)
})

export default ajax