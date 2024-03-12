import {getApiData} from '../../../../../function/Api'


export const Read = () => {
    const getData = async () => {
        try {
            const {data, status} = await getApiData('businesses')
            if(status === 200) {
                
            }
        } catch (error) {
            
        }
    }
}