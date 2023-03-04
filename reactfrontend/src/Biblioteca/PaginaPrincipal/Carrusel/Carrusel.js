import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../LOGIN/Login.css';


function Carrusel() {
  //Variable para saber la foto actual.
  const [index, setIndex] = useState(0);
  //Función para cambiar el index.
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="fotoFondoPaginaPrincipal d-block w-100"
          src={require("../../../img/a.jpg")}
          alt="Primera foto Carrusel"
        />

        <Carousel.Caption>
          <h1>Cambio de información segura</h1>
          <p>Nuestra página web asegura que tus datos más importantes estén cifrados y no puedan acceder a los mismos.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="fotoFondoPaginaPrincipal d-block w-100"
          src={require("../../../img/b.jpg")}
          alt="Segunda foto Carrusel"
        />

        <Carousel.Caption>
          <h1>El tiempo es dinero...</h1>
          <p>Comprueba que tus empleados fichar a la hora que deberían usando nuestra página web.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="fotoFondoPaginaPrincipal d-block w-100"
          src={require('../../../img/c.jpg')}
          alt="Tercera foto Carrusel"
        />

        <Carousel.Caption>
          <h1>Puedes fichar en cualquier lugar, en cualquier momento</h1>
          <p>Puedes fichar cuando quieras y donde quieras debido a que nuestra págin web es accesible en cualquier dispositivo</p>
          <p>(ordenador, teléfono móvil o tableta digital)</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="fotoFondoPagina d-block w-100"
          src={require('../../../img/d.jpg')}
          alt="Cuarta foto Carrusel"
        />

        <Carousel.Caption>
          <h1 className='tituloCarruselFoto'>Mejora la comunicación con tus empleados.</h1>
          <p>En nuestra página web disponemos de un chat para comunicarte con el empleado o el empleado con la empresa.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;