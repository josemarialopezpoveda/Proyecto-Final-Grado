//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from "react";
import { generarUUID, mostrarAlertaErronea, peticionGet } from "../../FuncionesAuxiliares/Funciones";
import { URL_API } from "../../../services/http/const";
import Table from 'react-bootstrap/Table';
import BuscadorNuestrosClientes from "Biblioteca/Buscador/BuscadorNuestrosClientes";
import PaginacionNuestrosClientes from "Biblioteca/Paginacion/PaginacionNuestrosClientes";

function ListarEmpresas() {
  //Creo un estado que principalmente avisa que no hay empresas aún.
  const [empresasDinamico, setEmpresasDinamico] = useState([
    {
      nombreComercial: "No se han registrado empresas aún",
      poblacion: "No se han registrado empresas aún",
      provincia: "No se han registrado empresas aún",
      pais: "No se han registrado empresas aún",
    },
  ]);
  const [empresasEstatico, setEmpresasEstatico] = useState([
    {
      nombreComercial: "No se han registrado empresas aún",
      poblacion: "No se han registrado empresas aún",
      provincia: "No se han registrado empresas aún",
      pais: "No se han registrado empresas aún",
    },
  ]);

  //Esta función hace una petición y almacena los datos de la empresa y si falla avisamos al usuario
  const recoleccionDatos = async () => {
    let datosEmpresa = await peticionGet(URL_API + "empresas");
    console.log(datosEmpresa)
    if (datosEmpresa !== undefined) {
      var todosDatosEmpresa = datosEmpresa.data.map((datosE) => {
        var newEmpresa = {
          nombreComercial: datosE.nombreComercial,
          poblacion: datosE.poblacion,
          provincia: datosE.provincia,
          pais: datosE.pais,
        };
        return newEmpresa;
      });
      setEmpresasDinamico(todosDatosEmpresa);
      setEmpresasEstatico(todosDatosEmpresa);
    } else {
      mostrarAlertaErronea(
        "Error: Algo raro ha pasado...",
        "Error inesperado algo no ha funcionado correctamente.",
        "7000"
      );
    }
  };
  //Creo un useEffect que hace que se recoja la información siempre al cargar la página.
  useEffect(() => {
    recoleccionDatos();
  }, []);

  return(
    <section className="contenedorEmpleadosAcciones">
            <h1 className='text-center mt-4'>Empresas que usan nuestra tecnología</h1>
            <BuscadorNuestrosClientes datosEstaticos={setEmpresasEstatico} datosDinamicos={empresasDinamico}/>
            <div className='TablaDatosUser'>
              <PaginacionNuestrosClientes data={empresasEstatico} perPage={4} />
                {/* <Table id='tablaAccionesEmpleados' striped>
                    <thead>
                        <tr>
                            <th>Nombre Comercial</th>
                            <th>Población</th>
                            <th className='campoOpcional'>País</th>
                            <th className='campoOpcional'>Provincia</th>
                        </tr>
                    </thead>
                    <tbody>
                    {empresasEstatico.map((option) => {
                      return (
                        <tr className="EmpleadoTablaApartado" key={generarUUID()}>
                          <td>{option.nombreComercial}</td>
                          <td>{option.poblacion}</td>
                          <td className="campoOpcional">{option.pais}</td>
                          <td className="campoOpcional">{option.provincia}</td>
                        </tr>
                      )})}
                    </tbody>
                </Table> */}
            </div>
        </section>
  )
}

export default ListarEmpresas;
