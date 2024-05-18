import { Table } from "flowbite-react";
import { useColor } from "../../../../config/GlobalColour";
import { FormatCurrency, currencyToNumber } from "../../../../config/FormatCurrency";


export const TabelForProducts = ({
  dataTabelProducts,
  setDataTabelProducts,
  saveDataToLocalStorage,
}) => {
  const { globalColor } = useColor();

  const handleInputChange = (index, key, value) => {
    let newData = [...dataTabelProducts];
    if (value === "") {
      // Set the corresponding property to an empty string instead of removing the item
      newData[index] = { ...newData[index], [key]: "" };
    } else {
      newData[index] = { ...newData[index], [key]: value };
    }
    console.log(newData);
    setDataTabelProducts(newData); // Changed from setEditedData to
  };

  const handleDelete = (index) => {
    const newData = dataTabelProducts.filter((_, i) => i !== index);
    setDataTabelProducts(newData);
    saveDataToLocalStorage(newData);
  };


  return (
    <div className="overflow-x-auto">
      <h3 className="mb-5 mt-1 text-sm font-medium">Tabel for products</h3>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Nama produk</Table.HeadCell>
          <Table.HeadCell>Jumlah</Table.HeadCell>
          <Table.HeadCell>harga satuan</Table.HeadCell>
          <Table.HeadCell>Unit Satuan</Table.HeadCell>
          {/* <Table.HeadCell>id</Table.HeadCell> */}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="text-black">
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
                    value={FormatCurrency({value : item.price_per_unit})}
                    onChange={(e) =>
                      handleInputChange(index, "price_per_unit", currencyToNumber(e.target.value))
                    } 
                  />
                </Table.Cell>
                <Table.Cell>
                  <UnitOfMeasureInput
                    value={item.unit_of_measure}
                    onChange={(e) =>
                      handleInputChange(index, "unit_of_measure", e.target.value)
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
      className="border-none w-32 h-7 px-0"
    />
  );
};

const PriceInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      name="price_per_unit" // Corrected the name attribute
      onChange={onChange}
      className="border-none w-32 h-7 px-0"
    />
  );
};
const UnitOfMeasureInput = ({ value, onChange }) => {
  return (
    <select onChange={onChange} className="border-none" name="unit_of_measure">
      <option value="kg" selected={value === "kg"}>Kg</option>
      <option value="pcs" selected={value === "pcs"}>pcs</option>
    </select>
  );
};
