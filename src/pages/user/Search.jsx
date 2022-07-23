import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Fab,
  Grid,
  FormControl,
  Card,
  Alert,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";
import SendIcon from '@mui/icons-material/Send';
import "./Search.css";
import axios from "axios";

//url de api fake y rikolino
const CoUrl = "http://127.0.0.1:8000/api/v1/jobs/";
const ApUrl = `http://127.0.0.1:8000/api/v1/applications/`;

export default function Search() {
  const [data, setData] = useState([]);
  const [Search,setSearch] = useState(null);
  const [applic] = useState({
    id: "",
    cv: "",
    id_job: "",
  });
  function getNameCompany() {
    return window.localStorage.getItem("name");
  }

  const peticionGet = async () => {
    await axios
      .get(CoUrl)
      .then((response) => {
        response.data.data.forEach((element) => console.log(element));
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.fire({
          icon: "error",
          title: "Ups.. Algo salio mal!",
        });
      });
  };

  const handleSearch=e=> {
      setSearch(e.target.value);
      filter(e.target.value);
      console.log(e.target.value);
      if(e.target.value===""){
        peticionGet();
      }
      
  }
  const peticionPost = async () => {
    await axios
      .post(ApUrl, applic)
      .then((response) => {
        console.log("Pedro mira:", applic);
        getId_Company();
        setData(data.concat(applic));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* applic.push(); */
    peticionPost();
    console.log("Envio...");
  }

  const filter=(termSearch)=>{
    let dataFiltered = data.filter(element => {
      if (element.title.toLowerCase().includes(termSearch.toLowerCase()) 
         || element.company.name.toLowerCase().includes(termSearch.toLowerCase())
         || element.job_type.toLowerCase().includes(termSearch.toLowerCase()) 
         || element.workplace.toLowerCase().includes(termSearch.toLowerCase())){
        return element;
      }
    });
    setData(dataFiltered);
  }
  

  useEffect(async () => {
    await peticionGet();
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <br/>
        <h1 >Ubica tu proximo trabajo !</h1>
        <Grid container spacing={1}>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 500   }}>
              <TextField label="Buscar" value={Search} placeholder="Ingresa la compañia o (Nombre/Lugar/Tipo) De Trabajo" color="secondary" onChange={handleSearch} focused/>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <div class="Principal">
        <Grid container spacing={1}>
          {data.map((job) => (
            <Card
              class="cardEmpleo"
              sx={{ maxWidth: 400, maxHeight: 500 }}
              key={job.id}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Avatar
                          alt="Remy Sharp"
                          src= {`http://127.0.0.1:8000${job.company.photo}/`}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Typography gutterBottom variant="h5">
                          {job.title}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                          Lugar de trabajo: {job.workplace}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                          Tipo de trabajo: {job.job_type}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                          Salario: ${job.salary}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Chip
                          icon={<RoomIcon />}
                          label={job.ubication}
                          component="a"
                          href="#"
                          variant="outlined"
                          clickable
                        />
                        <Typography variant="body2" color="text.primary">
                          {job.description}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        Empresa: {job.company.name}
                      </Typography>
                      <Button  variant="contained" endIcon={<SendIcon />} onChange={handleSubmit}>
                    Postularme
                  </Button> 
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </div>
    </>
  );
}
