import { useEffect, useState } from 'react';
import { getApiData } from '../../../../function/Api';

export const Read = ({ dataTabel, endPoint }) => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        document.title = 'Laporan Piutang - DHKJ Manufacturer'
        const fetchData = async () => {
            try {
                const { data: responseData, status } = await getApiData(endPoint);
                if (status === 200) {
                    const newData = dataTabel(responseData);
                    setData(newData);
                    setLoading(true)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [endPoint, refresh]);

    return {
        data,
        setLoading,
        setRefresh,
        loading
    };
};
