import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import Notes from './pages/notes'
import NotFound from './pages/NotFound'
import Taches from './pages/taches'

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/taches" element={<Taches />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
