import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Function to determine if a menu item is active
  const isActiveMenu = (path) => {
    return location.pathname === path;
  };

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
          stroke="#6b7280"
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
          stroke="#6b7280"
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
        { path: "/user", label: "Users" },
        { path: "/company", label: "Companies" },
        { path: "/employees", label: "Employees" },
        { path: "/leads/list", label: "Leads Prospect" },
        { label: "Role & Permission", path: "/role-permission" },
        // { label: "Test", path: "/user/test" },
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
            stroke="#6b7280"
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
            stroke="#6b7280"
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
            stroke="#6b7280"
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
            stroke="#6b7280"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13c-2.8-.8-4.7-1-8-1a1 1 0 0 0-1 1v11c0 .6.5 1 1 1 3.2 0 5 .2 8 1m0-13c2.8-.8 4.7-1 8-1 .6 0 1 .5 1 1v11c0 .6-.5 1-1 1-3.2 0-5 .2-8 1"
          />
        </svg>
      ),
      subMenu: [
        { path: "accounts", label: "Accounting" },
        { path: "asset", label: "Asset" },
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
            stroke="#6b7280"
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
      className={`pl-5 transition-max-height duration-1000 ease-in-out overflow-hidden ${
        expandedMenus[menuKey] ? "max-h-58" : "max-h-0"
      }`}
    >
      {subMenu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          isActive={() => isActiveMenu(item.path)}
          className="block px-2 py-1 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-400"
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
  const sidebarContainerClassShow = `
  fixed top-0 left-0 z-30 h-full w-64 overflow-y-auto 
  bg-white dark:bg-gray-800 shadow-md border
`;

  const sidebarContainerClass = `
  fixed top-0 left-0 z-30 h-full w-64 overflow-y-auto 
  bg-white dark:bg-gray-800 shadow-md border
  `;

  const sidebarContentClass = `
    py-4 text-gray-500 dark:text-gray-200 primary-color-sidebar-hover dark:text-gray-200 dark:hover:bg-gray-400 pt-[4rem]
  `;

  return (
    <aside className={sidebarContainerClass}>
      <div className={sidebarContentClass}>
        <nav className="mt-5">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <li className="group">
                  <NavLink
                    to={item.path}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-left bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-400 focus:outline-none"
                    onClick={() => toggleDropdown(item.label)}
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
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="#6b7280"
                        >
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    )}
                  </NavLink>
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
          <ul className="pt-2 mt-2 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li className="group">
              <a
                href="mailto:help@boxity.id"
                target="_blank"
                class="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-left bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-400 focus:outline-none"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 21"
                >
                  <path d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z" />
                </svg>
                <span class="ms-3">Help</span>
              </a>
            </li>
            <li className="group">
              <a
                href="https://s.id/api-boxity-documentation"
                target="_blank"
                class="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-left bg-transparent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-400 focus:outline-none"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
                <span class="ms-3">API Documentation</span>
              </a>
            </li>
          </ul>
          <div
            id="dropdown-cta"
            class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
            role="alert"
          >
            <div class="flex items-center mb-3">
              <span class="bg-orange-100 text-orange-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                UAT Version 0.0.1
              </span>
            </div>
            <p class="mb-3 text-xs text-blue-800 dark:text-blue-400">
              Aplikasi ini masih dalam tahap Uji Terima Pengguna (UAT) dan
              mungkin tidak stabil. Bantu kami meningkatkannya dengan melaporkan
              masalah dan memberikan umpan balik Anda. Kirim email ke
              feedback@boxity.id. Terima kasih!
            </p>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
