import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { roles, routes } from "../../helpers";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavbarApp.css";

const NavbarApp = () => {
	const { isLogged, hasRole, logout } = useAuth();
	const { pathname } = useLocation();
	return (
		<Navbar
			expand="lg"
			variant="dark"
			sticky="top"
			className="nav-bg"
		>
			<Container fluid>
				<Navbar.Brand as={NavLink} to={routes.site}>
					UpWorks
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						{isLogged() && (
							<>
								<Nav.Link as={NavLink} to={routes.site}>
									<HomeIcon />	Inicio
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
											<AdminPanelSettingsIcon />	Usuarios
										</Nav.Link>
										<Nav.Link as={NavLink} to={routes.admin.business}>
											<BusinessIcon />	Empresas
										</Nav.Link>
									</>
								)}
								{hasRole(roles.company) && (
									<>
										<Nav.Link as={NavLink} to={routes.company.vacancies}>
											<MarkunreadMailboxIcon />	Vacanates de empleos
										</Nav.Link>

										<NavLink as={NavLink} to={routes.company.aplications}>
											Aplicaciones
										</NavLink>

										<Nav.Link as={NavLink} to={routes.company.job}>
											Perfil Empresas
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

								<Nav.Link as={NavLink} to={routes.site}>
									<HomeIcon />	Iniciar
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.login}>
									<LoginIcon />Iniciar Sesion
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.about}>
									<InfoIcon />About
								</Nav.Link>
							</>
						) : (
							<Nav.Link onClick={() => logout()}>
								<LogoutIcon /> Cerrar sesion
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarApp;
