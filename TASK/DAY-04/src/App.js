import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import productList from './pages/productList';

function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
      
           <Route path='/login' Component={Login} />
            <Route path='/register' Component={Register} />
             <Route path='/product-list' Component={productList} />
              <Route path='/' Component={Login} />
        
        </Routes>
        
        </BrowserRouter>
  </>
  );
}

export default App;
