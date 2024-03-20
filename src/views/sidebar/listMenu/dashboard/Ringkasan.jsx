import { useState } from "react"
import { useColor } from "../../../conifg/GlobalColour";


export const Ringkasan = () => {

    const { globalColor, changeColor } = useColor();

    const [data, setData] = useState([
        {
            mainIcon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
            </svg>

           ,
            label: 'Total Sales',
            amount: 'Rp 500,000,000', 
            information: '50% Increase from last month',
            secondaryIcon: <svg className="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4" />
            </svg>
,
        },
        {
             mainIcon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                     d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
             </svg>
,
            label: 'Total Purchase',
            amount: 'Rp 500,000,000', 
            information: '50% Increase from last month',
            secondaryIcon: <svg className="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4" />
            </svg>
,
        },
        {
             mainIcon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                     d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
             </svg>
,
            label: 'Total Paid',
            amount: 'Rp 500,000,000', 
            information: '50% Increase from last month',
            secondaryIcon: <svg className="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4" />
            </svg>
,
        },
        {
             mainIcon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                     d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
             </svg>
,
            label: 'Total Profid',
            amount: 'Rp 500,000,000', 
            information: '50% Increase from last month',
            secondaryIcon: <svg className="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4" />
            </svg>
,
        },
    ])

    return (
        <>
            <h1 className="text-xl font-medium mb-3">Overall Summary</h1>
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {data && data.map((item, index) => (
                    <div className="rounded-md bg-white p-4 shadow-sm border">
                        <div className="flex gap-3 mb-5">
                            <div className="bg-[#f95b1240] p-2 rounded-md w-fit h-fit">
                                {item.mainIcon}
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-gray-600 text-sm">{item.label}</p>
                                    {item.secondaryIcon}
                                </div>
                                <h3 className="text-xl font-medium">{item.amount}</h3>
                            </div>
                        </div>
                        <div className="text-gray-600 text-sm">
                            {item.information}
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
    
}