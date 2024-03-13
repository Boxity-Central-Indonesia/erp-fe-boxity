import { ReadCompany } from "./ReadCompany"
import { useState } from "react"
import IconAdd from '../../../../../layouts/icons/IconAdd'
import { modalCompany } from "./modalCompany"


export const index = () => {
    const {
        setDataModal,
        dataModal,
        setOpenModal,
        openModal,
        dataModalBody
    } = modalCompany()

    const [dataHeading, setDataHeading] = useState([{
        label: 'Add company',
        icon: IconAdd(),
        heading: "Company list",
        information:
          "A company list is a directory or database of companies, often organized by industry, location, size, or other relevant criteria.  It's valuable for finding potential partners, suppliers, customers, or competitors. Company lists can also help  with market research, job searches, and investment opportunities.  Depending on the platform, you may be able to filter company lists, view company profiles with contact information, and get insights into their financial performance.",
        eventToggleModal: () => setOpenModal(!openModal),
        // onclick: handleClickHeading,
    }])
   

    const {data} = ReadCompany()
    
    
    return{
        data,
        dataHeading,
        dataModal,
        openModal,
        setOpenModal,
        dataModalBody
    }
}