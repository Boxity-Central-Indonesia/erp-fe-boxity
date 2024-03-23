import { useState } from "react"
import { Table } from 'flowbite-react';


export const TabelForActivityType = ({
    dataFindProcces,
    setDataFindProcces,
    setDataDetailsActivity,
    dataDetailsActivity,
}) => {

    
    const handleAdd = () => {
        const newDataDetailActivity = [...dataFindProcces];
        newDataDetailActivity.push('');
        setDataFindProcces(newDataDetailActivity);
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const newData = [...dataFindProcces];
        newData[index] = value;
        setDataFindProcces(newData);
    }

    const handleChangeValues = (event) => {
        const { name, value } = event.target;
        setDataDetailsActivity(prevDataEdit => ({
            ...prevDataEdit,
            [name]: value
        }))
    } 

    const handleDelete = (index) => {
        const newData = [...dataFindProcces];
        newData.splice(index, 1); // Hapus elemen di indeks yang diberikan
        setDataFindProcces(newData);
    }

    return (
        <>
            <section>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head className="bg-none">
                           <Table.HeadCell>Details</Table.HeadCell>
                           <Table.HeadCell>Values</Table.HeadCell>
                           <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className={`${dataFindProcces == undefined || dataFindProcces.length === 0 ? `` : `hidden`}`}>
                                <Table.Cell colSpan={3}>
                                    <p className={`text-center`}>Tidak ada Activitas yang dipilih</p>
                                </Table.Cell>
                            </Table.Row>
                            {dataFindProcces && dataFindProcces.map((item, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <input 
                                            type="text" 
                                            placeholder="klik untuk mengedit" 
                                            value={item} 
                                            onChange={(event) => handleChange(event, index)} 
                                            className="border-none py-1 px-1 text-gray-700 text-sm"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <input 
                                            type="text" 
                                            placeholder="klik untuk mengedit" 
                                            name={item} 
                                            value={dataDetailsActivity[item]} 
                                            onChange={(event) => handleChangeValues(event)}
                                            className="border-none py-1 px-1 text-gray-700 text-sm"
                                        />
                                    </Table.Cell>
                                    <Table.Cell onClick={() => handleDelete(index)}> {/* Panggil handleDelete dengan index */}
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                                        </svg>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            <Table.Row>
                                <Table.Cell onClick={handleAdd} colSpan={3} className={`hover:bg-gray-100 bg-gray-50 p-2 ${dataFindProcces == undefined || dataFindProcces.length === 0 ? `hidden` : ``}`}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                                    </svg>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </section>
        </>
    )
}
