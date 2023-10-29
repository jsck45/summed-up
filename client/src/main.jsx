import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import Homepage from './pages/Home';
import PostDetail from './pages/PostDetail.jsx';
import Profile from './pages/Profile.jsx';
import Category from './pages/Category.jsx';
import LandingPage from './pages/LandingPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index:true,
        element: <LandingPage />
      },
      {
        path: '/home',
        element: <Homepage />,
      },
      {
        path: 'posts/:postId',
        element: <PostDetail />, 
      },
      {
        path: 'category/:categoryName',
        element: <Category />,
      },
      {
        path: 'me',
        element: <Profile />, 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
