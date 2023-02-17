import './App.css'
import { Outlet } from 'react-router-dom'



//components




const App = () => {
  return (
      <div>
      <AuthProvider>
      
      <Outlet />
      
      </AuthProvider>
    </div>
  )
}

export default App
