import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import Notes from './pages/notes'
import NotFound from './pages/NotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        {/* <Route path="/taches" element={<Taches />} />*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
