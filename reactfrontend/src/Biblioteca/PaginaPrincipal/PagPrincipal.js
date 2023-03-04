//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import ContenidoPagPrincipal from './ContenidoPagPrincipal.js';
import PiePagina from './Footer/PiePagina.js';
import ImagenFondo from './Nav/ImagenFondo.js';


function PagPrincipal() {
  return (
    <React.Fragment>
      <ImagenFondo/>
      <ContenidoPagPrincipal/>
      <PiePagina/>
    </React.Fragment>
  );
}

export default PagPrincipal;
