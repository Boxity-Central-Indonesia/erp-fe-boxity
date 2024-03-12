import { useState } from "react"
import TabelComponent from "../../../../layouts/Tabel"
import IconDownload from "../../../../layouts/icons/IconDownload"
import { Read } from "../read";
import { downloadReport } from "../downloadReport";


export const LeadsProspek = () => {
    
    const dataTabel = (data) => {
        return data.map(item => ({
            "prospek name": item.nama_prospek,
            email: item.email_prospek,
            "phone number": item.nomor_telepon_prospek,
            type: item.tipe_prospek,
        }))
    }

    const {data} = Read({dataTabel, endPoint: 'leads-report'})
    const print = () => {
        downloadReport("download/")
    }
    const [dataHeading, setDataHeading] = useState( [{
        label: 'Print report',
        icon: IconDownload(),
        heading: 'Leads Report',
        eventToggleModal: downloadReport,
    }]);


    return (
        <>
        < TabelComponent data={data}  dataHeading={dataHeading}/>
        </>
    )

}