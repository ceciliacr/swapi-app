import React from "react";
import styled from "styled-components";
import { colors } from "../styles/variables";

// Se instala la libreria npm install react-router-dom, se invoca como un compontente
// Link nos permite navegar entre paginas.
import { Link } from 'react-router-dom';

// Una carta tiene un Container (Marco) , es un componente ya definido en Styled y se define los estilos
// Se alinean las tarjeta  flex-direction:
// & cuando tenga un hover efecto de subir un poquito transform -{Ñ}+.Ñ-
const CardContainer = styled(Link)`
    background-color: ${colors.secondary};
    border: 1px solid ${colors.border};
    border-radius: 8px;
    padding: 20px;
    margin: 15px;
    width: 250px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;
    text-decoration: none;
    color: ${colors.text};
    display: flex;
    flex-direction: column;           
    justify-content: space-between;

    &:hover{
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.8);
    }
`;
// Define Titulo
const CardTitle = styled.h3`
    color : ${colors.primary};
    margin-bottom: 5px;
    font-size: 1.5em;
    text-align: center;
`;
// Define el detalle 
const CardDetail = styled.p`
    color: ${colors.textSecondary};
    font-size: 0.9em;
    margin-bottom: 5px;
    text-align: center;
`;
// Se arma la Card con cada uno de los elementos definidos anteriormente
// Se pasa las variables que le da el API, se la paso en forma props {} sin parentesis son parametros
// nombre, tipo, detalle y la direccion url
const Card = ({ name, type, details, url })=>{

   // La direccion se debe encodear se utiliza la funcion btoa
   //encodeURIComponent , es para que no falle la direccion url codificando la url en 64 bits
    const detailUrl = `/${type}/${encodeURIComponent(btoa(url))}`;
    return (
        // Se llama los componentes definidos 
        <CardContainer>
            {/* // Va entre llaves x es un prop */}
            <CardTitle>{name}</CardTitle>
            {/* Es una lista, porque son varios, Object  provee funcionalidad para objeto js
                Necesito la entradas entries de ellas lo ocupo  detalles aqui se utiliza parentesis
                un arreglo, luego dentro de la funcion realizo lo que quiero proyectar.  */}
            {details && Object.entries(details).map(([key,value])=>(
                <CardDetail key={key}>
                    <strong>{key}:{value}</strong> 
                </CardDetail>
            ))}
        </CardContainer>
    );
};

export default Card;