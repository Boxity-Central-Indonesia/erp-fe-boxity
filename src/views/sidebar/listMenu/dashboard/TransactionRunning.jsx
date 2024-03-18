import React, { useState } from "react";
import { Table } from 'flowbite-react';
import { DropdownForLineChart } from "./chart/lineChart";
import { useColor } from "../../../conifg/GlobalColour";


export const TransactionRunning = () => {
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

    const columns = ['type', 'amount', 'date']; // Menentukan kolom mana yang ingin ditampilkan

    return (
        <>
            <div className="bg-white rounded-md border p-5">
                <h1 className="text-2xl font-semibold mb-5">Ongoing transaction</h1>
                <Table>
                    <Table.Head>
                        {columns.map((column, index) => (
                            <Table.HeadCell key={index}>{column}</Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data.map((row, index) => (
                            <Table.Row key={index}>
                                {columns.map((column, columnIndex) => (
                                    <Table.Cell key={columnIndex}>{row[column]}</Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <hr className="my-3"/>
                <div className="mt-7 mb-3 flex items-center justify-between">
                    <DropdownForLineChart />
                    <div style={{color: globalColor}} className="flex items-center cursor-pointer">
                        <p className="text-medium">Full report</p>
                        <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
