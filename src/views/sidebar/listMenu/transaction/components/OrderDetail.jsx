import { CRUD } from "./CRUD"
import { useEffect } from "react";
import Button from "../../../../layouts/Button";
import { TabelForDetail } from "../../../../layouts/TabelForDetail";

export const OrderDetail = ({data, defaultEdit, handleEdit, dataHeading}) => {

    const dataProducts = data?.products
    ? data.products.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        'price per unit': item.price_per_unit,
        'total price': item.total_price
      }))
    : []; // Use an empty array if data.departments is null
  
    return(
        <>
        <h1 className="text-2xl my-5 dark:text-white font-semibold">Order detail</h1>
        <section className="bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-md p-5 mb-16">
            <div className="grid lg:grid-cols-2 text-base">
                <div className="col-span-1">
                    <table className={`w-full`}>
                        <tr className="">
                            <td className="py-3">Order code</td>
                            <td> : <span className="ml-5">{data?.kode_order || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Vendor</td>
                            <td> : <span className="ml-5">{data?.vendor?.name || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Warehouses</td>
                            <td> : <span className="ml-5">{data?.warehouse?.name || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Invoices</td>
                            <td> : <span className="ml-5">{data?.invoices?.total_amount || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Order type</td>
                            <td> : <span className="ml-5">{data?.order_type || '--'}</span></td>
                        </tr>
                    </table>
                </div>
                <div className="col-span-1">
                    <table className="w-full">
                        <tr>
                            <td className="py-3">Order status</td>
                            <td> : <span className="ml-5">{data?.order_status || '--'}</span></td>
                        </tr>
                       
                        <tr>
                            <td className="py-3">Taxes</td>
                            <td> : <span className="ml-5">{data?.taxes || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Shipping cost</td>
                            <td> : <span className="ml-5">{data?.shipping_cost || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Total price</td>
                            <td> : <span className="ml-5">{data?.total_price || '--'}</span></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="flex gap-3 mt-5">
                <Button 
                bgColour={''}
                label={'Back'}
                paddingX={'4'}
                paddingY={'2.5'}
                event={() => defaultEdit(true)}
                icon={<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
              </svg>}
                />
                <Button 
                bgColour={'primary'}
                label={'Edit'}
                paddingX={'4'}
                event={() => handleEdit(data.id, 'companies')}
                paddingY={'2.5'}
                icon={<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
              </svg>}
                />
            </div>
            <hr className="my-7" />
            <div className="grid grid-cols-1 gap-5">
               <div>
               <h2 className="text-xl font-medium dark:text-white mb-4">Products</h2>
               <TabelForDetail data={dataProducts} dataHeading={dataHeading} handleEdit={handleEdit} routes={'companies/{companyId}/branches'}/>
               </div>
            </div>
            <hr className="my-7" />
        </section>
        </>
    )
}