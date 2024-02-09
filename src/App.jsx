import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./views/layouts/Sidebar";
import Navbar from "./views/layouts/Navbar";
import Master from "./views/sidebar/listMenu/user/Master";
import Profile from "./views/profile/Profile";
import Footer from "./views/layouts/Footer";
import CompanyList from "./views/sidebar/listMenu/company/CompanyList";
import Login from "./views/autentikasi/Login";
import Register from "./views/autentikasi/Register";
import Auth from "./function/Auth";
import Dashboard from "./views/sidebar/listMenu/dashboard/Dashboard";
import Cookies from "js-cookie";
import Departement from "./views/sidebar/listMenu/company/DepartementList";
import BranchList from "./views/sidebar/listMenu/company/BranchList";
import { EmployesList } from "./views/sidebar/listMenu/company/employees/EmployeesList";
import Products from "./views/sidebar/listMenu/products/Products";
import { Category } from "./views/sidebar/listMenu/products/Category/Category";
import { Warehouses } from "./views/sidebar/listMenu/warehouses/Warehouses";
import { ColorProvider } from "./views/conifg/GlobalColour";
import { WarehousesLocation } from "./views/sidebar/listMenu/warehouses/locations/WarehousesLocation";
import { VendorsList } from "./views/sidebar/listMenu/vendors/list/List";
import { VendorContacts } from "./views/sidebar/listMenu/vendors/contact/contact";
import { VendorTransactions } from "./views/sidebar/listMenu/vendors/transaction/Transactions";
import RoleAndPermission from "./views/sidebar/listMenu/user/Role&Permission";
import { Account } from "./views/sidebar/listMenu/account/list/Account";
import { Test } from "./views/sidebar/listMenu/user/test";
import { AccountTransaction } from "./views/sidebar/listMenu/account/transaction/AccountTransactions";
import { Penjualan } from "./views/sidebar/listMenu/reports/penjualan/Penjualan";
import { Pembelian } from "./views/sidebar/listMenu/reports/pembelian/Pembelian";
import { ArusKas } from "./views/sidebar/listMenu/reports/arusKas/ArusKas";
import { BukuBesar } from "./views/sidebar/listMenu/reports/bukuBesar/BukuBesar";
import { Hutang } from "./views/sidebar/listMenu/reports/hutang/Hutang";
import { KasBesar } from "./views/sidebar/listMenu/reports/kasBesar/KasBesar";
import { LeadsProspek } from "./views/sidebar/listMenu/reports/leadsProspek/LeadsProspek";
import { Neraca } from "./views/sidebar/listMenu/reports/neraca/Neraca";
import { Pendapatan } from "./views/sidebar/listMenu/reports/pendapatan/Pendapatan";
import { Pengeluaran } from "./views/sidebar/listMenu/reports/pengeluaran/Pengeluaran";
import { PersediaanBarang } from "./views/sidebar/listMenu/reports/persediaanBarang/PersediaanBarang";
import { Piutang } from "./views/sidebar/listMenu/reports/piutang/Piutang";
import { Produksi } from "./views/sidebar/listMenu/reports/produksi/Produksi";
import { VendorTransaction } from "./views/sidebar/listMenu/reports/vendorTransaction/VendorTransaction";
import { OrderList } from "./views/sidebar/listMenu/order/list/OrderList";
import { InvoicesList } from "./views/sidebar/listMenu/invoices/Invoices";
import { Payments } from "./views/sidebar/listMenu/payments/Payments";
import { LeadsProspekList } from "./views/sidebar/listMenu/leadsProspek/LeadsProspek";
import { ProccesActifity } from "./views/sidebar/listMenu/Products production/ProccesActivity/ProccesActifity";
import { PackagesData } from "./views/sidebar/listMenu/Products production/PackagesData/PackagesData";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [auth, setAuth] = useState(!!Cookies.get("token"));

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Logic to handle changes in the auth state (if needed)
    console.log("Auth state changed:", auth);
  }, [auth]); // Effect runs when auth state changes

  return (
    <>
      <ColorProvider>
        <Router>
          <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <Auth.AuthenticatedComponent>
              <Navbar onToggleSidebar={toggleSidebar} setAuth={setAuth} />
              <Sidebar isOpen={isSidebarOpen} />
            </Auth.AuthenticatedComponent>

            <main>
              <div
                style={{ minHeight: "100vh" }}
                className={`p-4 ${
                  auth ? `md:ml-64 pt-20` : `ml-0`
                } h-auto overflow-hidden`}
              >
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
                        <RoleAndPermission />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user/test"
                    element={
                      <Auth.ProtectedRoute>
                        <Test />
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
                    path="/employees/list"
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
                    path="vendors/list"
                    element={
                      <Auth.ProtectedRoute>
                        <VendorsList />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="vendors/contacts"
                    element={
                      <Auth.ProtectedRoute>
                        <VendorContacts />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="vendors/transactions"
                    element={
                      <Auth.ProtectedRoute>
                        <VendorTransactions />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="accounts/list"
                    element={
                      <Auth.ProtectedRoute>
                        <Account />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="accounts/transaction"
                    element={
                      <Auth.ProtectedRoute>
                        <AccountTransaction />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="orders/list"
                    element={
                      <Auth.ProtectedRoute>
                        <OrderList />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="invoices/list"
                    element={
                      <Auth.ProtectedRoute>
                        <InvoicesList />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="payments/list"
                    element={
                      <Auth.ProtectedRoute>
                        <Payments />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="leads/list"
                    element={
                      <Auth.ProtectedRoute>
                        <LeadsProspekList />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="products-production/proses-activity"
                    element={
                      <Auth.ProtectedRoute>
                        <ProccesActifity />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="products-production/packages-data"
                    element={
                      <Auth.ProtectedRoute>
                        <PackagesData />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/sales"
                    element={
                      <Auth.ProtectedRoute>
                        <Penjualan />
                      </Auth.ProtectedRoute>
                    }
                  />

                  <Route
                    path="/reports/purchases"
                    element={
                      <Auth.ProtectedRoute>
                        <Pembelian />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/income"
                    element={
                      <Auth.ProtectedRoute>
                        <Pendapatan />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/expenditure"
                    element={
                      <Auth.ProtectedRoute>
                        <Pengeluaran />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/inventory"
                    element={
                      <Auth.ProtectedRoute>
                        <PersediaanBarang />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/leads"
                    element={
                      <Auth.ProtectedRoute>
                        <LeadsProspek />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/production"
                    element={
                      <Auth.ProtectedRoute>
                        <Produksi />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/vendor-transactions"
                    element={
                      <Auth.ProtectedRoute>
                        <VendorTransaction />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/cash-flow"
                    element={
                      <Auth.ProtectedRoute>
                        <ArusKas />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/ledger"
                    element={
                      <Auth.ProtectedRoute>
                        <BukuBesar />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/debt"
                    element={
                      <Auth.ProtectedRoute>
                        <Hutang />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/cash-account"
                    element={
                      <Auth.ProtectedRoute>
                        <KasBesar />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/balance-sheet"
                    element={
                      <Auth.ProtectedRoute>
                        <Neraca />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports/accounts-receivable"
                    element={
                      <Auth.ProtectedRoute>
                        <Piutang />
                      </Auth.ProtectedRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Auth.UnprotectedRoute>
                        <Login setAuth={setAuth} />
                      </Auth.UnprotectedRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <Auth.UnprotectedRoute>
                        <Register setAuth={setAuth} />
                      </Auth.UnprotectedRoute>
                    }
                  />
                </Routes>
              </div>
              <div className="md:ml-64 h-auto relative">
                <Auth.AuthenticatedComponent>
                  <Footer />
                </Auth.AuthenticatedComponent>
              </div>
            </main>
          </div>
        </Router>
      </ColorProvider>
    </>
  );
}

export default App;
