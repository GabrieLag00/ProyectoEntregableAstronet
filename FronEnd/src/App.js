import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import {AuthProvider} from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import SearchPage from './pages/SearchPage'
import WiewsPage from './pages/WiewsPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import TaskFromPage from './pages/TaskFromPage'
import ProtectedRoute from './ProtectedRoute'
import TaskPage from './pages/TaskPage'
import HomeDash from './pages/HomeDash'
import StarPage from './pages/StarPage'

function App() {
  return (
  <TaskProvider>
    <AuthProvider>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/login' element = {<LoginPage/> } /> 
        <Route path='/register' element = {<RegisterPage/> } /> 
        <Route path='/ubicacion' element = {<h1>Ubicación</h1> } /> 
        <Route path='/vistas' element = {<WiewsPage/> } />
        <Route path='/search' element = {<SearchPage/> } /> 
        
      <Route element={<ProtectedRoute/>}>
        <Route path='/add-task' element = {<TaskFromPage/> } /> 
        <Route path='/tasks/:id' element = {<TaskFromPage/> } /> 
        <Route path='/profile' element = {<ProfilePage/> } /> 
        <Route path='/dashboard' element = {<DashboardPage/> } /> 
        <Route path='/tasks' element = {<TaskPage/> } /> 
        <Route path='/homedash' element = {<HomeDash/> } />
        <Route path='/planets' element = {<StarPage/> } /> 
      </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </TaskProvider>
  );
}

export default App;