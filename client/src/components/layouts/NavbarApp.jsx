import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { roles, routes } from "../../helpers";
import {
	DashboardRounded,
	DashboardOutlined,
	SearchRounded,
	PersonRounded,
	PersonOutlineRounded,
	CheckRounded,
	CheckCircleRounded,
	LoginRounded,
	HomeRounded,
	WorkRounded,
	WorkOutlineRounded,
	AdminPanelSettings,
	AccountCircleOutlined,
	AssignmentIndOutlined,
	AssignmentIndRounded,
	LogoutIcon,
	InfoTwoTone,
	PersonIcon,
	ApartmentIcon
} from "@mui/icons-material";
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
											<PersonIcon/>Usuarios
										</Nav.Link>
										<Nav.Link as={NavLink} to={routes.admin.business}>
											<ApartmentIcon/>Empresas
										</Nav.Link>
									</>
								)}
								{hasRole(roles.company) && (
									<>
										<Nav.Link as={NavLink} to={routes.company.vacancies}>
											Vacanates de empleos
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
								<HomeRounded/>Inicio
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.login}>
								<LoginRounded/>Login
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.about}>
								<InfoTwoTone/>About
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
