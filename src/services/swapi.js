// Se carga como un Servicio , se llama la conexion, armo el card
import axios from "axios";

// Carga el url desde la pagina 
const API_BASE_URL = 'https://swapi.info/api/';

// Hace referencia en la pagina uno 
// Se crea una funcion asincronica , cuando inicia para que arranque en la pagina uno.
export const fetchEntities  = async (type, page = 1 )=>{
    try{
        // signo pregunta esta asignado el numero de pagina
        const response  = await axios.get(`${API_BASE_URL}${type}/?page=${page}`);
        return response.data;
    }catch (error) {
        console.error(`Error fetching ${type}: `, error);
        throw error;
    }
};

// Pase los detalles
export const fetchEntityDetails  = async (url)=>{
    try{
        const response  = await axios.get(url);
        return response.data;
    }catch (error) {
        console.error(`Error fetching entity details : `, error);
        throw error;
    }
};
