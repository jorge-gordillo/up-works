import { Routes, Route } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import { ThemeProvider } from '@mui/material/styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './styles/themeConfig'
import './styles/App.css'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/*' element={<AppRouter/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
