import { useState } from 'react'
import {Read} from '../../../../../CRUD/Read'


export const ReadCompany = () => {
    const dataTabel = (data) => {
        return data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            address: item.address,
            "phone number": item.phone_number,
        }))
    }

    const {data} = Read({dataTabel, endPoint: 'companies' })

    return{
        data,
    }

}