// src/api/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000', // 后端地址
  timeout: 5000,
})

// 你也可以添加请求或响应拦截器
instance.interceptors.request.use(
  config => {
    // 比如可以在这里加入 token
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response.data,
  error => {
    console.error('请求出错:', error)
    return Promise.reject(error)
  }
)

export default instance
