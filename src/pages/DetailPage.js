
// Se arma la pagina principal 
import React, { useState, useEffect} from "react";

// useNavigate nos permite moverse entre las paginas.
import { useParams, useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import { fetchEntityDetails } from "../services/swapi";
import LoadingSpinner from "../components/LoadingSpinner";
import { colors } from "../styles/variables";

// Define el componente Container
const DetailsContainer = styled.div`
    padding: 40px;
    background-color: ${colors.secondary};
    border-radius: 10px;
    margin: 40px auto;
    max-width: 800px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.5);
    color: ${colors.text};
    border: 2px solid ${colors.primary};
`;

// Define el componente de Titulo
const DetailTitle = styled.h1`
    color: ${colors.primary};
    font-size: 3em;
    margin-bottom: 10px;
    text-align: center;
    text-shadow: 0 0 8px ${colors.primary};
`;

// Define el componente de Item
// Entre llaves se puede definir dos estilos a una solo propiedad
const DetailItem = styled.p`
    font-size: 1.1em;
    margin-bottom: 10px;
    strong {
        color: ${colors.textSecondary};
        margin-right: 5px
    }
`;

// Define el componete para el button
const BackButton = styled.button`
    background-color: ${colors.primary};
    color: ${colors.tertiary};
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 30px;
    transition: background-color 0.3s ease;
    
    &:hover{
        background-color: #fce100;
    }
`;

const DetailPage = ()=>{
    // useParams Retorna la lleva de un objeto de los parametros dinamicos de la direccion url 
    // encodedURL Es el puente entre paginas. Si va entre llaves Prop . Se utiliza la direccion entre pagina
    const {encodedUrl} = useParams();  //encodeURL es el puente entre paginas PRop atraves de un parametro
    
    // navigate  es el carrito para navegar entre la pagina, esos son hut
    const navigate = useNavigate();  

    // Variables de estado, detalle, cargando y error
    const [details,setDetails] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    // Utilizar la información de API, utilizamos uns funcion asincronica
    // UseEffect funciones Secundarias
    useEffect(()=>{
        const loadDetails = async ()=>{
            // Cambia las variables de estado porque inicializa la función
            setLoading(true);
            setError(null);
            try {
                // URL base 64 pero lo pasamos a lenguaje url, se crea constante
                // atob, a bytes
                const decodedUrl = atob(decodeURIComponent(encodedUrl));
                // Llenado de la constante data
                const data = await fetchEntityDetails(decodedUrl);
                // Se carga los datos
                setDetails(data);

            }catch (err){
                setError('Error al cargar la data, intente nuevamente.');
                console.error(err);

            }finally{
                // Porque no pudo cargar los datos
                setLoading(false); 
            }
        };
        // Invoca la funcion
        loadDetails(); 
    },[encodedUrl]); // Se ejecuta cada vez que se modifique el componente 

    // Si se presenta error, lo muestra y se devuelve a la pagina anterior 
    if (error){
        return (
            <DetailsContainer>
                <p style={{color:'red', textAlign:'center'}}>{error}</p>
                {/* Si da error debe devolverse a la pagina anterior por eso utiliza navigate */}
                <BackButton onClick={()=> navigate(-1)}>Volver</BackButton>
            </DetailsContainer>
        );
    }
    // Si no hay detalles muestra el mensaje y se devuelve a la pagina anterior
    if (!details){
        return(
             <DetailsContainer>
                <p style={{textAlign:'center'}}>No se encontraron detalles</p>
                <BackButton onClick={()=> navigate(-1)}>Volver</BackButton>
             </DetailsContainer>
        );
    }
    // Se muestra los detalles
    return(
        <DetailsContainer>
            <DetailTitle>{details.name || details.title}</DetailTitle>
            {/* Informacion la muestra como un diccionario */}
            {Object.entries(details).map(([key,value])=>{
                // si es un string y empieza con http devuelve null, 
                // Si array es un arreglo devuelva un null 
                if(typeof value === 'string' && value.startsWith('http')) return null;
                if(Array.isArray(value)) return null;
                return (
                    <DetailItem key={key}>
                        {/* elimine lo que tenga este formato lo pase a espacio en blanco  _ */}
                        <strong>{key.replace(/_/g,' ')}</strong>{value}
                    </DetailItem>
                );
            })}
            <BackButton onClick={()=>navigate(-1)}>Volver</BackButton>
        </DetailsContainer>
    );
};

export default DetailPage;