
import styled from 'styled-components';

const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
background-color: #CCCCCC;
`;

const Content = styled.div`
display: grid;
grid-template-columns: 0.2fr auto 0.2fr;
width: 100%;
background-color: #FAF;
`;

const LeftSide = styled.div`
background-color: #9DD;
`;

const Container = styled.div`
max-width: 500px;
background-color: #FFFFFF;
`;

const RightSide = styled.div`
background-color: #DD9;
`;

const Header = styled.header`
display: flex;
flex-direction: row;
justify-content: center;
font-size: 1.6em;
font-weight: bold;
padding: 10px;
background-color: green;
`;

const Footer = styled.footer`
height: 50px;
padding: 10px;
background-color: blue;
`;

const Box = styled.div`
margin: 20px 0;
height: 150px;
background-color: #4f4;
`;

export {
  Main,
  Header,
  Content,
  LeftSide,
  Container,
  RightSide,
  Footer,
  Box,
};