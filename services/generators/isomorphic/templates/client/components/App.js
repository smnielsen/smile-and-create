import React from 'react';
import {
  Main,
  Header,
  Content,
  LeftSide,
  Container,
  RightSide,
  Footer,
  Box,
} from './App.styled';
import './App.css';
import logger from '../../lib/logger';

const debug = logger('App');

debug('Holidays app running');
const App = () => (
  <Main>
    <Header>Holidayssss</Header>
    <Content>
      <LeftSide />
      <Container >
        <Box />
        <Box />
        <Box />
      </Container>
      <RightSide />
    </Content>
    <Footer />
  </Main>
);

export default App;