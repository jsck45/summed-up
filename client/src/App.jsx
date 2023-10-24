import './App.css';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import { Container, Row, Col } from 'react-bootstrap'; 
import PostForm from './components/PostForm';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Container>
        <Row>
          <Col lg={3} md={3} className='categories d-none d-md-block'>
            <Categories /> 
          </Col>
          <Col lg={9} md={9} sm={12} className='main'>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

export default App;
