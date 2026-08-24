import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Thanks from './pages/Thanks'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thanks" element={<Thanks />} />
    </Routes>
  )
}
