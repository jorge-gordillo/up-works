//* Contantes de las rutas
export const routes = {
    home: '/', //Pagina principal del sitio
    noticePrivacy: '/aviso-privacidad', //Aviso de privacidad 
    about: '/acerca-de', //Aceerca de del sitio
    login: '/login', //Inicio de sesión
    dashboard: '/dashboard', //Tablero del sitio
    search: '/buscar', //Buscador del sitio
    job: '/empleo/:workId', //Informacion del empleo
    regular: {
        curriculum: '/curriculo', //Perfil del alumno
        application: '/postulaciones', //Lista de postulaciones del alumno
    },
    company: {
        porfile:'/empresa/perfil', //Perfil de la empresa
        jobs: '/empresa/empleos', //Lista de los empleos postulados por la empresa
        newJob: '/empresa/nuevo-empleo', //Pagina para agregar un nuevo empleo
    },
    admin: {
        jobs: '/admin/empleos', //Lista de empleos por validar
        users: '/admin/usuarios', //Registrar un elumno nuevo
        business: '/admin/empresas' //Registrar una empresa nueva
    },
    error: '*'
}