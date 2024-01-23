import { getApiData } from "../../../function/Api"

const Fetch = async () => {
    try {
        const response = await getApiData('company/list')
        const newData = response.data.map(item => ({
            id: item.id,
            company: item.name,
            email: item.email
          }));

        return newData;
    } catch (error) {
        console.log(error);
    }   
}


export default Fetch