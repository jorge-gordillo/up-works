import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Swal from "sweetalert2";
//url de api fake
const baseUrl = "http://localhost:3001/company/";

//Alertas
const Alert = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1800,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function Business() {
  //estilos modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 790,
    bgcolor: "#F5FFFB",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //const para la tabla y modal
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //cambiar de pagina en la tabla
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //selecion de datos
  const [selecEm, setselecEm] = useState({
    correo: "",
    password: "",
    rol: "Company",
  });
  //captura de datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setselecEm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(selecEm);
  };
  //metodo de get para pedir los datos de la api
  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.fire({
          icon: "error",
          title: "Ups.. Algo salio mal!",
        });
      });
  };
  //metodo post para guardar datos
  const peticionPost = async () => {
    console.log("Mira bro :", baseUrl, "", selecEm);
    await axios.post(baseUrl, selecEm).then((response) => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    });
    Alert.fire({
      icon: "success",
      title: "Registro Exitoso",
    });
  };
  //metodo para actualizar los datos
  const peticionPut = async () => {
    console.log("Mira bro el put XD:", baseUrl, "id", selecEm.id, selecEm);
    await axios.put(baseUrl + selecEm.id, selecEm).then((response) => {
      var dataNueva = data;
      dataNueva.map((empresa) => {
        if (selecEm.id === empresa.id) {
          empresa.correo = selecEm.correo;
          empresa.password = selecEm.password;
          empresa.rol = selecEm.rol;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
      Alert.fire({
        icon: "success",
        title: "Actualizacion Exitosa",
      });
    });
  };
  //metodo para eliminar datos
  const peticionDelete = async () => {
    await axios.delete(baseUrl + selecEm.id).then((response) => {
      setData(data.filter((empresa) => empresa.id !== selecEm.id));
      abrirCerrarModalEliminar();
      Alert.fire({
        icon: "success",
        title: "Eliminacion Exitosa",
      });
    });
  };
  //abrir y cerrar los modales
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  //obtencion de datos seleccionados
  const seleccAlu = (empresa, caso) => {
    setselecEm(empresa);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(async () => {
    await peticionGet();
  }, []);
  //cuerpo de los modales (formulario)
  const bodyInsertar = (
    <Box sx={style}>
      <h3>Insertar Empresa</h3>
      <Grid item>
        <FormControl sx={{ m: 1, width: "30ch" }}>
          <TextField
            id="outlined-basic"
            type="email"
            name="correo"
            label="Correo"
            variant="outlined"
            helperText="Ingresa el correo con el que estara registrado en la plataforma"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "30ch" }}>
          <TextField
            id="outlined-basic"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            helperText="Ingresa la contraseña con la que estara registrado en la plataforma"
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <label>ROL : COMPANY</label>
      </Grid>
      <div align="right">
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => peticionPost()}>
            Insertar
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </Button>
        </Stack>
      </div>
    </Box>
  );

  const bodyEditar = (
    <Box sx={style}>
      <h3>Editar Empresa</h3>
      <Grid item>
        <FormControl sx={{ m: 1, width: "30ch" }}>
          <TextField
            id="outlined-basic"
            type="email"
            name="correo"
            label="Correo"
            variant="outlined"
            helperText="Ingresa el correo con el que estara registrado en la plataforma"
            onChange={handleChange}
            value={selecEm && selecEm.correo}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "30ch" }}>
          <TextField
            id="outlined-basic"
            type="password"
            name="password"
            label="Contraseña"
            variant="outlined"
            helperText="Ingresa la contraseña con la que estara registrado en la plataforma"
            onChange={handleChange}
            value={selecEm && selecEm.password}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <label>ROL : COMPANY</label>
      </Grid>
      <br />
      <div align="right">
        <Stack spacing={2} direction="row">
          <Button
            color="primary"
            variant="contained"
            onClick={() => peticionPut()}
          >
            Editar
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </Button>
        </Stack>
      </div>
    </Box>
  );

  const bodyEliminar = (
    <Box sx={style}>
      <p>
        Estás seguro que deseas eliminar la empresa{" "}
        <span>{selecEm && selecEm.nombre} </span>{" "}
      </p>
      <div align="right">
        <Stack spacing={2} direction="row">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => peticionDelete()}
          >
            Sí
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </Button>
        </Stack>
      </div>
    </Box>
  );

  return (
    //tabla
    <div className="App">
      <h1>ADMINISTRAR EMPRESAS</h1>
      <br />
      <Button
        variant="contained"
        endIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </Button>
      <br />
      <br />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Correo</TableCell>
                <TableCell>Contraseña</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Botones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell>{empresa.correo}</TableCell>
                    <TableCell>{empresa.password}</TableCell>
                    <TableCell>{empresa.rol}</TableCell>

                    <TableCell>
                      {/* 
                      <Button onClick={() => seleccAlu(empresa, "Editar")}>
                        <Edit />
                      </Button>*/}
                      <Button onClick={() => seleccAlu(empresa, "Eliminar")}>
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/*Modales */}
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default Business;