import React, { useEffect, useState } from "react";
import {Container, TextField, Fab, Grid, FormControl,  Card, Alert, CardContent, Typography, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import "./Search.css";
import axios from "axios";


 //url de api fake y rikolino
 const CoUrl = "http://localhost:3001/search/";

export default function Search() {
    const [data, setData]=useState([]);
    const peticionGet=async()=>{
        await axios.get(CoUrl)
        .then(response=>{
          setData(response.data);
        })
        .catch((error) => {
          console.log(error.message);
          Alert.fire({
            icon: "error",
            title: "Ups.. Algo salio mal!",
          });
        });
      }
      useEffect(async()=>{
        await peticionGet();
      },[])
    return (
        <>
            <div>
                <Container maxWidth="sm">
                 <h1 >Ubica un trabajo</h1>
                 <Grid container spacing={1}>
                 <Grid item>
                 <FormControl sx={{ m: 1, minWidth: 80 }}>
                 <TextField id="outlined-basic" label="Puesto o Empresa" variant="outlined" />
                 </FormControl>
                 <FormControl sx={{ m: 1, minWidth: 80 }}>
                 <Fab color="secondary" variant="extended"><SearchIcon sx={{ mr: 3 }} /> BUSCAR EMPLEO </Fab>
                 </FormControl>
                 </Grid>
                 </Grid>
                 <div class="Principal"> 
            {data.map((consola) => (
            <Card class="cardEmpleo" sx={{ maxWidth: 400, maxHeight: 500 }} key={consola.id}>
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  {consola.name_job}
                </Typography>
                <Chip
                  icon={<RoomIcon />}
                  label={consola.name_company}
                  component="a"
                  href="#"
                  variant="outlined"
                  clickable
                />
                <Typography variant="body2" color="text.secondary">
                  {consola.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
                 </Container>   
            </div>
        </> 
    );
}

