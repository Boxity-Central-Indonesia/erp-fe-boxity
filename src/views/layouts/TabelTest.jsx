// Tabel.jsx
import React, { useMemo } from 'react';
import { Table, Dropdown, TableCell, TableBody } from 'flowbite-react';
import Paginate from './PaginateTest';
import TabelHeading from './TabelHeading';
import { useColor } from '../conifg/GlobalColour';
import { useState, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,

} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const TabelComponentTest = ({data, dataHeading, handelEdit, setOpenModal, skeleton })  => {

  const { globalColor, changeColor } = useColor();
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  const handleEditClick = (param, param2) => {
    handelEdit(param, param2)
  }

  const columns = useMemo(() => {
    if (!data || !data[0]) return []; // Pastikan data ada dan tidak kosong
    
    const keys = Object.keys(data[0]); // Ambil kunci dari objek pertama
    const filteredKeys = keys.filter(key => key !== 'id' && data[0][key] !== null); // Filter kunci yang valid
    
    return filteredKeys.map((key) => {
      return columnHelper.accessor((row) => row[key], {
        id: key, // Tambahkan 'col_' di depan kunci sebagai ID unik
        cell: (info) => info.getValue(),
      });
    });
  }, [data]);
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: true,
  });
  
  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  if (!data) {
    // Tampilkan pesan "Loading..." jika data masih undifined
    return (
        <div role="status" className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
  }

  return (
    <section className="bg-gray-100 dark:bg-gray-900 mb-32">
      <h3 className="text-2xl font-semibold mb-3 dark:text-white">{dataHeading[0].heading}</h3>
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          < TabelHeading toggleOpenModal={dataHeading[0].eventToggleModal} icon={dataHeading[0].icon}
            label={dataHeading[0].label} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
            handleClickHeading={dataHeading[0].onclick} showNavHeading={dataHeading[0].showNavHeading}
            activeButton={dataHeading[0].activeButton} dataNavHeading={dataHeading[0].dataNavHeading} />
          <div className="overflow-x-auto">
             <table className={`w-full ${skeleton ? `` : `hidden`}`}>
              <tbody>
                <tr className='w-full border-t-[1px]'>
                  <td className='flex gap-1'>
                  <div role="status"
                    className="max-w-full w-full p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className={`w-full ${data.length === 0 ? `` : `hidden`}`}>
              <tbody>
                <tr className='w-full flex justify-center border-t-[1px]'>
                  <td className='flex gap-1 py-8'>
                  <p className='flex items-center text-gray-700 text-sm' onClick={()=> setOpenModal(dataHeading[0].activeButton)} >
                    No data found, want to
                  </p> 
                    <button onClick={() => setOpenModal(dataHeading[0].activeButton)} className='text-sm' style={{color: globalColor}}> add new data</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <Table hoverable className={`${skeleton ? `hidden` : ``}`}>
              <Table.Head>
                {table.getHeaderGroups()[0].headers.map((header) => (
                <Table.HeadCell key={header.id} className="">
                  <span className="">{header.id === 'Employment Status' ? `` : header.id}</span>
                  {header.column.getCanFilter() && header.id === 'Employment Status' && (
                  <div>
                    <Filter column={header.column} table={table} />
                  </div>
                  )}
                </Table.HeadCell>
                ))}
                <Table.HeadCell className={`${data.length === 0 ? `hidden` : ``}`}>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {row.getVisibleCells().map((cell) => (
                  < Table.Cell key={cell.id} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                    ))}
                    <Table.Cell className={`text-right`}>
                      <button style={{color: globalColor}}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={()=>
                        handleEditClick(item.id, item.company_id)}
                        >
                        Edit
                      </button>
                    </Table.Cell>
                </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <nav
            className="flex flex-col md:flex-row border-t-[1px] justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation">
            < Paginate table={table} />
          </nav>
        </div>
      </div>
    </section>
  );
}


function Filter({
  column,
  table,
}) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue)?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue)?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '')}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={e => setValue(e.target.value)} />;
}







export default TabelComponentTest;
