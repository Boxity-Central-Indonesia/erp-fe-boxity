import { useState, useRef } from "react";
import { inputBody } from "./inputBody";
import { createCompany } from "./CreateCompany";

export const modalCompany = () => {
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

    const dataBody = {
        name: refBody.nameRef.current.value,
        email: refBody.emailRef.current.value,
        phone_number: refBody.phone_numberRef.current.value,
        website: refBody.websiteRef.current.value,
        address: refBody.addressRef.current.value,
        city: refBody.cityRef.current.value,
        province: refBody.provinceRef.current.value,
        postal_code: refBody.postal_codeRef.current.value,
        country: refBody.countryRef.current.value,
        industry: refBody.industryRef.current.value,
        description: refBody.descriptionRef.current.value,
        id: refBody.idRef.current.value,
    }

    createCompany({endPoint: 'companies', })

    const [dataModal, setDataModal] = useState({
        size: "6xl",
          labelModal: "Add New companies",
          labelBtnModal: "Add new companies",
          labelBtnSecondaryModal: "Back",
        //   handleBtn: create,
    });
    const [openModal, setOpenModal] = useState(false)

    const dataModalBody = () => {
        return (
            <>
                <form className="">
                    <input type="hidden" name="id" />
                    {inputBody({param: 'companies', refBody})}
                </form>

            </>
        )
    }


    return {
        dataModal,
        setDataModal,
        openModal,
        setOpenModal,
        dataModalBody
    }
}