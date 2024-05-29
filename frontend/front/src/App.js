import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Nav/navbar';
import SignIn from './components/Signin/signin';
import SignUp from './components/SignUp/signup';
import Container from '@mui/material/Container';
import Dashboard from './components/Dashboard/Dashboard';
import AddProduct from './components/AddProduct/AddProduct';
import Cart from './components/Cart/Cart';
import { isAdmin, isLoggedIn } from './components/services/AuthService';
import EditProduct from './components/EditProduct/EditProduct';

function ProtectRoute({children}){
  const auth=isLoggedIn();
  return auth?children: <Navigate to="/" />
}

function AdminProtectRoute({children}){
  const auth=isLoggedIn();
  const adminAuth=isAdmin();
  return auth && adminAuth ?children: <Navigate to="/dashboard" />
}


function App() {
  return (

    <main>
      <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path = '/' element={<SignIn/>} />
          <Route path = 'signup' element={<SignUp/>} />
          <Route path = 'dashboard' element={
          <ProtectRoute> <Dashboard/> </ProtectRoute>} />
          <Route path = 'cart' element={
           <ProtectRoute> <Cart /> </ProtectRoute>}/>
          <Route path = 'addproduct' element={
          <AdminProtectRoute> <AddProduct />  </AdminProtectRoute>} />
          <Route path = 'editproduct/:id' element={
          <AdminProtectRoute> <EditProduct />  </AdminProtectRoute>} />
        </Routes>

      </Container>
      </Router>
    </main>
    
  );
}

export default App;
