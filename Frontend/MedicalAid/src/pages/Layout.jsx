import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex mt-6">
        
        <div className="w-1/5"><Sidebar /></div>
        
        <div className="w-4/5 bg-white">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
