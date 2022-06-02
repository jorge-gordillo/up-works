import { Routes, Route, Navigate } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"

import AppLayout from "../components/layouts/AppLayout"

import Home from "../pages/Home"
import About from "../pages/About"
import NoticePrivacy from "../pages/NoticePrivacy"
import TermsConditions from "../pages/TermsConditions"
import Faq from "../pages/Faq"
import Login from "../pages/Login"
import NotFoundPage from "../pages/NotFoundPage"
import Unauthorized from "../pages/Unauthorized"

import Dashboard from "../pages/Dashboard"
import Job from "../pages/Job"
import Profile from "../pages/Profile"
import Applications from "../pages/Applications"

import Jobs from "../pages/company/Jobs"
import Profilecompany from '../pages/company/Profilecompany'
/* import Application from "../pages/company/Application" */
import Applicant from "../pages/company/Applicant"


import Users from "../pages/admin/Users"
import Business from '../pages/admin/Business'

const AppRouter = () => {

   return (
      <Routes>
         <Route path='/' element={<AppLayout />}>
            {/* Rutas publicas */}
            <Route path='/' element={<Home />} />
            <Route path='acerca-de' element={<About />} />
            <Route path='aviso-privacidad' element={<NoticePrivacy />} />
            <Route path='terminos-condiciones' element={<TermsConditions />} />
            <Route path='FAQ' element={<Faq />} />
            <Route path='login' element={<Login />} />
            <Route path='unauthorized' element={<Unauthorized />} />

            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
               <Route path='inicio' element={<Dashboard />} />
               <Route path='vacante' element={<Job />} />
               <Route path='perfil' element={<Profile />} />
               <Route path='postulaciones' element={<Applications />} />
            </Route>

            {/* Rutas protegidas usuario Regular */}
            <Route element={<PrivateRoute hasRole='regular' />} >
            </Route>

            {/* Rutas protegidas usuario Company */}
            <Route path='/' element={<PrivateRoute hasRole='company' />}>
               <Route path='trabajos' element={<Jobs />} />
               <Route path='perfil/company' element={<Profilecompany />} />
               <Route path='trabajos/postulaciones' element={<Applicant />} />

               {/* <Route path='vacante/:idJob/postulaciones' element={<Application />} /> */}
               {/*  <Route path='nueva-vacante' element={<NewJob />} /> */}
            </Route>

            {/* Rutas protegidas usuario Admin */}
            <Route path='admin/' element={<PrivateRoute hasRole='admin' />} >
               <Route path='usuarios' element={<Users />} />
               <Route path='empresas' element={<Business />} />
            </Route>

            {/* Catch all */}
            <Route path='*' element={<NotFoundPage />} />
         </Route>
      </Routes>
   )
}

export default AppRouter
