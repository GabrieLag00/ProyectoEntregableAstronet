import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import './styles/WiewsPage.css';
import { NavBar } from '../components/NavBar';
import Background from '../pages/bg/Background.png'
import Star from '../pages/bg/Star.png'
import { Footer } from '../components/Footer';

function WiewPageComponent() {
  // Estados para almacenar datos del ISS, estrellas, usuario y perfil.
  const [issData, setISSData] = useState(null);
  const [issInfoVisible, setIssInfoVisible] = useState(false);
  const [starData, setStarData] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Función para alternar la visibilidad de la información del ISS.
  const toggleIssInfo = () => {
    setIssInfoVisible(!issInfoVisible);
  };

  // Función para cerrar sesión y reiniciar estados.
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    setShowProfile(false);
  };

  // Función para manejar el éxito del inicio de sesión con Google.
  const handleLoginSuccess = (codeResponse) => {
    setUser(codeResponse);
    setShowProfile(false); // Asegurarse de ocultar el perfil al iniciar sesión
  };

  // Hook para inicio de sesión con Google.
  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => console.log('Login Failed:', error)
  });

  // Efecto para cargar datos del ISS.
  useEffect(() => {
    const fetchISSData = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const result = await response.json();
        setISSData(result);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStarData = async () => {
      const options = {
        method: 'GET',
        url: 'https://stars-by-api-ninjas.p.rapidapi.com/v1/stars',
        params: { name: 'Andromeda Galaxy' },
        headers: {
          'X-RapidAPI-Key': '8829d68d7fmsh8064becaa341a8cp15e52ajsn523003d1beec',
          'X-RapidAPI-Host': 'stars-by-api-ninjas.p.rapidapi.com',
        }
      };

      try {
        const response = await axios.request(options);
        setStarData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchISSData();
    fetchStarData();
  }, []);

  // Efecto para cargar información del perfil después del inicio de sesión.
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="page-layout">
      <NavBar />
      <div className="hero-section">
        <div className="content-container">
          <div className='Iss-home'>
          {/* Contenedor de la tarjeta de perfil y botón de inicio de sesión */}
          <div className="user-info-container">
            {profile ? (
              showProfile ? (
                <div className="profile-card show">
                  <img src={profile.picture} alt="user image" className="profile-picture" />
                  <h3>User Logged in</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <button onClick={() => setShowProfile(false)}>Hide Profile</button>
                  <button onClick={logOut}>Log out</button>
                </div>
              ) : (
                <button className="show-profile-button" onClick={() => setShowProfile(true)}>
                  Show Profile
                </button>
              )
            ) : (
              <button className="google-login-button" onClick={() => login()}>
                Sign in with Google 🚀
              </button>
            )}
          </div>

          {/* Título principal, subtítulo y botón de información del ISS */}
          <div className="title-and-button-container">
            <h1 className="main-title">ISS Satellite Information</h1>
            <p className="subtitle">Learn about the International Space Station's current location</p>
            <button onClick={toggleIssInfo} className="iss-info-button">
              {issInfoVisible ? 'Hide ISS Info' : 'Show ISS Info'}
            </button>
            {issInfoVisible && issData && (
              <div className={`iss-info ${issInfoVisible ? 'show' : ''}`}>
                <h2>ISS Location</h2>
                <p>Latitude: {issData.iss_position.latitude}</p>
                <p>Longitude: {issData.iss_position.longitude}</p>
                <p>Speed: {issData.velocity} m/s</p>
                <p>Altitude: {issData.altitude} km</p>
                <p>Timestamp: {new Date(issData.timestamp * 1000).toLocaleTimeString()}</p>
              </div>
            )}
          </div>

          {/* Imagen del satélite ISS */}
          <div className="image-container">
            <img src={Background} alt="Satellite" className="section-image" />
          </div>
          </div>

          {/* Contenedor de detalles de estrellas */}
          <div className="star-info-container">
            <div className='star-card'>
            <img src={Star} alt="Galaxy" className="star-image" />
            {starData && starData.length > 0 ? (
              <div className="star-info">
                <h2>Star Details</h2>
                <ul>
                  {starData.map((star, index) => (
                    <li key={index}>
                      <strong>Name:</strong> {star.name}<br />
                      <strong>Constellation:</strong> {star.constellation}<br />
                      <strong>Right Ascension:</strong> {star.right_ascension}<br />
                      <strong>Declination:</strong> {star.declination}<br />
                      <strong>Apparent Magnitude:</strong> {star.apparent_magnitude}<br />
                      <strong>Absolute Magnitude:</strong> {star.absolute_magnitude}<br />
                      <strong>Distance (light years):</strong> {star.distance_light_year}<br />
                      <strong>Spectral Class:</strong> {star.spectral_class}<br />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading star data...</p>
            )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WiewPageComponent;