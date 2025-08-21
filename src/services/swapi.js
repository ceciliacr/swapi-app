// Proyecto: Que pueda seleccionar dos categorías  Planetas y Personas. 
// Agregar dos categorías 

// Estructura del Proyecto:
//  -- Componentes : Se arma en forma de Cartas, Encabezado y LoadingSpinner
//  -- Paginas     : Pagina Principal y el detalle.
//  -- Estilos     : Estilos en JS ,  
//  -- Servicios   : Conexión al  API

// Se carga como un Servicio 
// Se llama la conexion
// Se arma el card

// API: La información la devuelve en String pero es un diccionario.
// axios Es una libreria que debe instarlar con: npm install axios Permite hacer funciones asincronicas más sencillas.
// 'styled-components' Es una libreria permite inserta estilos en JS.

import axios from "axios";

// Carga el url desde la pagina 
const API_BASE_URL = 'https://swapi.py4e.com/api/';
// "https://swapi.info/api/";


// Hace referencia en la pagina uno 
// Se crea una funcion asincronica , cuando inicia para que arranque en la pagina uno.
// Funcione para cualquier tipo 
export const fetchEntities = async (type, page = 1)=>{
    try{
        
        // Arma el url con la constante, tipo y la pagina. Retorna la informacion
        // Con signo pregunta esta asignado el numero de pagina
        const response = await axios.get(`${API_BASE_URL}${type}/?page=${page}`);
        return response.data;

    // Si presenta un error    
    }catch (error){
        console.error(`Error Fetching ${type}: `, error);
        throw error;		
    }
};

// Pase los detalles del url que recibe
export const fetchEntityDetails = async (url)=>{
    try {
        const response = await axios.get(url);
        return response.data;

    }catch (error){
        console.error(`Error Fetching entity details : `, error);
        throw error;
    }
};