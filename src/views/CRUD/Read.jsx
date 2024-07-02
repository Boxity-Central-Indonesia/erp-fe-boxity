import {getApiData} from '../../function/Api'

export const Read = ({ 
    dataTabel, 
    endPoint, 
    setData,
    setDataDetail
}) => {
    const fetchData = async () => {
        try {
            const { data: responseData, status } = await getApiData(endPoint);
            if (status === 200) {
                const newData = dataTabel?.(responseData);
                setData?.(newData);
                setDataDetail?.(responseData)
            }
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();   
};