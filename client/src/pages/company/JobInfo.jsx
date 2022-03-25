import React from "react";
import {
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";

export default function JobInfo() {
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
                    Amazon
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
