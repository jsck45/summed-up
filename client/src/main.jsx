import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import Homepage from './pages/Home';
import PostDetail from './pages/PostDetail.jsx';
import Profile from './pages/Profile.jsx';
import Category from './pages/Category.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
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
