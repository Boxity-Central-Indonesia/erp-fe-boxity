import React, { useState, useRef } from "react";
import { Table } from "flowbite-react";
import { useColor } from "../../../../config/GlobalColour";

export const TabelForProducts = ({
  dataTabelProducts,
  refBody,
  onChange,
  setDataTabelProducts,
  handleSaveClick,
  saveDataToLocalStorage,
}) => {
  const { globalColor } = useColor();
  const [editingItemId, setEditingItemId] = useState(null);
  const idInputRefs = useRef([]);

  const handleInputChange = (index, key, value) => {
    let newData = [...dataTabelProducts];
    if (value === "") {
      // Set the corresponding property to an empty string instead of removing the item
      newData[index] = { ...newData[index], [key]: "" };
    } else {
      newData[index] = { ...newData[index], [key]: value };
    }
    setDataTabelProducts(newData); // Changed from setEditedData to
  };

  const handleDelete = (index) => {
    const newData = dataTabelProducts.filter((_, i) => i !== index);
    setDataTabelProducts(newData);
    saveDataToLocalStorage(newData);
  };

  const Save = () => {
    handleSaveClick();
    setEditingItemId(null);
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="mb-5 mt-1 text-sm font-medium">Tabel for products</h3>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>quantity</Table.HeadCell>
          <Table.HeadCell>harga satuan</Table.HeadCell>
          {/* <Table.HeadCell>id</Table.HeadCell> */}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y text-black">
          {dataTabelProducts &&
            dataTabelProducts.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 border-b"
              >
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  <QtyInput
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <PriceInput
                    value={item.price_per_unit}
                    onChange={(e) =>
                      handleInputChange(index, "price_per_unit", e.target.value)
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <>
                      <button type="button" onClick={() => handleDelete(index)}>
                        <svg
                          style={{ color: globalColor }}
                          className="w-6 h-6 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 30 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const QtyInput = ({ value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      name="quantity" // Corrected the name attribute
      onChange={onChange}
      className="border-none w-20 h-7 px-0"
    />
  );
};

const PriceInput = ({ value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      name="price_per_unit" // Corrected the name attribute
      onChange={onChange}
      className="border-none w-20 h-7 px-0"
    />
  );
};

// const IdInput = React.forwardRef(({ value, onChange }, ref) => {
//     return (
//         <input
//             type="text"
//             value={value}
//             name='id'
//             onChange={onChange}
//             ref={ref}
//             className='border-none w-20 h-7 px-0'
//         />
//     );
// });
