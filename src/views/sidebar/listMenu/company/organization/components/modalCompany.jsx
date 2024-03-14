import React, { useState, useRef } from "react";
import { inputBody } from "./inputBody";
import { createCompany } from "./CreateCompany";

export const modalCompany = () => {
    const [openModal, setOpenModal] = useState(false);

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

    const create = () => {
        const { validationError } = createCompany({ endPoint: "companies", refBody });
        // Lakukan sesuatu dengan validationError jika diperlukan
    };

    const [dataModal, setDataModal] = useState({
        size: "6xl",
        labelModal: "Tambah Perusahaan Baru",
        labelBtnModal: "Tambah Perusahaan Baru",
        labelBtnSecondaryModal: "Kembali",
        handleBtn: create,
    });

    const dataModalBody = () => {
        return (
            <>
                <form className="">
                    <input type="hidden" name="id" />
                    {inputBody({ param: 'companies', refBody })}
                </form>
            </>
        );
    };

    return {
        dataModal,
        setDataModal,
        openModal,
        setOpenModal,
        dataModalBody
    };
};
