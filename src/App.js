import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';

//Define un componente
const MainCointent = styled.main`
  flex-grow: 1;
  padding: 20px
`;
// Router permite navegar entre todos
// Routes navegar entre las pagina de la aplicacion
// Route  Indica cada pagina la pagina principal y el detalle type encodeurl 
// indica path y element  ( son los componentes)       

function App() {
  return (
    <Router>
        <GlobalStyles/>
        <Header/>
        <MainCointent>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/:type/:encodedUrl' element={<DetailPage/>}/>
            </Routes>
        </MainCointent>
    </Router>
  );
}

export default App;
