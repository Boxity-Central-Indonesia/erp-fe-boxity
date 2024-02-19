import React, { useState } from 'react';
import { Table } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import IconAdd from '../../../layouts/icons/IconAdd';
import TabelComponent from '../../../layouts/Tabel';
import TabelHeading from '../../../layouts/TabelHeading';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  // SortingFns,
  getPaginationRowModel,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    cell: (info) => info.renderValue(),
  }),
];

export default function RoleAndPermission() {
  const [data] = useState(() => [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "123-456-7890"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "phone": "987-654-3210"
    },
    {
      "id": 3,
      "name": "Michael Johnson",
      "email": "michaeljohnson@example.com",
      "phone": "555-123-4567"
    },
    {
      "id": 4,
      "name": "Emily Wilson",
      "email": "emilywilson@example.com",
      "phone": "999-888-7777"
    },
    {
      "id": 5,
      "name": "Daniel Lee",
      "email": "daniellee@example.com",
      "phone": "444-555-6666"
    },
    {
      "id": 6,
      "name": "Olivia Martinez",
      "email": "oliviamartinez@example.com",
      "phone": "777-999-1111"
    },
    {
      "id": 7,
      "name": "William Thompson",
      "email": "williamthompson@example.com",
      "phone": "222-333-4444"
    }
  ]);
  const [sorting, setSorting] = useState([]);
  const [dataHeading, setDataHeading] = useState( [{
    label: 'Add Contacts',
    icon: IconAdd(),
    heading: 'Vendor contacts',
    // eventToggleModal: handleCreate
}]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 2,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  

  console.log(table.getHeaderGroups()[0].headers );



  const pagination = () => {
    return(
      <>
        <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
          <div className="sm:mr-auto sm:mb-0 mb-2">
            <span className="mr-2">Items por página</span>
            <select className="border p-1 rounded w-16 border-gray-200" value={table.getState().pagination.pageSize}
              onChange={(e)=> {
              table.setPageSize(Number(e.target.value));
              }}
              >
              {[4,8].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className={`${ !table.getCanPreviousPage() ? 'bg-gray-100'
              : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100' } rounded p-1`} onClick={()=>
              table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              >
              <span className="w-5 h-5">{'<<'}</span> </button> <button className={`${ !table.getCanPreviousPage()
                  ? 'bg-gray-100' : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100' } rounded p-1`} onClick={()=>
                  table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  >
                  <span className="w-5 h-5">{'<'}</span> </button> <span className="flex items-center gap-1">
                      <input min={1} max={table.getPageCount()} type="number"
                        value={table.getState().pagination.pageIndex + 1} onChange={(e)=> {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      table.setPageIndex(page);
                      }}
                      className="border p-1 rounded w-10"
                      />
                      de {table.getPageCount()}
                  </span>
                  <button className={`${ !table.getCanNextPage() ? 'bg-gray-100'
                    : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100' } rounded p-1`} onClick={()=>
                    table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    >
                    <span className="w-5 h-5">{'>'}</span>
                  </button>
                  <button className={`${ !table.getCanNextPage() ? 'bg-gray-100'
                    : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100' } rounded p-1`} onClick={()=>
                    table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    >
                    <span className="w-5 h-5">{'>>'}</span>
                  </button>
          </div>
        </div>
      </>
    )
  }

  return (
   <>
   < TabelComponent 
   data={table}
   dataHeading={dataHeading}
   />
   </>
  );
}
