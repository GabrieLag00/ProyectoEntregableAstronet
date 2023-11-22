import React, { useState, useEffect } from "react";
import "./styles/SearchPage.css"; // Importa tus estilos CSS
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from '../components/NavBar';
import {Footer} from '../components/Footer'
import Slider from "react-slick";
import Earth from '../pages/bg/planets/Earth.jpg'
import Jupiter from '../pages/bg/planets/Jupiter.jpg'
import Mars from '../pages/bg/planets/Mars.jpg'
import Saturn from '../pages/bg/planets/Saturn.jpg'
import Uranus from '../pages/bg/planets/Uranus.jpg'
import Venus from '../pages/bg/planets/Venus.jpg'
import Mercury from '../pages/bg/planets/Mercury.jpg'
import Neptune from '../pages/bg/planets/Neptune.jpg'

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [planets, setPlanets] = useState([]);
  
  
  const planetImages = {
    Mercury: Mercury,
    Venus: Venus,
    Uranus: Uranus,
    Saturn: Saturn,
    Mars: Mars,
    Jupiter: Jupiter,
    Earth: Earth,
    Neptune: Neptune,
    //... agrega las demás imágenes
  };



  useEffect(() => {
    // Esta llamada a la API obtiene los datos de los planetas
    fetch('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true')
      .then(response => response.json())
      .then(data => {
        // Aquí podrías expandir la información de cada planeta
        // y agregar los detalles que te interesen a un nuevo estado.
        const detailedPlanets = data.bodies.map(planet => ({
          ...planet,
          // Aquí puedes agregar más campos como 'description', 'mass', 'volume', etc.
          image: planetImages[planet.englishName] // Asumimos que tienes una imagen para cada uno
        }));
        setPlanets(detailedPlanets);
      });
  }, []);


  useEffect(() => {
    // Función para buscar imágenes en la NASA API
    const searchImages = async () => {
      try {
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`
        );
        const data = await response.json();
        setSearchResults(data.collection.items);
      } catch (error) {
        console.error("Error al buscar imágenes:", error);
      }
    };

    // Realizar la búsqueda cuando cambia el término de búsqueda
    if (searchTerm.trim() !== "") {
      searchImages();
    }
  }, [searchTerm]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const clearImages = () => {
    setSearchResults([]);
    
  };


   // Configuración del carrusel
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    
    <div>
         <NavBar />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar imágenes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={clearImages} className="clear-button">
          Limpiar
        </button>
      </div>
      <div className="image-grid">
        {searchResults.map((image, index) => (
          <div
            key={index}
            className="image-card"
            onClick={() => handleImageClick(image)}
          >
            <div className="image-target">
              <img src={image.links[0].href} alt={image.data[0].title} />
              <div className="image-info">
                <p>{image.data[0].title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="image-popup" onClick={handleImageClose}>
          <div className="image-popup-content">
            <img
              src={selectedImage.links[0].href}
              alt={selectedImage.data[0].title}
            />
            <div className="image-info">
              <p>{selectedImage.data[0].title}</p>
              <p>Fecha: {selectedImage.data[0].date_created}</p>
              <p>Creador: {selectedImage.data[0].center}</p>
              <p>Descripción: {selectedImage.data[0].description}</p>
            </div>
          </div>
        </div>
      )}
       {/* Carrusel de planetas */}
       <div className="planet-carousel-container">
        <Slider {...settings}>
          {planets.map((planet, index) => (
            <div key={index} className="planet-slide">
              <h3>{planet.englishName}</h3>
              <img src={planetImages[planet.englishName]} alt={planet.englishName} />
              <p>{planet.description}</p>
              {/* Incluye aquí más información y/o una imagen del planeta */}
            
            </div>
          ))}
        </Slider>
      </div>
      <Footer/>
    </div>

  );
}

export default SearchPage;
