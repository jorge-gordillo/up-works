//* Contantes de las rutas
export const routes = {
    site: '/',
    about: "/acerca-de",
    noticePrivacy: '/aviso-privacidad',
    termsConditions: "/terminos-y-condiciones",
    FAQ: "preguntas-frecuentes",
    login: '/login',
    home: '/inicio',
    job: '/empleo/:workId',
    profile: "/perfil",
    applications: "/postulaciones",
    unauthorized: "/no-autorizado",
    notFoundPage: "/*",
    company: {
        vacancies: '/vacantes',
        job: '/empesa/:idJob',
        aplications: '/empresa/:idJob/postulaciones',
        applicant: '/empresa/:idJob/postulaciones/:idApplicant',
        newJob: '/nuevoa-vacante'
    },
    admin: {
        users: '/admin/usuarios',
        business: '/admin/empresas'
    }
}