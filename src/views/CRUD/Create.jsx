import {postApiData} from '../../function/Api'
import { useState, useEffect } from 'react';


export const Create = ({endPoint, setOpenModal, dataBody }) => {
    const [data, setData] = useState('');

    useEffect(() => {
        const postData = async () => {
            try {
                const { data: responseData, status } = await postApiData(endPoint, dataBody);
                if (status === 201) {
                    setOpenModal((prevOpenModal) => !prevOpenModal);
                }
            } catch (error) {
                console.log(error);
            }
        };
        postData();
    }, [endPoint]);

    return {
        data
    };
};