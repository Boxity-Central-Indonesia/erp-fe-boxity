import React, { useState, useRef } from "react";
import { Table } from "flowbite-react";
import { useColor } from "../../../config/GlobalColour";
import { Drawer } from "./Drawer";
import { numberToCurrency } from "../../../config/FormatCurrency";
import { getApiData } from "../../../../function/Api";

export const TabelOrder = ({
  dataOrders
}) => {
  const data =
    dataOrders &&
    dataOrders.map((item) => ({
      "kode transaksi": item.kode_order,
      "vendor name": item.vendor.name,
      "transaction type": item.vendor.transaction_type,
      // 'product name': item.products.name,
      "tujuan/asal gudang": item.warehouse.name,
      // status: item.status,
      "order status": item.order_status,
      "order type": item.order_type,
      taxes: numberToCurrency(item.taxes) ?? "--",
      // quantity: item.quantity,
      // 'price per unnit': item.price_per_unit,
      "shipping cost": numberToCurrency( item.shipping_cost) ?? "--",
      "total price": numberToCurrency(item.total_price),
      id: item.id,
    }));

  const { globalColor } = useColor();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [dataDrawer, setDataDrawer] = useState()

  const checkboxRef = useRef();

  const dataHeading = data.length > 0 ? Object.keys(data[0]) : [];

  const handleCheckbox = async(id) => {
    setDataDrawer({})
    if (selectedCheckbox === id) {
      setOpenDrawer(false); // Jika checkbox yang dipilih adalah yang sama dengan sebelumnya, tutup drawer
      setSelectedCheckbox(null); // Hapus checkbox yang dipilih
    } else {
      setOpenDrawer(true);
      setSelectedCheckbox(id);
      try {
        const {data, status} = await getApiData('orders/' + id)
        if(status === 200) {
          setDataDrawer(data)
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
          <Table.Head>
              <Table.HeadCell>Detail</Table.HeadCell>
              {dataHeading
                .filter(heading => heading !== 'id')
                .map((heading, index) => (
                  <Table.HeadCell className={`${heading === 'taxes' || heading === 'shipping cost' || heading === 'total price' ?  `text-right` : ``}`} key={index}>{heading}</Table.HeadCell>
                ))
              }
            </Table.Head>
          <Table.Body className="divide-y">
              {data.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  <Table.Cell>
                    {checkbox(row.id)}
                  </Table.Cell>
                  {dataHeading
                  .filter(heading => heading !== 'id')
                  .map((heading, columnIndex) => (
                    <Table.Cell key={columnIndex}>
                      <div className={`${row[heading] == 'Completed' ? `bg-green-600 px-3 py-1 text-white font-medium w-fit rounded-full` : row[heading] === 'In Production' ? 'bg-yellow-600 px-3 py-1 text-white font-medium w-fit rounded-full' : heading === 'taxes' || heading === 'shipping cost' ? 'text-right' : ''}`}>
                        <p>{row[heading]}</p> 
                      </div>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
        </Table>
      </div>
    );
  };

  const checkbox = (id) => {
    return (
      <div className="flex items-center mb-4">
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          value={`test checkbox ${id}`}
          onChange={() => handleCheckbox(id)}
          checked={selectedCheckbox === id}
          ref={checkboxRef}
          className={`w-4 h-4 text-[${globalColor}] bg-gray-100 border-gray-300 rounded focus:ring-[${globalColor}] dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`}
        />
      </div>
    );
  };

  return (
    <section className="bg-white rounded-md border p-5">
      <h1 className="text-xl font-semibold mb-5">All transaction list</h1>
      {Drawer({ 
        openDrawer, 
        setOpenDrawer, 
        setSelectedCheckbox,
        dataDrawer
      })}
      {tabel()}
    </section>
  );
};
