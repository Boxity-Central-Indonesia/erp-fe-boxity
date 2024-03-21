import { useState } from "react"
import { useColor } from "../../../config/GlobalColour";


export const QuickAcces = () => {
    const { globalColor, changeColor } = useColor();
    const [data, setData] = useState([
        {
            label: 'Order',
            icon: <svg style={{color: globalColor}} className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
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
            icon:<svg style={{color: globalColor}} className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.013 6.175 7.006 9.369l5.007 3.194-5.007 3.193L2 12.545l5.006-3.193L2 6.175l5.006-3.194 5.007 3.194ZM6.981 17.806l5.006-3.193 5.006 3.193L11.987 21l-5.006-3.194Z"/>
                    <path d="m12.013 12.545 5.006-3.194-5.006-3.176 4.98-3.194L22 6.175l-5.007 3.194L22 12.562l-5.007 3.194-4.98-3.211Z"/>
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
            label: 'Report',
            icon: <svg style={{color: globalColor}} className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
                </svg>,
            information: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia ab, quibusdam, cum eos fugit explicabo',
            button: [
                {
                    button1: 'See sales report',
                    eventListener: '',
                },
                {
                    button1: 'See purchase report',
                    eventListener: '',
                },
            ]
        },
        {
            label: 'Good receipt',
            icon: <svg style={{color: globalColor}} className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
                </svg>,
            information: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia ab, quibusdam, cum eos fugit explicabo',
            button: [
                {
                    button1: 'Create good receipt',
                    eventListener: '',
                },
                {
                    button1: 'See good receipt',
                    eventListener: '',
                },
            ]
        },
    ])


    return(
        <>
            <h1 className="text-xl mb-3 font-medium">Quick access</h1>
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