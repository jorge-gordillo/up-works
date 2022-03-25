import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { roles, routes } from "../../helpers";
import { DashboardRounded, DashboardOutlined, SearchRounded, PersonRounded, PersonOutlineRounded, CheckRounded, CheckCircleRounded, LoginRounded, HomeRounded, WorkRounded, WorkOutlineRounded, AdminPanelSettings, AccountCircleOutlined, AssignmentIndOutlined, AssignmentIndRounded, InfoTwoTone } from "@mui/icons-material";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./NavbarApp.css";


const NavbarApp = () => {
	const { isLogged, hasRole, logout } = useAuth();
	const { pathname } = useLocation();

	return (
		<Navbar expand="lg" className="nav-bg" variant="dark">
			<Container fluid>
				<Navbar.Brand as={NavLink} to={routes.home}>
					UpWorks
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						{isLogged() && (
							<>
								<Nav.Link as={NavLink} to={routes.Dashboard}>
                    {pathname === routes.Dashboard ? (
                      <DashboardRounded />
                    ) : (
                      <DashboardOutlined />
                    )}
                    Inicio
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={routes.Search}>
                    <SearchRounded /> Buscar
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
									<NavDropdown
									  title={
										<>
										  <AdminPanelSettingsIcon />
										  Admin
										</>
									  }
									>
									  <NavDropdown.Item
										as={NavLink}
										to={routes.admin.Users}
									  >
										Registro Alumnos
									  </NavDropdown.Item>
									  <NavDropdown.Item
										as={NavLink}
										to={routes.admin.Business}
									  >
										Registro Empresa
									  </NavDropdown.Item>
									</NavDropdown>
								  </>
								)}
								{hasRole(roles.company) && (
									<>
									<Nav.Link as={NavLink} to={routes.company.Jobs}>
									  {pathname === routes.company.Jobs ? (
										<WorkRounded />
									  ) : (
										<WorkOutlineRounded />
									  )}
									  Empleos
									</Nav.Link>
									<Nav.Link as={NavLink} to={routes.company.Application}>
									  {pathname === routes.company.Application ? (
										<ContactMailIcon />
									  ) : (
										<ContactMailRoundedIcon />
									  )}
									  Aplicados
									  </Nav.Link>
									<Nav.Link as={NavLink} to={routes.company.JobInfo}>
									  {pathname === routes.company.JobInfo ? (
										<PersonRounded />
									  ) : (
										<PersonOutlineRounded />
									  )}
									  Perfil
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
								<HomeRounded />Inicio
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.login}>
							    <LoginRounded />Login
								</Nav.Link>
								<Nav.Link as={NavLink} to={routes.about}>
									<InfoTwoTone /> About
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