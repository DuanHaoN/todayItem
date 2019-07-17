import axios from 'axios'
import JSONbig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [data => {
    if (data) {
      return JSONbig.parse(data)
    }
    return data
  }]

//   headers: [
//     { Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('dhn')).token }
//   ]
})

// axios的请求拦截器
instance.interceptors.request.use(config => {
//   console.log(config)
  // 发送请求之前做些什么
  const user = window.sessionStorage.getItem('dhn')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }

  return config
}, error => {
  // 请求错误做些什么
  return Promise.reject(error)
})

// axios响应拦截器
instance.interceptors.response.use(response => {
  // 对响应结果做些什么
  return response
}, error => {
  // 对响应错误做些什么
//   console.log(error.response)
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
