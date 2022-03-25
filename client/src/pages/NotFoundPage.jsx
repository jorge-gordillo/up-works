import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { routes } from "../../helpers";
import Typography from "@mui/material/Typography";

const NotFoundPage = () => {
  return (
    <Row className="py-5">
      <Col md={8} className="text-center mx-auto mb-5">
        <img
          src="/assets/img/404-not-found.svg"
          alt="NotFoundPage"
          className="img-fluid"
        />
        <Typography variant="h2" gutterBottom component="div">
          ¿Te has perdido?
        </Typography>
        <Typography variante="h6" gutterBottom component="div">
          Vuelve al <Link to={routes.Principal}>Inicio</Link>
        </Typography>
      </Col>
    </Row>
  );
};

export default NotFoundPage;
