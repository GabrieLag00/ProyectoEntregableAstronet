import React from 'react';
import Sidebar from '../components/SideBar'; // Asegúrate de que la ruta sea correcta
import { NavBar } from '../components/NavBar';
import '../pages/styles/SideBar.css'; // Asegúrate de que la ruta sea correcta
import '../pages/styles/HomeDash.css'
import login from '../pages/bg/login.jpg'

function HomeDash() {
  return (
    <div>
      <NavBar />
      <div className="dashboard-wrapper">
        <Sidebar />
        <div className='Target-Card'>
        <h1 className='dashboard-titulo'>Bienvenido a el Dashboard</h1>
        <img className='dashboard-img' src={login} alt="login img" />
        </div>
        
      </div>
    </div>
  );
}

export default HomeDash;
