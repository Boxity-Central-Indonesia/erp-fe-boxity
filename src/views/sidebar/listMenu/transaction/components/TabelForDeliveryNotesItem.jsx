import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useColor } from '../../../../config/GlobalColour';
import { getApiData } from '../../../../../function/Api'


export const TabelForDeliveryNoteItem = ({
    dataTabelDeliveryNotes, 
    setDataTabelDeliveryNotes,
}) => {
    const [editingItemId, setEditingItemId] = useState(null);
    const [rowCount, setRowCount] = useState(dataTabelDeliveryNotes.length);
    const { globalColor } = useColor();


    const handleInputChange = (index, key, value) => {
        let newData = [...dataTabelDeliveryNotes];
        if (value === '') {
            newData[index] = { ...newData[index], [key]: '' };
        } else {
            newData[index] = { ...newData[index], [key]: value };
        }
        setDataTabelDeliveryNotes(() => newData);
        localStorage.setItem("dataDeliveryNotesItem", JSON.stringify(newData))
    };

    const handleDelete = (index) => {
        console.log('okeee');
        const newData = dataTabelDeliveryNotes.filter((_, i) => i !== index);
        localStorage.setItem("dataDeliveryNotesItem", JSON.stringify(newData))
        setDataTabelDeliveryNotes(newData)
        setRowCount(prevCount => prevCount - 1);
    };

    const handleAddRow = () => {
        const newData = [...dataTabelDeliveryNotes, { order_id: '', product_id: '' }];
        setDataTabelDeliveryNotes(newData);
        setRowCount(prevCount => prevCount + 1);
    };

    const Save = () => {
        setEditingItemId(null);
    };

    return (
        <div className="overflow-x-auto">
            <h3 className='mb-5 mt-1 text-sm font-medium'>Tabel for delivery note items</h3>
            <Table>
                <Table.Head>
                    <Table.HeadCell>order</Table.HeadCell>
                    <Table.HeadCell>product</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y text-black">
                    {dataTabelDeliveryNotes.map((item, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 border-b">
                            <Table.Cell className="p-0">
                                <SelectOrder value={item.order_id} onChange={(e) => handleInputChange(index, 'order_id', e.target.value)} />
                            </Table.Cell>
                            <Table.Cell className="p-0">
                                <SelectProduct value={item.product_id} onChange={(e) => handleInputChange(index, 'product_id', e.target.value)} />
                            </Table.Cell>
                            <Table.Cell className="p-0 text-center">
                                <button type="button" onClick={() => handleDelete(index)}>
                                    <svg style={{ color: globalColor }} className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    <Table.Row onClick={handleAddRow} className="w-full cursor-pointer bg-white dark:border-gray-700 dark:bg-gray-800 border-b hover:bg-gray-100">
                        <Table.Cell colSpan={3} className="py-2">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white mx-auto cursor-pointer" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

const SelectOrder = ({ value, onChange }) => {
    const [dataOrder, setDataOrder] = useState(null)

    useEffect(() => {
       const getData = async (path) => {
        try {
            const {data, status} = await getApiData(path)
            if(status === 200) {
                const newData = data.map(item => ({
                    id: item.id,
                    name: path === 'orders' ? item.kode_order : item.name
                }))

                setDataOrder(newData)
            }
        } catch (error) {
            console.log(error);
        }
       }
       getData('orders')
    }, [])

    return (
        <select
            style={{
                outline: 'none'
            }}
            name="order_id"
            id="order_id"
            value={value}
            onChange={onChange}
            className="w-full border-none focus:outline-none focus:ring-black text-sm"
        >
            <option value="">Select Order</option>
            {dataOrder && dataOrder.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
            ))}
        </select>
    );
};

const SelectProduct = ({ value, onChange }) => {

    const [dataProduct, setDataProduct] = useState(null)

    useEffect(() => {
       const getData = async (path) => {
        try {
            const {data, status} = await getApiData(path)
            if(status === 200) {
                const newData = data.map(item => ({
                    id: item.id,
                    name: path === 'orders' ? item.kode_order : item.name
                }))

                setDataProduct(newData)
            }
        } catch (error) {
            console.log(error);
        }
       }
       getData('products')
    }, [])

    return (
        <select
            style={{
                outline: 'none'
            }}
            name="product_id"
            id="product_id"
            value={value}
            onChange={onChange}
            className="w-full border-none focus:outline-none focus:ring-black text-sm"
        >
            <option value="">Select Product</option>
            
            {dataProduct && dataProduct.map((item,index) => (
                <option key={index} value={item.id}>{item.name}</option>
            ))}

        </select>
    );
};
