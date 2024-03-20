import {Table} from 'flowbite-react'
import { useState } from 'react'
import { useColor } from "../../../conifg/GlobalColour";



export const Drawer = ({
    openDrawer,
    setOpenDrawer,
    setSelectedCheckbox
}) => {
    const { globalColor, changeColor } = useColor();

    const classOpen = 'fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-[30%] dark:bg-gray-800 transform-none border pt-24'

    const classClosed = 'fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800'

    const tabelOrder = () => {
        return(
            <>
                 <table className={`w-full text-gray-700 text`}>
                        <tr className="">
                            <td className="py-1.5">Kode Transaksi</td>
                            <td>
                                {" "}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5">
                                Customer
                            </td>
                            <td>
                                {" "}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5">
                                Gudang Asal
                            </td>
                            <td>
                                {" "}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5">Kode transaksi invoice</td>
                            <td>
                                {" "}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5">Order type</td>
                            <td>
                                {" "}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5">Order status</td>
                            <td>
                                {" "}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-1.5">PPN</td>
                            <td>
                                {" "}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5">Biaya Pengiriman</td>
                            <td>
                                {" "}
                                {/* :{" "}
                                <span className="ml-5">{data?.shipping_cost || "Rp. 0"}</span> */}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5">Total Tagihan</td>
                            <td>
                                {" "}
                                {/* :{" "}
                                <span className="ml-5">
                                    {data?.total_price
                                    ? new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    }).format(data.total_price)
                                    : "--"}
                                </span> */}
                            </td>
                        </tr>
                    </table>
            </>
        )
    }

    const tabelProductOrder = () => {
        return(
            <>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Product name</Table.HeadCell>
                            <Table.HeadCell>Color</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {'Apple MacBook Pro 17"'}
                                </Table.Cell>
                                <Table.Cell>Sliver</Table.Cell>
                                <Table.Cell>Laptop</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    Microsoft Surface Pro
                                </Table.Cell>
                                <Table.Cell>White</Table.Cell>
                                <Table.Cell>Laptop PC</Table.Cell>
                                <Table.Cell>$1999</Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    Magic Mouse 2</Table.Cell>
                                <Table.Cell>Black</Table.Cell>
                                <Table.Cell>Accessories</Table.Cell>
                                <Table.Cell>$99</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </>
        )
    }

    const closeDrawer = () => {
        setOpenDrawer(false)
        setSelectedCheckbox(null)
    }

    return(
        <>
            <div id="drawer-right-example"
                className={openDrawer ? classOpen : classClosed}
                tabindex="-1" aria-labelledby="drawer-right-label">
                <h5 id="drawer-right-label"
                    className="inline-flex items-center mb-4 text-xl font-semibold dark:text-gray-400">
                    Order detail</h5>
                <button onClick={closeDrawer} type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-16 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div>
                   {tabelOrder()}
                </div>
                <div className='mt-6'>
                    <h2 className='mb-3 text-xl font-medium'>Product list</h2>
                    {tabelProductOrder()}
                </div>
            </div>
        </>
    )
}