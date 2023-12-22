import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/Nav';
import Categories from './components/Categories';
import About from './components/About';
import { Container, Row, Col } from 'react-bootstrap'; 

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  return (
    <ApolloProvider client={client}>
      <div>
        <Nav />
        <Container className ='content'>
          <Row>
            {isHomepage && <About />} 
          </Row>
          <Row>
            <Col lg={2} md={3} className='categories d-none d-md-block'>
              <Categories />
            </Col>
            <Col lg={10} md={9} sm={12} className='main'>
              <Outlet />
            </Col>
            <Col>
            </Col>
          </Row>
        </Container>
      </div>
    </ApolloProvider>
  );
}


export default App;
