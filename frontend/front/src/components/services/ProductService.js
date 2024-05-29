import axios from 'axios';
const mAIN_URL="http://localhost:9999";
const API_URL="http://localhost:9999/api/product";
const getAllProducts=()=>{
    return axios.get(`${API_URL}/getallproducts`)
}

const addProduct=(data)=>{
    return axios.post(`${API_URL}/addproduct`,data)
}

const editProduct=(data)=>{
    console.log("edit ", data)
    const pro_Id = data._id; 
    console.log(pro_Id)
    console.log("calling edit product")
    return axios.put(`${API_URL}/editproduct/${pro_Id}`, data);
}

const getProductById= (data)=>{
  console.log(data)
  return axios.get(`${API_URL}/getproductbyid/${data}`)
}
const deleteProduct=(data)=>{
  console.log("delete ", data)
  const pro_Id = data; 
  console.log(pro_Id)
  console.log("calling delete product")
  return axios.delete(`${API_URL}/deleteproduct/${pro_Id}`, data);
}


export {getAllProducts, addProduct,editProduct, getProductById, deleteProduct, mAIN_URL};