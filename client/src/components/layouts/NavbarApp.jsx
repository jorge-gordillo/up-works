import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { roles, routes } from "../../helpers";
import { DashboardRounded, DashboardOutlined, SearchRounded, PersonRounded, PersonOutlineRounded, CheckRounded, CheckCircleRounded, LoginRounded, HomeRounded, WorkRounded, WorkOutlineRounded, AdminPanelSettings, AccountCircleOutlined, AssignmentIndOutlined, AssignmentIndRounded, InfoTwoTone } from "@mui/icons-material";
import { Navbar, Nav, Container } from "react-bootstrap";
// import "./Navbar.css";

const NavbarApp = () => {
	const { isLogged, hasRole, logout } = useAuth();
	const { pathname } = useLocation();

	return (
		<Navbar
			expand="lg"
			variant="dark"
			bg="dark"
			sticky="top"
			className="nav-bg"
		>
			<Container fluid>
				<Navbar.Brand as={NavLink} to={routes.home}>
					UpWorks
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						{isLogged() && (
							<>
								<Nav.Link as={NavLink} to={routes.home}>
									Inicio
								</Nav.Link>
								

								{hasRole(roles.regular) && (
									<>
                           <Nav.Link as={NavLink} to={routes.applications}>
                              Postulaciones
                           </Nav.Link>
									</>
                        )}
                        
								{hasRole(roles.admin) && (
									<>
										<Nav.Link as={NavLink} to={routes.admin.users}>
											Usuarios
										</Nav.Link>
										<Nav.Link as={NavLink} to={routes.admin.business}>
											Empresas
										</Nav.Link>
									</>
								)}
								{hasRole(roles.company) && (
									<>
										<Nav.Link as={NavLink} to={routes.company.vacancies}>
											Vacantes
										</Nav.Link>
									</>
                        )}
                        
                        <Nav.Link as={NavLink} to={routes.profile}>
									Perfil
                        </Nav.Link>
							</>
						)}
					</Nav>
					<Nav>
						{!isLogged() ? (
							<>
								<Nav.Link as={NavLink} to={routes.home}>
									Inicio
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.login}>
									Login
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.about}>
									About
								</Nav.Link>
							</>
						) : (
							<Nav.Link onClick={() => logout()}>
								Cerrar sesion
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarApp