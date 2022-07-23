import React, { useEffect, useState } from "react";
import axios from "axios";
import CakeIcon from "@mui/icons-material/Cake";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import DownloadIcon from '@mui/icons-material/Download';


export default function Profile() {
  const [data, setData] = useState([]);
  const CoUrl = "http://127.0.0.1:8000/api/v1/alumns";

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
    axios
      .get(`http://127.0.0.1:8000/api/v1/alumns/${getId()}/`, {
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

  let dis;
if (data.relocate) {
    dis = <ListItemText primary="Dispuesto a reubicarse" />;
  } else{
    dis =  <ListItemText primary="Sin disposición a reubicarse" />;  
}


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
                    {data.ocupation}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {data.matricula}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Typography
                    variant="h1"
                    color="initial"
                    sx={{ fontSize: 20, mb: 1.8 }}
                  >
                    {getName()}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Acerca De Mi:
                  </Typography>

                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CakeIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Fecha de nacimiento"
                        secondary={data.birthday}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PhoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Celular" secondary={data.phone}/>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AirplaneTicketOutlinedIcon />
                        </Avatar>
                      </ListItemAvatar>
               {dis}
                    </ListItem>
                  </List>
                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Resumen</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body2"
                          color="text.primary"
                        >{data.abstract}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <br/>
                   <Button href={data.cv} target="_blank" variant="contained"endIcon={<DownloadIcon />} >
                    Descargar Cv
                  </Button> 
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}