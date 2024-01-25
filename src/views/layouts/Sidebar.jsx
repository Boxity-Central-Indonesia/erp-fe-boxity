import React, { useRef } from 'react';
import { render } from 'react-dom';
import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen }) {
  const elementUserDropdown = useRef(null);
  const elemenOrganizationDropdown = useRef(null);
  const elemenEmployeeDropdown = useRef(null);
  const elementOrdersDropdown = useRef(null)
  const elementInvoicesDropdown = useRef(null)
  const elementPaymentDropdown = useRef(null)
  const elementProductsDropdown = useRef(null)
  const elementInventoryTransactionsDropdown = useRef(null)
  const elementLeadsDropdown = useRef(null)
  const elementProductsProductionDropdown = useRef(null);
  const elementReportsDropdown = useRef(null);
  const elementWarehousesAndProducts = useRef(null)

  const dropdown = (dropdownRef) => {
    dropdownRef.current.classList.toggle('hidden');
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
      <ul ref={dropdownRef} id={`dropdown-${label.toLowerCase()}`} className="hidden py-2 space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} className="flex items-center primary-color-sidebar-hover p-2 text-base primary-color-sidebar-hover transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
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
      <ul ref={dropdownRef} id={`dropdown-${label.toLowerCase()}`} className="hidden pl-10 py-2 space-y-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === 'dropdown' ? (
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
    { path: '/user/master', label: 'Master Data' },
    { path: '/user/role', label: 'Role & Permission' },
    // ... tambahkan item dropdown lainnya sesuai kebutuhan
  ];

  const organizationDropdownItems = [
    { path: '/company/list', label: 'Companies' },
    { path: '/departement/list', label: 'Departments' },
    { path: '/branch/list', label: 'Branches' },
    { path: '/employes/list', label: 'Employes' },
  ];
  

  const warehousesAndProductsItems = [
    {path : 'warehouses-products/products', label: 'Products'}
  ]

  const ordersDropdownItems = [
    { path: '/orders/list', label: 'Orders List' },
    { path: '/orders/role', label: 'Orders Status' },
    { path: '/orders/role', label: 'Orders Details' },
  ];

  const invoicesDropdownItems = [
    { path: '/invoices/list', label: 'Invoices List' },
    { path: '/invoices/status', label: 'Invoices Status' },
    { path: '/invoices/detail', label: 'Invoices Details' },
  ];

  const paymentsDropdownItems = [
    { path: '/payments/list', label: 'Payments List' },
    { path: '/payments/status', label: 'Payments Status' },
    { path: '/payments/detail', label: 'Payments Details' },
  ];

  // const productsDropdownItems = [
  //   { path: '/products/list', label: 'Products List' },
  //   { path: '/products/category', label: 'Products Category' },
  //   { path: '/products/subcategory', label: 'Products Subcategory' },
  // ];

  const inventoryTransactionsDropdownItems = [
    { path: '/inventory/list', label: 'Inventory Changes List' },
    { path: '/inventory/kind', label: 'Inventory Changes Type' },
    { path: '/inventory/amount', label: 'Inventory Changes Amount' },
  ];

  const leadsDropdownItems = [
    { path: '/leads/list', label: 'Leads List' },
    { path: '/leads/name', label: 'Leads Name' },
    { path: '/leads/email', label: 'Leads Email' },
    { path: '/leads/number-phone', label: 'Leads Phone Number' },
  ];


  
  const productsProductionDropdownItems = [
    { path: '/products/production', label: 'Products Production' },
    { path: '/products/production/process', label: 'Production Process' },
    { path: '/products/production/raw-material', label: 'Raw Material' },
    { path: '/products/production/labor', label: 'Labor' },
  ];

  const reportsDropdownItems = [
    { path: '/reports/sales', label: 'Sales Report' },
    { path: '/reports/income', label: 'Income Report' },
    { path: '/reports/expenditure', label: 'Expenditure Report' },
    { path: '/reports/inventory', label: 'Inventory Report' },
    { path: '/reports/leads', label: 'Leads Report' },
    { path: '/reports/production', label: 'Production Report' },
  ];


  return (
    <aside id="sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}>
      <div className='overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800'>
        <p className='mb-3 font-semibold dark:text-white'>Main</p>
        <ul className='space-y-2'>
          {/* ... item-item sidebar tanpa dropdown */}
          {renderDropdown(
            elementUserDropdown,
            'User',
            (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 3a3 3 0 1 1-1.614 5.53M15 12a4 4 0 0 1 4 4v1h-3.348M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
            </svg>  
            ),
            userDropdownItems
          )}
        {renderNestedDropdown(elemenOrganizationDropdown, 'Organization',
        (
          <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 1h12M3 1v16M3 1H2m13 0v16m0-16h1m-1 16H3m12 0h2M3 17H1M6 4h1v1H6V4Zm5 0h1v1h-1V4ZM6 8h1v1H6V8Zm5 0h1v1h-1V8Zm-3 4h2a1 1 0 0 1 1 1v4H7v-4a1 1 0 0 1 1-1Z"/>
        </svg>
        ) , organizationDropdownItems)}
        {renderDropdown(
            elementWarehousesAndProducts,
            'Warehouses & Produ..',
            (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                <path d="M10.013 4.175 5.006 7.369l5.007 3.194-5.007 3.193L0 10.545l5.006-3.193L0 4.175 5.006.981l5.007 3.194ZM4.981 15.806l5.006-3.193 5.006 3.193L9.987 19l-5.006-3.194Z"/>
                <path d="m10.013 10.545 5.006-3.194-5.006-3.176 4.98-3.194L20 4.175l-5.007 3.194L20 10.562l-5.007 3.194-4.98-3.211Z"/>
              </svg>
            ),
            warehousesAndProductsItems
          )}
          {renderNestedDropdown (
            elementOrdersDropdown,
            'Orders',
            (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"/>
              </svg>
            ),
            ordersDropdownItems
          )}
          
          {renderDropdown(
            elementInvoicesDropdown,
            'Invoices',
            (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 1v4a1 1 0 0 1-1 1H1m8-2h3M9 7h3m-4 3v6m-4-3h8m3-11v16a.969.969 0 0 1-.932 1H1.934A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.829 1h8.239A.969.969 0 0 1 15 2ZM4 10h8v6H4v-6Z"/>
            </svg>
            ),
            invoicesDropdownItems
          )}
          {renderDropdown(
              elementPaymentDropdown,
              'Payments',
              (
                <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9h2m3 0h5M1 5h18M2 1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
              </svg>
              ),
              paymentsDropdownItems
          )}
          {/* {renderDropdown(
            elementProductsDropdown,
            'Products',
            (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                <path d="M10.013 4.175 5.006 7.369l5.007 3.194-5.007 3.193L0 10.545l5.006-3.193L0 4.175 5.006.981l5.007 3.194ZM4.981 15.806l5.006-3.193 5.006 3.193L9.987 19l-5.006-3.194Z"/>
                <path d="m10.013 10.545 5.006-3.194-5.006-3.176 4.98-3.194L20 4.175l-5.007 3.194L20 10.562l-5.007 3.194-4.98-3.211Z"/>
              </svg>
            ),
            productsDropdownItems
          )} */}
          {renderDropdown(
            elementInventoryTransactionsDropdown,
            'Inventory Transactions',
            (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 10h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H17M1 10v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M1 10l2-9h12l2 9M6 4h6M5 7h8"/>
              </svg>
            ),
            inventoryTransactionsDropdownItems
          )}
          {renderDropdown(
             elementLeadsDropdown,
             'Leads',
             (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"/>
            </svg>
             ),
             leadsDropdownItems
          )}
          {renderDropdown(
             elementProductsProductionDropdown,
             'Products Production',
             (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.5 10.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0a2.225 2.225 0 0 0-1.666.75H12m3.5-.75a2.225 2.225 0 0 1 1.666.75H19V7m-7 4V3h5l2 4m-7 4H6.166a2.225 2.225 0 0 0-1.666-.75M12 11V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v9h1.834a2.225 2.225 0 0 1 1.666-.75M19 7h-6m-8.5 3.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"/>
              </svg>
             ),
             productsProductionDropdownItems
          )}
          {renderDropdown(
            elementReportsDropdown,
            'Reports',
            (
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
              </svg>
            ),
            reportsDropdownItems
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
