import React, { useState, useRef, useEffect } from "react";
import { inputBody } from "./inputBody";
import { createCompany } from "./CreateCompany";

export const modalCompany = ({
  defaultEdit,
  setDefaultEdit
}) => {
    const [parameter, setParameter] = useState('companies')
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
            website: !!responseError.website
              ? responseError.website[0]
              : "",
            job_title: !!responseError.job_title ? responseError.job_title[0] : "",
            address: !!responseError.address ? responseError.address[0] : "",
            city: !!responseError.city ? responseError.city[0] : "",
            province: !!responseError.province ? responseError.province[0] : "",
            postal_code: !!responseError.postal_code
              ? responseError.postal_code[0]
              : "",
            country: !!responseError.country ? responseError.country[0] : "",
            industry: !!responseError.industry ? responseError.industry[0] : "",
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
        handleBtn: () => createCompany({  endPoint: "companies",
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
                    {inputBody({parameter, refBody, validationError, dataEdit, setDataEdit})}
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
        setParameter,
        setDataModal
    };
};
