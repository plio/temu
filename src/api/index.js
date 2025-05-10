import axios from './axios'

// 获取产品列表
export function fetchProducts(params) {
  return axios.post('/api/products', params)
}

// 编辑、新增 产品
export function saveProducts(params) {
  return axios.post('/api/products/save', params)
}
