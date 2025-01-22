import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Users from './pages/Users';
import Settings from './pages/Settings';
import InventoryManager from './pages/InventoryManager/InvontoryManager';
import InventoryDashboard from './pages/InventoryManager/InventoryDashboard';
import editInventory from './pages/InventoryManager/editInventory';
import ClientOrders from './pages/Client/ClientOrders';
import Products from './pages/Client/Products';
import SignIn from './pages/SignIn';
import Layout from './pages/Layout';
import AddUser from './components/AddUser';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';


function App() {
  const {user} = useSelector((state) => state.auth);
  
  const AdminRoutes = (
    <>
      <Route path="/" element={ <ProtectedRoute allowedRoles={['admin']}> <Layout> <Dashboard /></Layout> </ProtectedRoute>}/>
       
       <Route path="/users" element={ <ProtectedRoute allowedRoles={['admin']}><Layout>  <Users />  </Layout>  </ProtectedRoute>} />
       <Route path="/inventory"  element={ <ProtectedRoute allowedRoles={['admin']}> <Layout>  <Inventory />  </Layout> </ProtectedRoute> }  />
       <Route path="/orders"  element={ <ProtectedRoute allowedRoles={['admin']}> <Layout>    <Orders />  </Layout> </ProtectedRoute> }/>
       <Route path="/settings"  element={ <ProtectedRoute allowedRoles={['admin']}> <Layout>  <Settings />  </Layout> </ProtectedRoute> }/> 
       <Route path="/form"  element={ <ProtectedRoute allowedRoles={['admin']}> <Layout>  <AddUser/>  </Layout> </ProtectedRoute> }/> 
    
    
    </>
  )

  const clientRoutes = (
    <>
      <Route path="/" element={ <ProtectedRoute allowedRoles={['client']}> <Layout> <Products /></Layout> </ProtectedRoute>}/>
       
       <Route path="/clientOrder" element={ <ProtectedRoute allowedRoles={['client']}><Layout>  <ClientOrders />  </Layout>  </ProtectedRoute>} />
    
    </>
  )

const userRoutes = (
  <>
  <Route path="/" element={ <ProtectedRoute allowedRoles={['user']}> <Layout> <InventoryDashboard /></Layout> </ProtectedRoute>}/>
       
  <Route path="/invetoryManager" element={ <ProtectedRoute allowedRoles={['user']}><Layout>  <InventoryManager/>  </Layout>  </ProtectedRoute>} />
  <Route path="/editinventory"  element={ <ProtectedRoute allowedRoles={['user']}> <Layout>  <editInventory/>  </Layout> </ProtectedRoute> }  />  
  
  </>
)

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<SignIn />} />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        
        {user?.role === 'admin' && AdminRoutes}
        {user?.role === 'user' && userRoutes}
        {user?.role === 'client' && clientRoutes}
    
        
        
        </Routes>
    
    
    
    </BrowserRouter>
  );
}

export default App;
