import React, { useEffect, useState } from "react";
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
import FlagIcon from '@mui/icons-material/Flag';

export default function Profilecompany() {
  const [data, setData] = useState([]);
  const CoUrl = "http://127.0.0.1:8000/api/v1/companies";

  //consumiendo api con fetch
  function getoken() {
    return window.localStorage.getItem("token");
  }
 
  function getId() {
    return window.localStorage.getItem("id");
  }
  function getName() {
    return window.localStorage.getItem("name");
  }
  function getPhoto() {
    return window.localStorage.getItem("photo");
  }
  console.log("ID =" + getId());
  console.log("NAME =" + getName());
  console.log("TOKEN =", getoken());



  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${getoken()}`,
  };
  const peticionGet = async () => {
    axios.get(`http://127.0.0.1:8000/api/v1/companies/${getId()}/`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${getoken()}`,
        },
      })
      .then((res) => {
        setData(res.data); //seteando data
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(async () => {
    await peticionGet();
  }, []);

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
                    src={`http://127.0.0.1:8000${getPhoto()}/`}
                    sx={{ width: 160, height: 160, mx: "auto", my: 2.5 }}
                  />
                  <Typography variant="h6" color="black">
                  {getName()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Compañia
                  </Typography>
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
                    Sobre Nosotros
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Fundación: {data.birthday}
                  </Typography>

                  <Chip
                    icon={<FlagIcon />}
                    label={data.country}
                    component="a"
                    href="#"
                    variant="outlined"
                    clickable
                  />
                  <Chip
                    icon={<RoomIcon />}
                    label={data.address}
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