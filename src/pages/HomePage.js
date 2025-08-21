// Se arma la pagina principal 
import React,{useState, useEffect} from "react";
import styled from "styled-components";

// Invoca una función del swapi 
import { fetchEntities } from "../services/swapi";
import Card from '../components/Card';
import LoadingSpinner from "../components/LoadingSpinner";
import { colors } from "../styles/variables";

// Define el componente
const HomePageContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

// Define el componente Title
const SectionTitle = styled.h2`
    color: ${colors.primary};
    font-size: 2.5em;
    margin-bottom: 30px;
`;

// Define el componente container del button
const ButtonContainer = styled.div`
    margin-bottom: 40px;
`;
// Define el componente de button para seleccionar
// background-color  Se pasa como un props si esta activo toma el color primario sino secondario
const SelectionButton = styled.button`   
    background-color:${props => props.$active ? colors.primary : colors.secondary};
    color: ${props => props.$active ? colors.tertiary : colors.text};
    border: 2px solid ${colors.primary};
    padding: 15px 30px;
    margin: 0 15px;
    font-size: 1.2em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    
    &:hover {
       background-color: ${props => props.$active ? colors.primary : colors.border};
       color: ${props => props.$active ? colors.tertiary : colors.text};
    }
`;

// Define componente Distribuccion de las cars
// Para acomodar el texto,  selecciona format seleccion  se da aceptar al mensaje
const CarsdGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;
// Variables de estado lo que vamos a Tuipo que va a seleccionar, 
//  la entidad se traslada como una lista
const HomePage = ()=>{
    const [selectedType, setSelectedType] = useState(null);
    const [entities, setEntities] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(()=>{
        // Si no selecionamos ninguno salgo
        if (!selectedType) return;

        const loadEntities = async()=>{
            setLoading(true);
            setError(null);
            try{
                const data = await fetchEntities(selectedType);
                setEntities(data.results);
            }catch (err){
                setError('Error al cargar la informacion, intente nuevamente');
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        loadEntities();
    },[selectedType]);

    // Funcion para obtener el detalle de la card 
    const getCardDetails = (entity, type)=>{
        //  Obtengo la información para personas, en forma de un diccionario
        if (type === 'people'){
            return {
                'Genero': entity.gender,
                'Estatura': entity.height,
                'Peso': entity.mass,
            };

		//  Obtengo la información para planetas, en forma de un diccionario
        } else if (type === 'planets'){ 
            return {
                'Clima': entity.climate,
                'Terreno': entity.terrain,
                'Poblacion': entity.population,
            };

        //  Obtengo la información para Especie, en forma de un diccionario    
        } else if ( type === 'species'){ 
            return {
                'Nombre': entity.name,
                'Clasificación' : entity.classification,
                'Idioma': entity.language,
            };

        //  Obtengo la información para Vehiculos, en forma de un diccionario       
        }else if ( type === 'vehicles'){ 
            return {
                'Nombre': entity.name,
                'Modelo' : entity.model,
                'Fabricante': entity.manufacturer,
            };
        }
        return {};
    };
    // Se arma 
    return (
        <HomePageContainer>
            <SectionTitle>Elige tu camino en la Galaxia</SectionTitle>
                <ButtonContainer>
                    <SelectionButton
                        $active={selectedType === 'people'}
                        onClick={()=> setSelectedType('people')}>
                            Personajes
                    </SelectionButton>
                    <SelectionButton  
                        $active={selectedType === 'planets'}
                        onClick={()=> setSelectedType('planets')}>
                            Planetas
                    </SelectionButton>
                     <SelectionButton 
                        $active={selectedType === 'species'}
                        onClick={()=> setSelectedType('species')}>
                            Especies
                    </SelectionButton>
                     <SelectionButton 
                        $active={selectedType === 'vehicles'}
                        onClick={()=>setSelectedType('vehicles')}>
                            Vehiculos
                    </SelectionButton>
                </ButtonContainer>
                {loading && <LoadingSpinner/>}
                {error && <p style={{color: 'red'}}>{error}</p>}
                
                {!loading && !error && selectedType && (
                    <CarsdGrid>
                        {entities.map((entity)=>(
                            <Card
                                key={entity.url}
                                name={entity.name}
                                type={selectedType}
                                details={getCardDetails(entity,selectedType)}
                                url={entity.url}
                            />
                        ))}
                    </CarsdGrid>
                )}
        </HomePageContainer>
    );
};

export default HomePage;
