import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteProduct, mAIN_URL } from '../services/ProductService';
import { isAdmin } from '../services/AuthService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function ListProduct({prodata}) {

  const navigate= useNavigate();
  const [errmsg, setErrMsg] = useState("");
  
  const handleDelete=()=> {
    console.log(prodata)
    deleteProduct(prodata._id)
          .then(res => {
            if (res.data.err === 0) {
              console.log("deleted ")
              alert(res.data.msg);
              window.location.reload();
            }
            if (res.data.err === 1) {
              setErrMsg(res.data.msg);
            }
          })
          .catch(err => { console.log(err) })
  }
    
        return (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={`${mAIN_URL}/${prodata.imagePath
                }`}
                title="pro_image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {prodata.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                price : Rs.{prodata.price} <br />
                quantity : {prodata.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                {isAdmin() && <> <Button size="small" > <Link to={`/editproduct/${prodata._id}`}>Edit</Link></Button>
                <Button size="small"onClick={handleDelete}>Delete</Button> </>}
               
              </CardActions>
            </Card>
          );
        }
    
