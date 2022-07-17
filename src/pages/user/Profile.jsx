import React from "react";
import {useState } from "react";
import axios from "axios";
import {
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";


const CoUrl = "http://localhost:8000/api/v1/alumns/";


 
export default function Profile() {
  
  fetch("http://localhost:8000/api/v1/alumns/", { 
    method: "GET",  
  }).then(function(response) {
    return response.text();
  }).then(function(data) {
    console.log("Mira",data);
  })
  const [data, setData] = useState([]);
  //selecion de datos
  const [selecAl, setselecAl] = useState({
   
  });
  //captura de datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setselecAl((prevState) => ({
      ...prevState,
      [name]: value,
    }));
 
    console.log("Mira: ", selecAl);
  };
  //metodo de get para pedir los datos de la api
  const peticionGet = async () => {
    await axios
      .get(CoUrl)
      .then((response) => {
        setData(response.data);
        console.log("Peticion GET");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.fire({
          icon: "error",
          title: "Ups.. Algo salio mal!",
        });
      });
  };
  return (
    <>
      <Grid container spacing={3} sx={{ pt: 3 }}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://www.bing.com/th?id=AMMS_234d7638413b734c1560bf8e7f642960&w=110&h=110&c=7&rs=1&qlt=95&pcl=f9f9f9&o=6&cdv=1&pid=16.1"
                    sx={{ width: 160, height: 160, mx: "auto", my: 2.5 }}
                  />
                  <Typography variant="h6" color="black">
                    
                  </Typography>
                  {data.map((selecAl) => ( 
                  <Typography variant="caption" color="text.secondary" key={selecAl.id}>
                    {selecAl.name}
                  </Typography>))
                  }
                 
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Typography
                    variant="h1"
                    color="initial"
                    sx={{ fontSize: 20, mb: 1.8 }}
                  >
                   XD
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Fundación: 
                  </Typography>

                  <Chip
                    icon={<RoomIcon />}
                    label="Ubicacion"
                    component="a"
                    href="#"
                    variant="outlined"
                    clickable
                  />
                  <Chip
                    icon={<RoomIcon />}
                    label="Direccion"
                    component="a"
                    href="#"
                    variant="outlined"
                    clickable
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}