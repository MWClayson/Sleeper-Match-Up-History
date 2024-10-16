import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root.jsx'
import View from './routes/View.jsx'
import Graph from './routes/Graph.jsx'
import App from './App.jsx'
import TopBar from './Components/TopBar.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/view/:leagueGroupId",
    element: <View/>
  },
  {
    path: "/graph",
    element: <Graph/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <RouterProvider router={router}>
      <TopBar/>
    </RouterProvider>
  </StrictMode>,
)
