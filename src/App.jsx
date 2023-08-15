import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import Notes from './pages/notes'
import NotFound from './pages/NotFound'
import Taches from './pages/taches'
import Connexion from './pages/connexion'
import { ThemeProvider } from '@mui/material'
import Theme from './utils/style'
import useAuth from './hooks/useAuth'

function App() {

  const { isAuthenticated } = useAuth()

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter >
        <Routes>
          <Route path="/auth" element={!isAuthenticated ? <Connexion /> : <HomePage />} />
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/notes" element={isAuthenticated ? <Notes /> : <Navigate to="/" />} />
          <Route path="/taches" element={isAuthenticated ? <Taches /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter >
    </ThemeProvider>
  )
}

export default App
