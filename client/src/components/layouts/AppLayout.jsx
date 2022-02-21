import { Outlet } from 'react-router-dom';
import NavbarApp from './NavbarApp'
import FooterApp from './FooterApp'

const AppLayout = () => {
   return (
      <main className='App'>
         {/* <NavbarApp /> */}
         <Outlet />
         {/* <FooterApp /> */}
      </main>
   )
}

export default AppLayout
