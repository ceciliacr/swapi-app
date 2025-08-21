import React from 'react';

import styled from 'styled-components';
import { colors, fonts } from '../styles/variables';
import { Link } from 'react-router-dom';

// Define los componentes  Encabezado
const AppHeader = styled.header`
	background-color: ${colors.tertiary};
	padding: 20px;
	text-align: center;
	border-bottom: 2px solid ${colors.primary};
`;
// Define el Titulo
// font-familiy evalue si existe el valor de letras starwars sino utilice la  otra fuente
const Title = styled(Link)`
	color: ${colors.primary};
	font-size: 3em;
	text-decoration: none;
	font-family: ${fonts.starwars ? fonts.starwars : 'Impact, sans-serif'};
	text-shadow: 0 0 10px ${colors.primary};
	transition: transform 0.2s ease-in-out;

    &:hover {
		transform: scale(1.02);
    }
`;

// Se arma 	
const Header = () => {
   return (
	<AppHeader>
		<Title>		 			 
			<Link to="/">Star Wars Explorer</Link>
		</Title>
		
	</AppHeader>
    );
};

export default Header;