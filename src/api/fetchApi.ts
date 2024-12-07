import axiosInstance from "./axiosConfig"

export const fetchProducts = async ()=>{
  try {
    return await axiosInstance.get('/products')
  } catch (error) {
    Promise.reject(error)
  }
}