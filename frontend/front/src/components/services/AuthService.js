import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL="http://localhost:9999/api/auth" ;

const userLogin= (data) => {
    return axios.post(`${API_URL}/signin`, data)
}

const userRegister= (data) => {
    return axios.post(`${API_URL}/signup`, data)
}

const token=()=>{
    return localStorage.getItem("_token");

}
const isLoggedIn=()=>{
 if(token()){
    return true;
 }
 else{
    return false;
 }
}
const isAdmin=()=>{
    return !getUserDetailes()?false:getUserDetailes().isAdmin;
}
const getUserDetailes=()=>{
    try{
        return jwtDecode(token());

    }
    catch(err){
        return null;
    }
}

export {userLogin, userRegister, token, isLoggedIn, getUserDetailes, isAdmin};
