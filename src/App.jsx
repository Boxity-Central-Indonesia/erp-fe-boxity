import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './views/layouts/Sidebar';
import Navbar from './views/layouts/Navbar';
import Master from './views/sidebar/listMenu/user/Master';
import Role from './views/sidebar/listMenu/user/Role&Permission';
import Profile from './views/profile/Profile';
import Footer from './views/layouts/Footer';
import CompanyList from './views/sidebar/listMenu/company/CompanyList';
import Login from './views/autentikasi/Login';
import Register from './views/autentikasi/Register';
import Auth from './function/Auth';
import Dashboard from './views/sidebar/listMenu/dashboard/Dashboard';
import Cookies from 'js-cookie';
import Departement from './views/sidebar/listMenu/company/DepartementList';
import EmployesList from './views/sidebar/listMenu/company/employees/EmployesList';
import BranchList from './views/sidebar/listMenu/company/BranchList';
import Products from './views/sidebar/listMenu/products/Products';
import { Category } from './views/sidebar/listMenu/products/Category/Category';
import { Warehouses } from './views/sidebar/listMenu/warehouses/Warehouses';
import { ColorProvider } from './views/conifg/GlobalColour';
import { WarehousesLocation } from './views/sidebar/listMenu/warehouses/locations/WarehousesLocation';


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [auth, setAuth] = useState(!!Cookies.get('token'));

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Logic to handle changes in the auth state (if needed)
    console.log("Auth state changed:", auth);
  }, [auth]); // Effect runs when auth state changes


  return (
    <>
     < ColorProvider >
        <Router>
        <div className='antialiased bg-gray-50 dark:bg-gray-900'>
          <Auth.AuthenticatedComponent>
              <Navbar onToggleSidebar={toggleSidebar} setAuth={setAuth}/>
              <Sidebar isOpen={isSidebarOpen} />
          </Auth.AuthenticatedComponent>

          <main>
            <div style={{minHeight: '100vh'}} className={`p-4 ${auth ? `md:ml-64 pt-20` : `ml-0`} h-auto overflow-hidden`}>
            <Routes>
                <Route
                  path="/"
                  element={
                    <Auth.ProtectedRoute>
                      <Dashboard />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/user/master"
                  element={
                    <Auth.ProtectedRoute>
                      <Master />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/user/role"
                  element={
                    <Auth.ProtectedRoute>
                      <Role />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Auth.ProtectedRoute>
                      <Profile />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/company/list"
                  element={
                    <Auth.ProtectedRoute>
                      <CompanyList />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/departement/list"
                  element={
                    <Auth.ProtectedRoute>
                      <Departement />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/employes/list"
                  element={
                    <Auth.ProtectedRoute>
                      <EmployesList />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/branch/list"
                  element={
                    <Auth.ProtectedRoute>
                      <BranchList />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="products/list"
                  element={
                    <Auth.ProtectedRoute>
                      <Products />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="products/category"
                  element={
                    <Auth.ProtectedRoute>
                      <Category />
                    </Auth.ProtectedRoute>
                  }
                />
                 <Route
                  path="warehouses/list"
                  element={
                    <Auth.ProtectedRoute>
                      <Warehouses />
                    </Auth.ProtectedRoute>
                  }
                />
                 <Route
                  path="warehouses/location"
                  element={
                    <Auth.ProtectedRoute>
                      <WarehousesLocation />
                    </Auth.ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Auth.UnprotectedRoute>
                      <Login setAuth={setAuth}/>
                    </Auth.UnprotectedRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Auth.UnprotectedRoute>
                      <Register setAuth={setAuth}/>
                    </Auth.UnprotectedRoute>
                  }
                />
              </Routes>
            </div>
            <div className='md:ml-64 h-auto relative'>
              <Auth.AuthenticatedComponent>
                  < Footer />
              </Auth.AuthenticatedComponent>
            </div>
          </main>
          </div>
        </Router>
     </ColorProvider>
    </>
  );
}

export default App
