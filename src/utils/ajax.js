import axios from 'axios'

const baseURL = 'http://47.103.138.57/api'

let ajax = axios.create({
    baseURL,
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

ajax.download = function(url) {
    const token = localStorage.getItem('token')
    let fullUrl = `${baseURL}/${url}`
    if (fullUrl.includes('?')) {
        fullUrl += `&token=${token}`
    } else {
        fullUrl += `?token=${token}`
    }
    window.open(fullUrl)
}

export default ajax