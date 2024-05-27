import { useState, useEffect } from "react"
import TabelComponent from "../../../../layouts/Tabel"
import IconDownload from "../../../../layouts/icons/IconDownload"
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import { Spinner } from "../../../../layouts/Spinner";


export const LeadsProspek = () => {
    
    const dataTabel = (data) => {
        return data.map(item => ({
            "prospek name": item.nama_prospek,
            email: item.email_prospek,
            "phone number": item.nomor_telepon_prospek,
            type: item.tipe_prospek,
        }))
    }

    const {data, loading, setRefresh, setLoading} = Read({dataTabel, endPoint: 'leads-report'})

    useEffect(() => {
        document.title = 'Laporan Leads - DHKJ Manufacturer'
      }, [])

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
        <Spinner loading={loading} />
        < TabelComponent data={data}  dataHeading={dataHeading} setRefresh={setRefresh} setLoading={setLoading} useReportCondition={true}/>
        </>
    )

}