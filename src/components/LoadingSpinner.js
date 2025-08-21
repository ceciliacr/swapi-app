import React from "react";

// Llamamos la libreria styled
// Desde el navegador Documentation react styled components Keyframes
import styled, {keyframes} from "styled-components";

// importa los colores definidos en variables
import { colors } from "../styles/variables";

// Se realiza que gira
const spin = keyframes`
    0% { transform: rotate(0deg):}
    100% { transform: rotate(360deg)}
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
`;

// Invoca de variable colors
const Spinner = styled.div`
    border: 8px solid ${colors.border};
    border-top: 8px solid ${colors.border};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spin} 1.2s linear infinite;
`;
// Se arma el componente
const LoadingSpinner = () =>{
    return (
        <SpinnerContainer>
            <Spinner />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;