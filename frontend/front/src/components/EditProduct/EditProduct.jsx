import React, { useState, } from 'react';
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
import { addProduct, editProduct, getProductById, } from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';



const defaultTheme = createTheme();

export default function EditProduct() {
  const { id } = useParams();

  const [state, setState] = useState({ name: "", category: "", price: "", quantity: "", features: "", imagePath: "" });
  const [errMsg, setErrMsg] = useState('');
  const [prodData, setProdData] = useState({});
  useEffect(() => {
    getProductById(id)
      .then(res => {
        console.log(res)
        if (res.data.err === 0) {
          setState(res.data.prodata)
          console.log(prodData)
        }
      })
      .catch(err => { console.log(err) })
  }, [])
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value })


  }

  const imagehandler = (event) => {
    if (event.target.files.length > 0) {
      setState({ ...state, imagePath: event.target.files[0] })
    }

  }
  //const handleEdit = async () => {
   // try {
   //   const response = await editProduct(state);
    //  console.log(response.data.prodata);  // Log the response from the server
      // Optionally: Update the component state or trigger a re-fetch of data
    //} catch (error) {
    //  console.error('Error editing product:', error);
   // }
 // };
   const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    // getProductById(id, state)
    //   .then(res => {
    //     navigate('/dashboard');
    //   })
    //   .catch(err => { console.log(err) })
  

    // if (state.imagePath !== "") {
      if (true) {
        console.log("edit page", state)
        //when we upload any attachment with form data we use formdata property
        let formData = state;
        // formData.append("shalu", "theju")
        // formData.append("name", state.name);
        // formData.append("price", state.price);
        // formData.append("category", state.category);
        // formData.append("quantity", state.quantity);
        // formData.append("features", state.features);
        // formData.append("att", state.imagePath);
        // formData.append("id", id);
        console.log(formData)
        editProduct(formData)
          .then(res => {
            console.log("hello ", res)
            if (res.data.err === 0) {
              console.log("edited ")
              alert(res.data.msg);
              navigate('/dashboard');
            }
            if (res.data.err === 1) {
              setErrMsg(res.data.msg);
            }
          })
          .catch(err => { console.log(err) })


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
            Edit Product
          </Typography>
          {errMsg !== '' &&
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
                  value={state.name}
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
                  value={state.category}
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
                  value={state.price}
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
                  value={state.quantity}
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
                  value={state.features}
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
                  filename={state.imagePath}
                  onChange={imagehandler}
                />
              </Grid>
              
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                Update
              </Button>

          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}