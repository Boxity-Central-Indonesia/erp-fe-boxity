import IconAdd from "../layouts/icons/IconAdd"
import {useColor} from "../config/GlobalColour"


export const Drawer = ({
    openDrawer,
    setOpenDrawer,
    withDrawer,
    titleDrawer,
    bodyDrawer,
    eventButton
}) => {

    const classOpen = `fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none border pt-24 ${withDrawer ?? `w-[30%]`}`;

    const classClosed =
        "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800";

    const closeDrawer = () => {
        setOpenDrawer(false);
        // setSelectedCheckbox(null);
    };

    const { globalColor, changeColor } = useColor();

    return (
        <>
            <div id="drawer-right-example" className={`${openDrawer ? classOpen : classClosed} px-0`} tabIndex="-1"
                aria-labelledby="drawer-right-label">
                <div className="flex justify-between items-center mb-4 px-5">
                    <h5 id="drawer-right-label"
                        className="inline-flex items-center text-xl font-semibold dark:text-gray-400">
                        {titleDrawer}
                    </h5>
                    {/* <button onClick={()=> downloadReport({endPoint: 'download/orders/' + dataDrawer.id})}
                        style={{backgroundColor: globalColor}} className="flex gap-1 border py-2.5 px-4 rounded-md">
                        <IconPrint />
                        <p className="text-sm text-white">Print</p>
                    </button> */}
                </div>
                <button onClick={closeDrawer} type="button" data-drawer-hide="drawer-right-example"
                    aria-controls="drawer-right-example"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-16 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div>
                {bodyDrawer}
                </div>
            </div>
            <div drawer-backdrop="" className={`bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 ${openDrawer ? `` : `hidden`}`}></div>
        </>
    )
}