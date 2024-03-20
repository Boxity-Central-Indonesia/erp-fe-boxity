import { ComboChart } from "./chart/ComboChart"

export const GrossSales = () => {


    return(
        <>
            <section className="bg-white rounded-md border p-5">
                <h1 className="text-xl font-semibold">Gross sales</h1>
                <ComboChart/>
            </section>
        </>
    )
}