import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Users from './pages/Users';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import Layout from './pages/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<SignIn />} />
        
        
        <Route path="/" element={ <ProtectedRoute> <Layout> <Dashboard /></Layout> </ProtectedRoute>}/>
        <Route path="/users" element={ <ProtectedRoute><Layout>  <Users />  </Layout>  </ProtectedRoute>} />
        <Route path="/inventory"  element={ <ProtectedRoute> <Layout>  <Inventory />  </Layout> </ProtectedRoute> }  />
        <Route path="/orders"  element={ <ProtectedRoute> <Layout>    <Orders />  </Layout> </ProtectedRoute> }/>
        <Route path="/settings"  element={ <ProtectedRoute> <Layout>  <Settings />  </Layout> </ProtectedRoute> }/> </Routes>
    </BrowserRouter>
  );
}

export default App;
