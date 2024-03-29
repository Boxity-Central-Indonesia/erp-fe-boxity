import React, { useState, useRef,useMemo } from "react";
import { Table, TableCell } from "flowbite-react";
import { useColor } from "../../../config/GlobalColour";
import { Drawer } from "./Drawer";
import { numberToCurrency } from "../../../config/FormatCurrency";
import { getApiData } from "../../../../function/Api";
import Paginate from "../../../layouts/PaginateTest";
import uuid from 'uuid-random'; 


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper()

export const TabelOrder = ({ data }) => {

  const columns = [
    {
      accessorKey: 'id',
      Header: 'Edit',
      cell: (cell) => checkbox(cell.getValue())
    },
    {
      accessorKey: "kode_order",
      Header: "kode order",
    },
    {
      accessorKey: "vendor",
      Header: "vendor name",
      cell: (cell) => cell.getValue().name
    },
    {
      accessorKey: 'vendor',
      Header: 'type',
      cell: (cell) => cell.getValue().transaction_type === 'outbound' ? 'Sales' : 'Purchase'
    },
    {
      accessorKey: 'created_at',
      Header: 'Date',
      cell: (cell) => new Date(cell.getValue()).toISOString().slice(0, 19).replace("T", " "),
    },
    {
      accessorKey: 'warehouse',
      Header: 'Tujuan/asal gudang',
      cell: (cell) => cell.getValue().name
    },
    {
      accessorKey: 'order_status',
      Header: 'order status',
    },
    {
      accessorKey: 'order_type',
      Header: 'order type',
    },
    {
      accessorKey: 'total_price',
      Header: 'total price',
      cell: (cell) => <p className="text-right">{numberToCurrency(cell.getValue())}</p>
    },
  ];

  const table = useReactTable({
    data,
    columns,
    initialState: {
        pagination: {
          pageSize: 5,
        },
      },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getColumnHelpers: () => [
      ({ props }) => ({
        filterValue: globalFilter,
        setFilterValue: setGlobalFilter,
      }),
      ({ column }) => {
        if (column.id === 'status') {
          return {
            filterValue: selectedStatus,
            setFilterValue: (value) => {
              setSelectedStatus(value);
            },
          };
        }
        return {};
      },
    ],
  });


  const { globalColor } = useColor();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [dataDrawer, setDataDrawer] = useState();

  const checkboxRef = useRef();

  // const dataHeading = data.length > 0 ? Object.keys(data[0]) : [];

  const handleCheckbox = async (id) => {
    setDataDrawer({});
    if (selectedCheckbox === id) {
      setOpenDrawer(false); // Jika checkbox yang dipilih adalah yang sama dengan sebelumnya, tutup drawer
      setSelectedCheckbox(null); // Hapus checkbox yang dipilih
    } else {
      setOpenDrawer(true);
      setSelectedCheckbox(id);
      try {
        const { data, status } = await getApiData("orders/" + id);
        if (status === 200) {
          setDataDrawer(data);
        }
      } catch (error) {
        console.log(data);
      }
    }
  };

  const tabel = () => {
    return (
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-xs">
            {columns.map((col) => (
              <Table.HeadCell className={`${col.Header === 'total price' ? `text-right` : ``}`} key={uuid()}>{col.Header}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={uuid()}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <hr className="my-2" />
        <div className="px-5 mt-5">
          <Paginate table={table} itemsPagination={[5, 10 , 15]}/>
        </div>
      </div>
    );
  };

  const checkbox = (value) => {
    return (
      <div className="flex items-center mb-4">
        <input
          id={`checkbox-${value}`}
          type="checkbox"
          value={`value`}
          onChange={() => handleCheckbox(value)}
          checked={selectedCheckbox === value}
          ref={checkboxRef}
          className={`w-4 h-4 text-[${globalColor}] bg-gray-100 border-gray-300 rounded focus:ring-[${globalColor}] dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`}
        />
      </div>
    );
  };

  return (
    <section className="bg-white rounded-md border p-5">
      <h1 className="text-xl font-semibold mb-5 capitalize">
        All transaction list
      </h1>
      {Drawer({
        openDrawer,
        setOpenDrawer,
        setSelectedCheckbox,
        dataDrawer,
      })}
      {tabel()}
    </section>
  );
};
