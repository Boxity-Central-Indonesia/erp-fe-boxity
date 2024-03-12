import { useEffect, useState } from 'react';
import { getApiData } from '../../../../function/Api';

export const Read = ({ dataTabel, endPoint }) => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: responseData, status } = await getApiData(endPoint);
                if (status === 200) {
                    const newData = dataTabel(responseData);
                    setData(newData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [endPoint]);

    return {
        data
    };
};
