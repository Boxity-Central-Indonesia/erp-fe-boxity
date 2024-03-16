import { postApiData } from '../../function/Api';
import { useState, useEffect } from 'react';

export const Create = ({
  endPoint, 
  setOpenModal, 
  dataBody, 
  responseError, 
  setResponseError,
  setLoading,
  loading,
  setRefresh
}) => {

  const create = async () => {
      try {
          const {data, status} = await postApiData(endPoint, dataBody)
          if(status === 201) {
            setRefresh(prevRefresh => !prevRefresh)
            setOpenModal(prevOpenModal => !prevOpenModal)
            setLoading(!loading)
          }
      } catch (error) {
        setLoading(prevLoading => !prevLoading)
        setResponseError(error.response.data.errors);
      }
  }

  create()

  return {
    responseError
  };
};
