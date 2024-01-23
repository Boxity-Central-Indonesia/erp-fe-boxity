import { getApiData } from "../../../function/Api"
import TabelComponent from "../layouts/Tabel"
import IconAdd from "../layouts/icons/IconAdd"
import { useEffect, useState } from "react"


const EmployesList= () => {
    const [openModal, setOpenModal] = useState('false')
    const [data, setData] = useState()

    const toggleOpenModal = () => {
        setOpenModal(!openModal)
    }


    // get employes 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApiData('employees')
                const newData = response.data.map(item => ({
                    id: item.id,
                    company: item.name
                 }))

                 setDataCompanies(() => newData)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [])

    // get employes end


    // create

    const handelCreate = () => {
        toggleOpenModal()
    }

    // create end
    

    const dataHeading = [
        {
            label: 'Add Employes',
            icon: IconAdd(),
            heading: 'Employes list',
            eventToggleModal: handelCreate,
        }
    ]
    return(
        < TabelComponent data={data} dataHeading={dataHeading} />
    )
}


export default EmployesList