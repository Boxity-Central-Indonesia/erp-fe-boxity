import { PieChart } from "./chart/pieChart";
import { useColor } from "../../../config/GlobalColour";
import { DropdownForLineChart } from "./chart/lineChart";


export const MostSales = () => {
    const { globalColor, changeColor } = useColor();

    return(
        <>
            <div className="bg-white h-fit p-5 rounded-md border">
                <div className="font-semibold text-xl">Most Sales</div>
                <div className="my-3 flex items-center justify-center">
                    <PieChart />
                </div>
                <hr className="my-3" />
                <div className="mt-7 mb-3 flex items-center justify-between">
                    <DropdownForLineChart />
                    <div style={{ color: globalColor }} className="flex items-center cursor-pointer">
                        <p className="text-xs capitalize">See more detail</p>
                        <svg className="w-5 h-5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 30 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m9 5 7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}