import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  // State for controlling the expansion of dropdown menus
  const [expandedMenus, setExpandedMenus] = useState({});

  // Toggle dropdown menu visibility
  const toggleDropdown = (menuKey) => {
    setExpandedMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  // Define sidebar menu structure
  const menuItems = [
    {
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#adb4d2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      path: "/",
    },
    {
      label: "Master",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#adb4d2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
      ),
      subMenu: [
        { path: "/user/master", label: "Users" },
        { path: "/company/list", label: "Companies" },
        { path: "/departement/list", label: "Departments" },
        { path: "/branch/list", label: "Branches" },
        { path: "/employees/list", label: "Employees" },
        { path: "/leads/list", label: "Leads Prospect" },
        { label: "Role & Permission", path: "/user/role" },
        { label: "Test", path: "/user/test" },
      ],
    },
    {
      label: "Accounting",
      icon: (
        <svg
          className="w-[15px] h-[15px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#adb4d2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13c-2.8-.8-4.7-1-8-1a1 1 0 0 0-1 1v11c0 .6.5 1 1 1 3.2 0 5 .2 8 1m0-13c2.8-.8 4.7-1 8-1 .6 0 1 .5 1 1v11c0 .6-.5 1-1 1-3.2 0-5 .2-8 1"
          />
        </svg>
      ),
      subMenu: [
        { path: "accounts/list", label: "Accounting Data" },
        { path: "accounts/transaction", label: "Account Transaction" },
      ],
    },
    {
      label: "Warehouses",
      icon: (
        <svg
          className="w-[15px] h-[15px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#adb4d2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
          />
        </svg>
      ),
      subMenu: [
        { path: "warehouses/list", label: "Warehouse" },
        { path: "products/list", label: "Product" },
        { path: "vendors", label: "Vendor" },
      ],
    },
    {
      label: "Transactions",
      icon: (
        <svg
          className="w-[15px] h-[15px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#adb4d2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3"
          />
        </svg>
      ),
      subMenu: [
        { path: "/transactions", label: "Transactions" },
        // { path: "/invoices/list", label: "Invoices" },
        // { path: "/payments/list", label: "Payments" },
      ],
    },
    {
      label: "Manufacturer",
      icon: (
        <svg
          className="w-[15px] h-[15px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#adb4d2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 12v4m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          />
        </svg>
      ),
      subMenu: [
        {
          path: "/products-production/proses-activity",
          label: "Process Activity",
        },
        {
          path: "/products-production/packages-data",
          label: "Packaging Data",
        },
        {
          path: "/reports/production",
          label: "Production Report",
        },
      ],
    },
    {
      label: "Reports",
      icon: (
        <svg
          className="w-[15px] h-[15px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#adb4d2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4"
          />
        </svg>
      ),
      subMenu: [
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
      ],
    },
  ];

  const renderSubMenu = (subMenu, menuKey) => (
    <div
      className={`pl-5 transition-max-height duration-700 ease-in-out overflow-hidden ${
        expandedMenus[menuKey] ? "max-h-40" : "max-h-0"
      }`}
    >
      {subMenu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className="block px-2 py-1 text-base font-medium rounded-md hover:bg-orange-100 dark:hover:bg-gray-700"
          style={{
            fontColor: "#000",
            fontWeight: "normal",
            fontSize: ".85rem",
            marginLeft: "20px",
          }}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
  const sidebarContainerClass = `
  fixed top-0 left-0 z-30 h-full w-64 overflow-y-auto 
  bg-white dark:bg-gray-800 shadow-md
`;

  const sidebarContentClass = `
py-4 text-gray-500 dark:text-gray-400 primary-color-sidebar-hover dark:text-gray-200 dark:hover:bg-gray-700 pt-[4rem]
`;

  return (
    <aside className={sidebarContainerClass}>
      <div className={sidebarContentClass}>
        <nav className="mt-5">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <li className="group">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-left bg-transparent rounded-lg hover:bg-orange-100 dark:hover:bg-gray-700 focus:outline-none"
                  >
                    <span className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </span>
                    {item.subMenu && (
                      <span className="transition-transform duration-700 ease-in-out group-hover:rotate-180">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    )}
                  </button>
                  {item.subMenu && renderSubMenu(item.subMenu, item.label)}
                </li>
                {item.title && (
                  <div className="px-4 py-2 mt-2 mb-1 text-xs font-bold tracking-wider uppercase border-t border-b border-gray-200">
                    {item.title}
                    <span className="ml-2">{item.icon}</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
