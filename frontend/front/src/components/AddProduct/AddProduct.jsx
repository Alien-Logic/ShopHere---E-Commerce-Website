import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { userRegister } from '../services/AuthService';
import { addProduct } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';



const defaultTheme = createTheme();

export default function AddProduct() {
  const [state, setState]=useState({name:"", category:"", price:"", quantity:"", features:"", imagePath:""});
  const [errMsg, setErrMsg]= useState('');
  const handler=(event)=>{
    const {name, value}= event.target;
    setState({...state,[name]:value})
  }
  const navigate = useNavigate();

  const imagehandler=(event)=>{
    if(event.target.files.length>0){
        setState({...state, imagePath:event.target.files[0]})
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(state.imagePath!=""){
        if(state.imagePath.type=="image/jpeg" || state.imagePath.type=="image/png"){
          console.log(state)
            //when we upload any attachment with form data we use formdata property
            let formData= new FormData();
            formData.append("name", state.name);
            formData.append("price", state.price);
            formData.append("category", state.category);
            formData.append("quantity", state.quantity);
            formData.append("features", state.features);
            formData.append("att", state.imagePath);
            console.log(formData)
            addProduct(formData)
            .then(res=>{
              if(res.data.err===0){
               alert(res.data.msg);
               navigate('/dashboard');
              }
              if(res.data.err===1){
                setErrMsg(res.data.msg);
              }
            })
            .catch(err=>{console.log(err)})


        }else{
            setErrMsg("only work jpeg or png image")
        }

    }else{
       setErrMsg("please select a image")
   }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
             Add Product
          </Typography>
          {errMsg!=='' &&
          <Alert severity="error">{errMsg} </Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  onChange={handler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="category"
                  name="category"
                  autoComplete="family-name"
                  onChange={handler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="price"
                  name="price"
                  autoComplete="product-price"
                  onChange={handler}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="quantity"
                  label="quantity"
                  name="quantity"
                  autoComplete="product-quantity"
                  onChange={handler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="features"
                  label="features"
                  name="features"
                  autoComplete="features"
                  onChange={handler}
                />
              </Grid>
              
              

              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="att"
                
                  name="att"
                  type="file"
                  autoComplete="family-name"
                  onChange={imagehandler}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
           
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}