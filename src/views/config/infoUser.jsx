import { Children, createContext, useContext, useState, useEffect } from 'react';
import { getApiData } from '../../function/Api';



const InfoUserContext = createContext()

export const InfoUserProvider = ({children}) => {
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        const getData = async() => {
            try {
                const {data, status} = await getApiData('profile')
                if(status === 200){
                    setDataUser(data)
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [])

    return (
        <InfoUserContext.Provider value={{dataUser}}>
            {children}
        </InfoUserContext.Provider>
    )
}

export const getProfile = () => {
    return useContext(InfoUserContext)
}