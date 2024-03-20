import { useEffect, useState } from 'react'
import {Read} from '../../../../../CRUD/Read'
import IconAdd from '../../../../../layouts/icons/IconAdd'


export const ReadCompany = ({
    refresh, 
    setDataHeading, 
    setOpenModal, 
    openModal,
    data,
    setData,
    setParameter
}) => {
    const dataTabel = (data) => {
        return data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            address: item.address,
            "phone number": item.phone_number,
        }))
    }
    
    const handleOpenModal = (param) => {
        setOpenModal(!openModal)
        if(param == undefined){
            setParameter('companies')
        }else{
            setParameter(param)
        }
        
    }

   useEffect(() => {
    setDataHeading([
        {
            label: 'Add company',
            icon: IconAdd(),
            heading: "Company list",
            information:
            "A company list is a directory or database of companies, often organized by industry, location, size, or other relevant criteria.  It's valuable for finding potential partners, suppliers, customers, or competitors. Company lists can also help  with market research, job searches, and investment opportunities.  Depending on the platform, you may be able to filter company lists, view company profiles with contact information, and get insights into their financial performance.",
            eventToggleModal: handleOpenModal,
            // onclick: handleClickHeading,
        }
    ])
   }, [])

   useEffect(() => {
    Read({
        dataTabel, 
        endPoint: 'companies', 
        refresh,
        data,
        setData
    })
   }, [refresh])
}