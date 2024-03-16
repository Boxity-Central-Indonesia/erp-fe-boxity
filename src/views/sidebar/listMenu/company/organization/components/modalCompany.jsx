import React, { useState, useRef, useEffect } from "react";
import { inputBody } from "./inputBody";
import { createCompany } from "./CreateCompany";

export const modalCompany = ({
  defaultEdit,
  setDefaultEdit
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [responseError, setResponseError] = useState();
    const [validationError, setValidationError] = useState();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false)
    const [dataEdit, setDataEdit] = useState({});


    const [refBody, setRefBody] = useState({
        nameRef: useRef(),
        emailRef: useRef(),
        phone_numberRef: useRef(),
        websiteRef: useRef(),
        addressRef: useRef(),
        cityRef: useRef(),
        provinceRef: useRef(),
        postal_codeRef: useRef(),
        countryRef: useRef(),
        idRef: useRef(),
        industryRef: useRef(),
        descriptionRef: useRef(),
        company_idRef: useRef(),
        responsibilitiesRef: useRef(),
        idBranchRef: useRef(),
        idDepartmentsRef: useRef(),
    });


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


    useEffect(() => {
      setValidationError({});
      if(defaultEdit === true){
        setDataEdit({})
      }
    }, [openModal])

    

    const [dataModal, setDataModal] = useState({
        size: "6xl",
        labelModal: "Add new companies",
        labelBtnModal: "Add new companies",
        labelBtnSecondaryModal: "Back",
        handleBtn: () => createCompany({    endPoint: "companies",
                                            refBody, 
                                            responseError, 
                                            setResponseError, 
                                            setLoading, 
                                            loading,
                                            refresh,
                                            setRefresh,
                                            setOpenModal
                                        }),
    });

    const dataModalBody = () => {
        return (
            <>
                <form className="">
                    <input type="hidden" name="id" ref={refBody.idRef} value={dataEdit.id}/>
                    {inputBody({ param: 'companies', refBody, validationError, dataEdit, setDataEdit})}
                </form>
            </>
        );
    };

    return {
        dataModal,
        setDataModal,
        openModal,
        setOpenModal,
        dataModalBody,
        loading,
        refresh,
        setRefresh,
        setDataEdit,
        refBody,
        setResponseError,
        setLoading,
    };
};
