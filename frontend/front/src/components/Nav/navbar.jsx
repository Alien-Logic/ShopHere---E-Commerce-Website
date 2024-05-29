import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom';
import { getUserDetailes, isLoggedIn } from '../services/AuthService';

export default function Navbar() {
  const navigate =useNavigate();
  const userData=getUserDetailes();
  const signOut =()=>{
    if(window.confirm("Do you want to logout ?")){
      localStorage.removeItem("_token");
      navigate("/");
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Authentication App
          </Typography>
          {!isLoggedIn() && <>
            <Button color="inherit" onClick={()=> navigate("/")}>Login</Button>
          <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
          
          </>}

          {isLoggedIn() && <>
            <Button color="inherit" onClick={()=> navigate("/dashboard")}>Home</Button>
          <Button color="inherit" onClick={()=> navigate("/cart")}>Cart</Button>
          {isLoggedIn() && userData.isAdmin &&
          <>
          <Button color="inherit" onClick={()=> navigate("/addproduct")}>Add Product</Button>
          </>}
          <Button color="inherit" >welcome : {userData.fullName}</Button>
          <Button color="inherit" onClick={signOut}>Logout</Button>
          
          </>}
         
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}