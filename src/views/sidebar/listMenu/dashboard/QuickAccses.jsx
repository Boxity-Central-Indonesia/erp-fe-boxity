import { useState } from "react"
import { useColor } from "../../../conifg/GlobalColour";


export const QuickAcces = () => {
    const { globalColor, changeColor } = useColor();
    const [data, setData] = useState([
        {
            label: 'Order',
            icon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
            </svg>
,
            information: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia ab, quibusdam, cum eos fugit explicabo',
            button: [
                {
                    button1: 'Create order',
                    eventListener: '',
                },
                {
                    button1: 'See order',
                    eventListener: '',
                },
            ]
        },
        {
            label: 'Product',
            icon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
            </svg>
,
            information: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia ab, quibusdam, cum eos fugit explicabo',
            button: [
                {
                    button1: 'Create product',
                    eventListener: '',
                },
                {
                    button1: 'See product',
                    eventListener: '',
                },
            ]
        },
        {
            label: 'Order',
            icon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
            </svg>
,
            information: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia ab, quibusdam, cum eos fugit explicabo',
            button: [
                {
                    button1: 'Create order',
                    eventListener: '',
                },
                {
                    button1: 'See order',
                    eventListener: '',
                },
            ]
        },
        {
            label: 'Order',
            icon: <svg style={{color: globalColor}} className="w-6 h-6" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
            </svg>
,
            information: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia ab, quibusdam, cum eos fugit explicabo',
            button: [
                {
                    button1: 'Create order',
                    eventListener: '',
                },
                {
                    button1: 'See order',
                    eventListener: '',
                },
            ]
        },
    ])


    return(
        <>
            <h1 className="text-3xl mb-4 font-medium">Quick access</h1>
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {data && data.map((item,index) => (
                    <div className="border rounded-md p-5 bg-white flex flex-col items-center">
                        <div className="bg-[#f95b1240] p-3 rounded-md">
                            {item.icon}
                        </div>
                        <h2 className="my-3 text-xl font-medium">{item.label}</h2>
                        <p className="text-center text-gray-500 text-sm mb-3">{item.information}</p>
                        <div className="flex gap-1">
                            <button className="border py-2 px-3 text-sm rounded-md text-gray-700">
                                {item.button[1].button1}
                            </button>
                            <button style={{backgroundColor: globalColor}} className="border text-white py-2 px-3 text-sm rounded-md text-gray-700">
                                {item.button[0].button1}
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}