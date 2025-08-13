import React from "react";

// Llamamos la libreria styled
import styled, {keyframes} from "styled-components";

// importa los colores definidos en variables
import { colors } from "../styles/variables";

const spin = keyframes `
    0% {transform: rotate (0deg):}
    100% {transform: rotate (360deg)}

`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
`;

const Spinner = styled.div`
    border : 8px solid ${colors.border};
    border-top : 8px solid ${colors.borderprimary};
    border-radius: 50%;
    width: 60px;
    heigth: 60px;
    animation: ${spin} 1.2s linear infinite;
`;

const LoadingSpinner = ()=> {
    return (
        <SpinnerContainer>
            <Spinner/>
        </SpinnerContainer>
    );
};

export default LoadingSpinner;