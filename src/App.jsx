import Sidebar from './views/layouts/Sidebar'
import Navbar from './views/layouts/Navbar'
import { createContext, useState } from 'react'
import Master from './views/sidebar/user/Master';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Role from './views/sidebar/user/Role&Permission';
import Profile from './views/profile/Profile';
import Footer from './views/layouts/Footer';
import CompanyList from './views/sidebar/company/CompanyList';
// import './App.css'

function App() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
     <Router>
     <div className='antialiased bg-gray-50 dark:bg-gray-900'>
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />

      <main>
        <div style={{minHeight: '100vh'}} className='p-4 md:ml-64 h-auto pt-20 overflow-hidden'>
          <Routes>
            <Route path="/user/master" element={<Master />} />
            <Route path='/user/role' element={< Role />} />
            <Route path='/profile' element={< Profile />} />
            <Route path='/company/list' element={< CompanyList />} />
          </Routes>
        </div>
        <div className='md:ml-64 h-auto relative'>
          < Footer />
        </div>
      </main>
      </div>
     </Router>
    </>
  );
}

export default App
