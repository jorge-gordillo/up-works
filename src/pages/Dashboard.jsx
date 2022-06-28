import { useNavigate, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Typography, Alert, AlertTitle, Container, Paper, Box, Grid, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const Dashboard = () => {
   const navigate = useNavigate()
   const { logout } = useAuth()

   const singOut = () => {
      logout()
      navigate('/')
   }

   return (
      <section>
         <Typography variant="h3" align="center" component="div" gutterBottom >Dashboard</Typography>
         <br />
         <Container fixed>
            <Paper elevation={0}>
               <Alert severity="success">
                  <AlertTitle>BIENVENIDO</AlertTitle>
                  <strong>Inicio correcto!</strong>
               </Alert>
            </Paper>
            <br></br>
            <Box sx={{ width: '80%' }} style={{ margin: 'auto' }}>
               <Grid container spacing={3} >
                  <br></br>
                  <Grid Paper xs style={{padding:'1%'}}>
                     <Link to="/admin/usuarios"> <Paper>
                        <Typography  variant="h6" align="center" component="div" gutterBottom color="primary" ><br></br>Administrar Usuarios<AdminPanelSettingsIcon color="primary"/></Typography><br></br></Paper>
                      </Link>
                  </Grid>
                  <br></br>
                  <Grid Paper xs style={{padding:'1%'}}>
                     <Link to="/"><Paper>
                        <Typography variant="h6" align="center" component="div" gutterBottom color="primary" ><br></br>INICIO<HomeIcon color="primary" ></HomeIcon></Typography><br></br></Paper>
                     </Link>
      
                  </Grid>
                  <br></br>
                  <Grid Paper xs style={{padding:'1%'}}>
                     <Link to="/admin/empresas" ><Paper>
                        <Typography variant="h6" align="center" component="div" gutterBottom color="primary" ><br></br>Administrar Empresas<AdminPanelSettingsIcon color="primary"/></Typography><br></br></Paper>
                     </Link>
                  </Grid>
                  <br></br>
               </Grid>
            </Box>
            <br></br>
            <Button variant="outlined" color="error" onClick={singOut} style={{width:'300px',margin:'auto'}} >
               Cerrar sesion
            </Button>
         </Container>
      </section>

   )
}

export default Dashboard