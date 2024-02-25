import { CRUD } from "./CRUD"
import { useEffect } from "react";
import Button from "../../../../../layouts/Button";
import { TabelForCompany } from "./TabelForCompany";

export const CompanyDetail = ({data, defaultEdit, handleEdit, dataHeading}) => {

    const dataDepartments = data?.departments
    ? data.departments.map((item) => ({
        id: item.id,
        name: item.name,
        responsibilities: item.responsibilities,
      }))
    : []; // Use an empty array if data.departments is null
  

    const dataBranches = data?.branches? data.branches.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        'phone number': item.phone_number 
    }))
    :[]

    return(
        <>
        <h1 className="text-2xl my-5 dark:text-white font-semibold">Company information</h1>
        <section className="bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-md p-5 mb-16">
            <div className="grid lg:grid-cols-2 text-base">
                <div className="col-span-1">
                    {/* <table className={`w-full ${data.length == 0 ? `hidden` : ``}`} >
                        <tr className="">
                            <td className="py-3 ">Company name</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                        <tr className="">
                            <td className="py-3 ">Number phone</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                        <tr className="">
                            <td className="py-3 ">Address</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                        <tr className="">
                            <td className="py-3 ">Email</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                        <tr className="">
                            <td className="py-3 ">Website</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                    </table> */}
                    <table className={`w-full`}>
                        <tr className="">
                            <td className="py-3">Company name</td>
                            <td> : <span className="ml-5">{data?.name || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Number phone</td>
                            <td> : <span className="ml-5">{data?.phone_number || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">address</td>
                            <td> : <span className="ml-5">{data?.address || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">email</td>
                            <td> : <span className="ml-5">{data?.email || '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">website</td>
                            <td> : <span className="ml-5">{data?.website || '--'}</span></td>
                        </tr>
                    </table>
                </div>
                <div className="col-span-1">
                    {/* <table className="w-full">
                        <tr className="">
                            <td className="py-3 ">City</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                        <tr className="">
                            <td className="py-3 ">Country</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                        <tr className="">
                            <td className="py-3 ">Industry</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                        <tr className="">
                            <td className="py-3 ">Province</td>
                            <td className="flex items-center gap-3 py-3 "> : <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div></td>
                        </tr>
                    </table> */}
                    <table className="w-full">
                        <tr className="">
                            <td className="py-3">City</td>
                            <td> : <span className="ml-5">{data?.city ?? '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Country</td>
                            <td> : <span className="ml-5">{data?.country ?? '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Industry</td>
                            <td> : <span className="ml-5">{data?.industry ?? '--'}</span></td>
                        </tr>
                        <tr>
                            <td className="py-3">Provience</td>
                            <td> : <span className="ml-5">{data?.province ?? '--'}</span></td>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
               <div>
               <h2 className="text-xl font-medium dark:text-white mb-4">Company branch</h2>
               <TabelForCompany data={dataBranches} dataHeading={dataHeading} handleEdit={handleEdit} routes={'companies/{companyId}/branches'}/>
               </div>
               <div>
                <h2 className="text-xl font-medium dark:text-white mb-4">Company department</h2>
               <TabelForCompany data={dataDepartments} dataHeading={dataHeading} handleEdit={handleEdit} routes={'companies/{companyId}/departments'}/>
               </div>
            </div>
            <hr className="my-7" />
        </section>
        </>
    )
}