import { useState, useEffect, useRef } from "react";
import FormInput from "../../../../../layouts/FormInput";
import { TextArea } from "../../../../../layouts/FormInput";


export const inputBody = ({
  parameter, 
  refBody, 
  validationError,
  setDataEdit,
  dataEdit
}) => {
    const [inputCompanies, setInputCompanies] = useState([]);
    const [inputBranch, setInputBranch] = useState();
    const [inputDepartments, setInputDepartments] = useState();

    const handleChange = (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
    
        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
          ...prevDataEdit,
          [name]: value,
        }));
    };


  useEffect(() => {
    setInputCompanies([
      {
        element: "input",
        type: "text",
        name: "name",
        ref: refBody.nameRef,
        value: dataEdit.name,
        label: "Name",
        htmlFor: "name",
        id: "name",
        onchange: handleChange,
        placeholder: "Name",
      },
      {
        element: "input",
        type: "email",
        name: "email",
        ref: refBody.emailRef,
        value: dataEdit.email,
        label: "Email",
        htmlFor: "email",
        id: "email",
        onchange: handleChange,
        placeholder: "Email",
      },
      {
        element: "input",
        type: "text",
        name: "phone_number",
        ref: refBody.phone_numberRef,
        value: dataEdit.phone_number,
        label: "Phone number",
        htmlFor: "phone_number",
        id: "phone_number",
        onchange: handleChange,
        placeholder: "Phone number",
      },
      // {
      //     element: 'select',
      //     ref: refBody.company_idRef,
      //     name: 'company_id',
      //     label: 'Companies',
      //     htmlFor: 'categori companies',
      //     id: 'categori companies',
      //     dataSelect: dataCompanies,
      //     value: dataEdit.company_id,
      //     onchange: handleChangeAndGetDepartment
      // },
      {
        element: "input",
        type: "text",
        name: "website",
        ref: refBody.websiteRef,
        value: dataEdit.website,
        label: "Website",
        htmlFor: "website",
        id: "website",
        onchange: handleChange,
        placeholder: "Website",
      },
      {
        element: "input",
        type: "text",
        name: "address",
        ref: refBody.addressRef,
        value: dataEdit.address,
        label: "Address",
        htmlFor: "address",
        id: "address",
        onchange: handleChange,
        placeholder: "Address",
      },
      {
        element: "input",
        type: "text",
        name: "city",
        ref: refBody.cityRef,
        value: dataEdit.city,
        label: "City",
        htmlFor: "city",
        id: "city",
        onchange: handleChange,
        placeholder: "City",
      },
      {
        element: "input",
        type: "text",
        name: "province",
        ref: refBody.provinceRef,
        value: dataEdit.province,
        label: "Province",
        htmlFor: "province",
        id: "province",
        onchange: handleChange,
        placeholder: "Province",
      },
      {
        element: "input",
        type: "number",
        name: "postal_code",
        ref: refBody.postal_codeRef,
        value: dataEdit.postal_code,
        label: "Postal Code",
        htmlFor: "postal_code",
        id: "postal_code",
        onchange: handleChange,
        placeholder: "Postal Code",
      },
      {
        element: "input",
        type: "text",
        name: "country",
        ref: refBody.countryRef,
        value: dataEdit.country,
        label: "Country",
        htmlFor: "country",
        id: "country",
        onchange: handleChange,
        placeholder: "Country",
      },
      {
        element: "input",
        type: "text",
        name: "industry",
        ref: refBody.industryRef,
        value: dataEdit.industry,
        label: "Industry",
        htmlFor: "industry",
        id: "industry",
        onchange: handleChange,
        placeholder: "Industry",
      },
    ]);

    setInputBranch([
      {
        element: "input",
        type: "text",
        name: "name",
        ref: refBody.nameRef,
        value: dataEdit.name,
        label: "Name",
        htmlFor: "name",
        id: "name",
        onchange: handleChange,
        placeholder: "Name",
      },
      {
        element: "input",
        type: "text",
        name: "address",
        ref: refBody.addressRef,
        value: dataEdit.address,
        label: "Address",
        htmlFor: "address",
        id: "address",
        onchange: handleChange,
        placeholder: "Address",
      },
      {
        element: "input",
        type: "text",
        name: "phone_number",
        ref: refBody.phone_numberRef,
        value: dataEdit.phone_number,
        label: "Phone number",
        htmlFor: "phone_number",
        id: "phone_number",
        onchange: handleChange,
        placeholder: "Phone number",
      },
      {
        element: "input",
        type: "text",
        name: "email",
        ref: refBody.emailRef,
        value: dataEdit.email,
        label: "Email",
        htmlFor: "email",
        id: "email",
        onchange: handleChange,
        placeholder: "Email",
      },
      // {
      //     element: 'input',
      //     type: 'hidden',
      //     name: 'company_id',
      //     ref: refBody.company_idRef,
      //     value: dataEdit.company_id,
      //     label: 'Company',
      //     htmlFor: 'company_id',
      //     id: 'company_id',
      //     onchange: handleChange,
      //     // placeholder: 'Company',
      // },
      // {
      //     element: 'select',
      //     ref: refBody.company_idRef,
      //     name: 'company_id',
      //     label: 'Companies',
      //     htmlFor: 'categori companies',
      //     id: 'categori companies',
      //     // dataSelect: dataCompanies,
      //     value: dataEdit.company_id,
      //     onchange: handleChange
      // },
    ]);

    setInputDepartments([
      {
        element: "input",
        type: "text",
        name: "name",
        ref: refBody.nameRef,
        value: dataEdit.name,
        label: "Name",
        htmlFor: "name",
        id: "name",
        onchange: handleChange,
        placeholder: "Name",
      },
      {
        element: "input",
        type: "text",
        name: "responsibilities",
        ref: refBody.responsibilitiesRef,
        value: dataEdit.responsibilities,
        label: "Responsibilities",
        htmlFor: "responsibilities",
        id: "responsibilities",
        onchange: handleChange,
        placeholder: "Responsibilities",
      },
    ]);
  }, [dataEdit]);

    if (parameter === "companies") {
      return (
        <>
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-3">
            {inputCompanies.map((item, index) => (
              <FormInput
                key={item.id}
                element={item.element}
                htmlFor={item.htmlFor}
                label={item.label}
                type={item.type}
                name={item.name}
                referens={item.ref}
                value={item.value}
                id={item.id}
                onChange={(event) => item.onchange(event)}
                placeholder={item.placeholder}
                dataSelect={item.dataSelect}
                uniqueId={index}
                validationError={validationError}
              />
            ))}
            <TextArea
              span={`col-span-3`}
              label={"Description"}
              htmlFor={"description"}
              id={"description"}
              name={"description"}
              referens={refBody.descriptionRef}
              value={dataEdit.description}
              onChange={handleChange}
              placeholder={"Write description here"}
            />
          </div>
        </>
      );
    } else if (
      // defaultEdit == false &&
      parameter === "companies/{companyId}/branches"
    ) {
      return (
        <>
          <input
            type="hidden"
            name="company_id"
            // value={idDelete}
            // ref={refBody.company_idRef}
          />
          <input
            type="hidden"
            name="id"
            // value={dataEdit.idBranch}
            // ref={refBody.idBranchRef}
          />
          <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
            {inputBranch.map((item, index) => (
              <FormInput
                key={item.id}
                element={item.element}
                htmlFor={item.htmlFor}
                label={item.label}
                type={item.type}
                name={item.name}
                referens={item.ref}
                value={item.value}
                id={item.id}
                onChange={(event) => item.onchange(event)}
                placeholder={item.placeholder}
                dataSelect={item.dataSelect}
                uniqueId={index}
                validationError={validationError}
              />
            ))}
          </div>
        </>
      );
    } else if (
      // defaultEdit == false &&
      parameter === "companies/{companyId}/departments"
    ) {
      return (
        <>
          <input
            type="hidden"
            name="company_id"
            value={idDelete}
            ref={refBody.company_idRef}
          />
          <input
            type="hidden"
            name="id"
            value={dataEdit.idDepartments}
            ref={refBody.idDepartmentsRef}
          />
          <div className="grid gap-4 mb-4 grid-cols-1">
            {inputDepartments.map((item, index) => (
              <FormInput
                key={item.id}
                element={item.element}
                htmlFor={item.htmlFor}
                label={item.label}
                type={item.type}
                name={item.name}
                referens={item.ref}
                value={item.value}
                id={item.id}
                onChange={(event) => item.onchange(event)}
                placeholder={item.placeholder}
                dataSelect={item.dataSelect}
                uniqueId={index}
                validationError={validationError}
              />
            ))}
          </div>
        </>
      );
    }
  };