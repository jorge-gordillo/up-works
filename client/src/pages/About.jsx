import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { padding } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function About() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} style={{padding:'3rem'}}>
      <Item>
        <Grid container spacing={5}>
          <Grid item xs={7}>
         
              <h1 className="tit">
                Acerca de<span> UPWORKS</span>
              </h1>
              <div className="p-size">
                <p>
                  UPWORKS es una página web que esta destinado para los
                  estudiantes de la Universidad Politecnica De Tapachula.
                </p>
                <p>
                  El objetivo de nuestro proyecto es facilitar las oportunidades
                  de trabajo con las empresas que tienen convenio con la
                  universidad hacia los estudiantes egresados y activos de la
                  UPTAP.
                </p>
              </div>
            
          </Grid>
          <Grid item xs={5}>
            <br></br>
            <img src="/src/logoUpwork.png" alt="logo" />
          </Grid>
        </Grid>
        </Item>
      </Box>
    </div>
  );
}

