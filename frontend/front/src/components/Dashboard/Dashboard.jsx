import React, {useState, useEffect} from 'react';

import { getAllProducts } from '../services/ProductService';
import Grid from '@mui/material/Grid';
import ListProduct from '../ListProduct/ListProduct';
export default function Dashboard() {
    const [prodData, setProdData]= useState([]);
    useEffect(()=>{
        getAllProducts()
        .then(res=>{
            if(res.data.err===0){
                setProdData(res.data.prodata)
            }
        })
        .catch(err=>{console.log(err)})
    },[])
    return(
        <div>
            <h2>Latest Products</h2>
            <Grid container spacing={2}>
                {prodData.map(pro=>
            <Grid item xs={4} key={pro._id}>
              <ListProduct prodata={pro} />
                </Grid> 
               )}  
            </Grid>
            </div>
    )
}