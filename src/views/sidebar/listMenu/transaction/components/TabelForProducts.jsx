import React, { useState, useRef } from 'react';
import { Table } from 'flowbite-react';
import { useColor } from '../../../../conifg/GlobalColour';

export const TabelForProducts = ({ data }) => {
    const { globalColor } = useColor();
    const [editedData, setEditedData] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const idInputRefs = useRef([]);

    const handleInputChange = (index, key, value) => {
        let newData = [...editedData];
        if (value === '') {
            // Set the corresponding property to an empty string instead of removing the item
            newData[index] = { ...newData[index], [key]: '' };
        } else {
            newData[index] = { ...newData[index], [key]: value };
        }
        setEditedData(newData);
    };
    
    

    const handleSaveClick = () => {
        console.log('Edited data:', editedData);
        setEditedData([]);
        setEditingItemId(null);
    };

    // const formatCurrency = (value) => {
    //     return new Intl.NumberFormat('id-ID', {
    //         style: 'currency',
    //         currency: 'IDR'
    //     }).format(value);
    // };

    return (
        <div className="overflow-x-auto">
            <h3 className='mb-5 mt-1 text-sm font-medium'>Tabel for products</h3>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Qty</Table.HeadCell>
                    <Table.HeadCell>Price per unit</Table.HeadCell>
                    <Table.HeadCell>id</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y text-black">
                    {data && data.map((item, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 border-b">
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>
                                {editingItemId === index ? (
                                    <QtyInput
                                        value={editedData[index]?.qty || item.qty}
                                        onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                                    />
                                ) : (
                                    <span>{item.qty}</span>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                {editingItemId === index ? (
                                    <PriceInput
                                        value={(editedData[index] && editedData[index].price_per_unit) || item.price_per_unit}
                                        onChange={(e) => handleInputChange(index, 'price_per_unit', e.target.value)}
                                    />
                                ) : (
                                    <span>{item.price_per_unit}</span>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                {editingItemId === index ? (
                                    <IdInput
                                        ref={ref => idInputRefs.current[index] = ref}
                                        value={(editedData[index] && editedData[index].id) || item.id}
                                        onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                    />
                                ) : (
                                    <span>{item.id}</span>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <div className='flex items-center gap-2'>
                                    {editingItemId === index ? (
                                        <button type='button' onClick={handleSaveClick}>
                                            <svg style={{ color: globalColor }} className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9"/>
                                            </svg>
                                        </button>
                                    ) : (
                                        <button type='button' onClick={() => setEditingItemId(index)}>
                                            <svg style={{ color: globalColor }} className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"></path>
                                            </svg>
                                        </button>
                                    )}
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
            name="qty"
            onChange={onChange}
            className='border-none w-20 h-7 px-0'
        />
    );
};

const PriceInput = ({ value, onChange }) => {
    return (
        <input
            type="number"
            value={value}
            name="price_per_input"
            onChange={onChange}
            className='border-none w-20 h-7 px-0'
        />
    );
};

const IdInput = React.forwardRef(({ value, onChange }, ref) => {
    return (
        <input
            type="text"
            value={value}
            name='id'
            onChange={onChange}
            ref={ref}
            className='border-none w-20 h-7 px-0'
        />
    );
});
