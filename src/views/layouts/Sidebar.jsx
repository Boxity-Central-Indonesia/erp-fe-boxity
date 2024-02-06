import React, { useRef } from "react";
import { render } from "react-dom";
import { NavLink } from "react-router-dom";
// import Dashboard from '../sidebar/listMenu/dashboard/Dashboard';

function Sidebar({ isOpen }) {
  const elementDashboardDropdown = useRef(null);
  const elementUserDropdown = useRef(null);
  const elemenOrganizationDropdown = useRef(null);
  const elemenEmployeeDropdown = useRef(null);
  const elementOrdersDropdown = useRef(null);
  const elementInvoicesDropdown = useRef(null);
  const elementPaymentDropdown = useRef(null);
  const elementProductsDropdown = useRef(null);
  const elementInventoryTransactionsDropdown = useRef(null);
  const elementLeadsDropdown = useRef(null);
  const elementProductsProductionDropdown = useRef(null);
  const elementReportsDropdown = useRef(null);
  const elementProducts = useRef(null);
  const elementWarehouses = useRef(null);
  const elementVendors = useRef(null);
  const elementAccount = useRef(null);

  const dropdown = (dropdownRef) => {
    dropdownRef.current.classList.toggle("hidden");
  };

  const renderDropdown = (dropdownRef, label, icon, items) => (
    <li>
      <button
        onClick={() => dropdown(dropdownRef)}
        type="button"
        className="flex items-center primary-color-sidebar-hover w-full p-2 text-base font-medium primary-color-sidebar-hover transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-controls={`dropdown-${label.toLowerCase()}`}
        data-collapse-toggle={`dropdown-${label.toLowerCase()}`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </button>
      <ul
        ref={dropdownRef}
        id={`dropdown-${label.toLowerCase()}`}
        className="hidden py-2 space-y-2"
      >
        {items.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className="flex items-center primary-color-sidebar-hover p-2 text-base primary-color-sidebar-hover transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );

  const renderNestedDropdown = (dropdownRef, label, icon, items) => (
    <li>
      <button
        onClick={() => dropdown(dropdownRef)}
        type="button"
        className="flex items-center primary-color-sidebar-hover w-full p-2 text-base font-medium primary-color-sidebar-hover transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-controls={`dropdown-${label.toLowerCase()}`}
        data-collapse-toggle={`dropdown-${label.toLowerCase()}`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </button>
      <ul
        ref={dropdownRef}
        id={`dropdown-${label.toLowerCase()}`}
        className="hidden pl-10 py-2 space-y-2"
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === "dropdown" ? (
              renderDropdown(item.ref, item.label, item.icon, item.items)
            ) : (
              <NavLink
                to={item.path}
                className="flex items-center primary-color-sidebar-hover p-2 text-base primary-color-sidebar-hover transition duration-75 rounded-lg  group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {item.label}
              </NavLink>
            )}
          </React.Fragment>
        ))}
      </ul>
    </li>
  );

  const userDropdownItems = [
    { path: "/user/master", label: "Master Data" },
    { path: "/user/role", label: "Role & Permission" },
    { path: "/user/test", label: "Test" },
    // ... tambahkan item dropdown lainnya sesuai kebutuhan
  ];

  const organizationDropdownItems = [
    { path: "/company/list", label: "Companies" },
    { path: "/departement/list", label: "Departments" },
    { path: "/branch/list", label: "Branches" },
    { path: "/employes/list", label: "Employes" },
  ];

  const productsItems = [
    { path: "products/list", label: "List" },
    { path: "products/category", label: "Category" },
  ];

  const warehousesItems = [
    { path: "warehouses/list", label: "List" },
    { path: "warehouses/location", label: "Location" },
  ];

  const vendorsItem = [
    { path: "vendors/list", label: "List" },
    { path: "vendors/contacts", label: "Contact" },
    { path: "vendors/transactions", label: "Transaction" },
  ];

  const accountsItem = [
    { path: "accounts/list", label: "List" },
    { path: "accounts/transaction", label: "Transaction" },
    { path: "accounts/balance", label: "Balance" },
  ];

  const ordersDropdownItems = [
    { path: "/orders/list", label: "Orders List" },
    { path: "/orders/role", label: "Orders Status" },
    { path: "/orders/role", label: "Orders Details" },
  ];

  const invoicesDropdownItems = [
    { path: "/invoices/list", label: "Invoices List" },
    { path: "/invoices/status", label: "Invoices Status" },
    { path: "/invoices/detail", label: "Invoices Details" },
  ];

  const paymentsDropdownItems = [
    { path: "/payments/list", label: "Payments List" },
    { path: "/payments/status", label: "Payments Status" },
    { path: "/payments/detail", label: "Payments Details" },
  ];

  const inventoryTransactionsDropdownItems = [
    { path: "/inventory/list", label: "Inventory Changes List" },
    { path: "/inventory/kind", label: "Inventory Changes Type" },
    { path: "/inventory/amount", label: "Inventory Changes Amount" },
  ];

  const leadsDropdownItems = [
    { path: "/leads/list", label: "Leads List" },
    { path: "/leads/name", label: "Leads Name" },
    { path: "/leads/email", label: "Leads Email" },
    { path: "/leads/number-phone", label: "Leads Phone Number" },
  ];

  const productsProductionDropdownItems = [
    { path: "/products/production", label: "Products Production" },
    { path: "/products/production/process", label: "Production Process" },
    { path: "/products/production/raw-material", label: "Raw Material" },
    { path: "/products/production/labor", label: "Labor" },
  ];

  const reportsDropdownItems = [
    { path: "/reports/sales", label: "Sales Report" },
    { path: "/reports/purchases", label: "Purchase Report" },
    { path: "/reports/income", label: "Revenue Report" },
    { path: "/reports/expenditure", label: "Expenses Report" },
    { path: "/reports/inventory", label: "Inventory Report" },
    { path: "/reports/leads", label: "Leads Report" },
    { path: "/reports/vendor-transactions", label: "Vendor Report" },
    { path: "/reports/balance-sheet", label: "Balance Sheet Report" },
    { path: "/reports/debt", label: "Payables Report" },
    { path: "/reports/accounts-receivable", label: "Receivables Report" },
    { path: "/reports/cash-flow", label: "Cash Flow Report" },
    { path: "/reports/ledger", label: "Ledger Report" },
    { path: "/reports/cash-account", label: "Cash Ledger Report" },
    { path: "/reports/production", label: "Production Report" },
  ];

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <p className="mb-3 font-semibold dark:text-white">Main</p>
        <ul className="space-y-2">
          {
            <li>
              <button
                type="button"
                className="flex items-center primary-color-sidebar-hover w-full p-2 text-base font-medium primary-color-sidebar-hover transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.1 4H5c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm-10 10H5c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Z"
                    />
                  </svg>
                }
                <NavLink to={"/"} className="ml-3">
                  Dashboard
                </NavLink>
              </button>
            </li>
          }
          {renderDropdown(
            elementUserDropdown,
            "User",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M16 19h4c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-2m-2.2-4A3 3 0 0 0 19 8a3 3 0 0 0-5.2-2M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>,
            userDropdownItems
          )}
          {renderNestedDropdown(
            elemenOrganizationDropdown,
            "Organization",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>,
            organizationDropdownItems
          )}
          {renderDropdown(
            elementProducts,
            "Products",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 6.2 7 9.4l5 3.2-5 3.2-5-3.3 5-3.1-5-3.2L7 3l5 3.2ZM7 17.8l5-3.2 5 3.2-5 3.2-5-3.2Z" />
              <path d="m12 12.5 5-3.1-5-3.2L17 3l5 3.2-5 3.2 5 3.2-5 3.2-5-3.3Z" />
            </svg>,

            productsItems
          )}
          {renderDropdown(
            elementWarehouses,
            "Warehouses",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
              />
            </svg>,
            warehousesItems
          )}
          {renderDropdown(
            elementVendors,
            "Vendors",
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>,
            vendorsItem
          )}
          {renderDropdown(
            elementAccount,
            "Accounts",
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z"
              />
            </svg>,
            accountsItem
          )}
          {renderNestedDropdown(
            elementOrdersDropdown,
            "Orders",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 4h3c.6 0 1 .4 1 1v15c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V5c0-.6.4-1 1-1h3m0 3h6m-3 5h3m-6 0h0m3 4h3m-6 0h0m1-13v4h4V3h-4Z"
              />
            </svg>,
            ordersDropdownItems
          )}

          {renderDropdown(
            elementInvoicesDropdown,
            "Invoices",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 3v4c0 .6-.4 1-1 1H5m8-2h3m-3 3h3m-4 3v6m4-3H8M19 4v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1ZM8 12v6h8v-6H8Z"
              />
            </svg>,
            invoicesDropdownItems
          )}
          {renderDropdown(
            elementPaymentDropdown,
            "Payments",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M6 14h2m3 0h5M3 7v10c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1Z"
              />
            </svg>,
            paymentsDropdownItems
          )}
          {renderDropdown(
            elementInventoryTransactionsDropdown,
            "Inventory Transactions",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 13h3.4a1 1 0 0 1 1 .6 4 4 0 0 0 7.3 0 1 1 0 0 1 .9-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"
              />
            </svg>,
            inventoryTransactionsDropdownItems
          )}
          {renderDropdown(
            elementLeadsDropdown,
            "Leads",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5.4V3m0 2.4a5.3 5.3 0 0 1 5.1 5.3v1.8c0 2.4 1.9 3 1.9 4.2 0 .6 0 1.3-.5 1.3h-13c-.5 0-.5-.7-.5-1.3 0-1.2 1.9-1.8 1.9-4.2v-1.8A5.3 5.3 0 0 1 12 5.4ZM8.7 18c.1.9.3 1.5 1 2.1a3.5 3.5 0 0 0 4.6 0c.7-.6 1.3-1.2 1.4-2.1h-7Z"
              />
            </svg>,
            leadsDropdownItems
          )}
          {renderDropdown(
            elementProductsProductionDropdown,
            "Products Production",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>,
            productsProductionDropdownItems
          )}
          {renderDropdown(
            elementReportsDropdown,
            "Reports",
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 5V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-5M9 3v4c0 .6-.4 1-1 1H4m11.4.8 2.7 2.7m1.2-3.9a2 2 0 0 1 0 3l-6.6 6.6L9 18l.7-3.7 6.7-6.7a2 2 0 0 1 3 0Z"
              />
            </svg>,
            reportsDropdownItems
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
