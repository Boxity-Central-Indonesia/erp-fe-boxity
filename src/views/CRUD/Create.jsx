import {postApiData} from '../../function/Api'
import { useState, useEffect } from 'react';

export const Create = ({endPoint, setOpenModal, dataBody }) => {
    const [validationError, setValidationError] = useState();
    const [responseError, setResponseError] = useState();

    useEffect(() => {
        if (!!responseError) {
          setValidationError({
            name: responseError?.name?.[0] || "",
            email: responseError?.email?.[0] || "",
            phone_number: !!responseError.phone_number
              ? responseError.phone_number[0]
              : "",
            company_id: !!responseError.company_id
              ? responseError.company_id[0]
              : "",
            job_title: !!responseError.job_title ? responseError.job_title[0] : "",
            date_of_birth: !!responseError.date_of_birth
              ? responseError.date_of_birth[0]
              : "",
            employment_status: !!responseError.employment_status
              ? responseError.employment_status[0]
              : "",
            hire_date: !!responseError.hire_date ? responseError.hire_date[0] : "",
            termination_date: !!responseError.termination_date
              ? responseError.termination_date[0]
              : "",
            address: !!responseError.address ? responseError.address[0] : "",
            city: !!responseError.city ? responseError.city[0] : "",
            province: !!responseError.province ? responseError.province[0] : "",
            postal_code: !!responseError.postal_code
              ? responseError.postal_code[0]
              : "",
            country: !!responseError.country ? responseError.country[0] : "",
            emergency_contact_name: !!responseError.emergency_contact_name
              ? responseError.emergency_contact_name[0]
              : "",
            emergency_contact_phone_number:
              !!responseError.emergency_contact_phone_number
                ? responseError.emergency_contact_phone_number[0]
                : "",
            notes: !!responseError.notes ? responseError.notes[0] : "",
            department_id: !!responseError.department_id
              ? responseError.department_id[0]
              : "",
          });
        }
      }, [responseError]);

    const create = async () => {
        try {
            const {data, status} = await postApiData(endPoint, dataBody)
            if(status === 201) {
                setOpenModal(prevOpenModal => !prevOpenModal)
            }
        } catch (error) {
            console.log(error);
            setResponseError(error.response.data.errors);
        }
    }
    create()

    return{
        validationError,
        setValidationError
    }
};