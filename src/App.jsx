import Sidebar from './views/layouts/Sidebar'
import Navbar from './views/layouts/Navbar'
import { createContext, useState } from 'react'
import Master from './views/dashboard/user/Master';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Role from './views/dashboard/user/Role&Permission';
// import './App.css'

function App() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
     <Router>
     <div className='antialiased bg-gray-50 dark:bg-gray-900'>
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />

      <main className='p-4 md:ml-64 h-screen pt-20'>
        <Routes>
         <Route path="/user/master" element={<Master />} />
         <Route path='/user/role' element={< Role />} />
        </Routes>
      </main>
      </div>
     </Router>
    </>
  );
}

export default App
