import { useState, useRef } from "react";
import { Table, TableCell } from 'flowbite-react';
import { useColor } from "../../../conifg/GlobalColour";
import { Drawer } from "./Drawer";

export const TabelOrder = () => {
    const [data, setData] = useState([
        { id: 1, type: 'purchase', amount: 100, date: '2024-03-18' },
        { id: 2, type: 'sale', amount: 150, date: '2024-03-19' },
        { id: 3, type: 'purchase', amount: 80, date: '2024-03-20' },
        { id: 4, type: 'sale', amount: 200, date: '2024-03-21' },
        { id: 5, type: 'purchase', amount: 120, date: '2024-03-22' },
        { id: 6, type: 'sale', amount: 180, date: '2024-03-23' },
        { id: 7, type: 'purchase', amount: 90, date: '2024-03-24' },
        { id: 8, type: 'sale', amount: 170, date: '2024-03-25' },
        { id: 9, type: 'purchase', amount: 110, date: '2024-03-26' },
    ]);

    const { globalColor, changeColor } = useColor();

    const [openDrawer, setOpenDrawer] = useState(false)

    const checkboxRef = useRef()

    const columns = ['type', 'amount', 'date']; // Menentukan kolom mana yang ingin ditampilkan

    const checkbox = () => {
        return (
            <>
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="test checkbox" onChange={handleCheckbox} ref={checkboxRef}
                        className={`w-4 h-4 text-[${globalColor}] bg-gray-100 border-gray-300 rounded focus:ring-[${globalColor}] dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600`}/>
                </div>
            </>
        )
    }

    const handleCheckbox = () => {
        setOpenDrawer(prevOpenDrawer => !prevOpenDrawer)
    }



    const tabel = () => {
        return(
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell></Table.HeadCell>
                        {columns.map((column, index) => (
                        <Table.HeadCell key={index}>{column}</Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data.map((row, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4 flex item-center">
                                    {checkbox()}
                                </Table.Cell>
                                {columns.map((column, columnIndex) => (
                                    <Table.Cell key={columnIndex}>{row[column]}</Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }

    return (
        <>
            <section className="bg-white rounded-md border p-5">
                <h1 className="text-2xl font-semibold mb-5" >Order list</h1>
                {Drawer({openDrawer, setOpenDrawer})}
                {tabel()}
            </section>
        </>
    )
}