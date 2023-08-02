
import './Adminpanel/assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './Adminpanel/scss/App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Account } from "./pages/account/Account";
import { Login } from "./components/Login/index";
import { MainLayout } from "./Adminpanel/layout/MainLayout";
import Blank from './Adminpanel/pages/Blank'
import OrderPage from './Adminpanel/pages/order'
import AdminproductPage from './Adminpanel/pages/product'
import AdminUserPage from './Adminpanel/pages/user'
import EditProductPage from './Adminpanel/pages/editproduct'
import CreateProductForm from './Adminpanel/pages/addproduct'
import AdminContactPage from './Adminpanel/pages/contact'
import Dashboard from './Adminpanel/pages/Dashboard'
import { Signup } from "./components/Singup/index";
import { Product } from "./components/product/Product";
import { ProductDetailPage } from "./components/product/ProductDetailPage";
import { Home } from "./pages/home/Home";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import ConditionalHeader from "./header"; 
import Protected from "./Routes/protected"
import AdminProtected from "./Routes/adminprotected"

const App = () => {
  const cartItems = useSelector((state) => state.cart.itemsList);
  console.log(cartItems);


  return (
    <Router>
     <ConditionalHeader /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={ <Protected Component={Account}/>} />
       
        <Route path="/Product" element={<Product />} />
        <Route path="/productDetail/:id" element={<ProductDetailPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        <Route path="/AdminPanel" element={<AdminProtected Component={MainLayout}/>}>
          <Route index element={<AdminProtected Component={Dashboard}/> } />
          <Route path="orders" element={<OrderPage />} />
          <Route path="products" element={<AdminproductPage />} />
          <Route path="EditProductPage" element={ <AdminProtected Component={EditProductPage}/>} />
          <Route path="CreateProductForm" element={ <AdminProtected Component={CreateProductForm}/>}  />
          <Route path="customers" element={<AdminProtected Component={AdminUserPage}/>} />
          <Route path="settings" element={<AdminProtected Component={Blank}/>} />
          <Route path="stats" element={<AdminProtected Component={AdminContactPage}/>} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
