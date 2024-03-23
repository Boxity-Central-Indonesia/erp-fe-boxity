import FormInput from "../../../../../layouts/FormInput";
import { useState, useEffect } from "react";
import { TextArea } from "../../../../../layouts/FormInput";
import { TabelForActivityType } from "./TabelForActivityType";

export const inputBody = ({
    parameter, 
    refBody, 
    validationError,
    setDataEdit,
    dataEdit,
    dataOrder,
    dataProduct,
    defaultEdit,
    setDataDetailsActivity,
    dataDetailsActivity,
    dataProcces,
    dataFindProcces,
    setDataFindProcces
  }) => {
    const [input, setInput] = useState([]);
    const [inputEdit, setInputEdit] = useState([])

    const activity_type =  dataProcces && dataProcces.map(item => ({
        name: item?.activity_type
    }))

  
      const handleChange = (event) => {
          // Mendapatkan nama dan nilai input yang berubah
          const { name, value } = event.target;
      
          // Memperbarui state sesuai dengan nilai input yang berubah
          setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
          }));
      };

     


      const searchDataByActivityType = (searchActivityType) => {
        // Cari objek yang memiliki activity_type yang cocok
        const foundData = dataProcces.find(data => data.activity_type === searchActivityType);
    
        // Jika objek ditemukan, kembalikan objek tersebut
        if (foundData) {
            return foundData;
        } else {
            // Jika tidak ditemukan, kembalikan null atau pesan kesalahan sesuai kebutuhan
            return null; // atau throw new Error('Data not found');
        }
      };


      const handleChangeAndFindProccesActivities = (event) => {
         // Mendapatkan nama dan nilai input yang berubah
         const { name, value } = event.target;


        setDataFindProcces(searchDataByActivityType(value).details)

         // Memperbarui state sesuai dengan nilai input yang berubah
         setDataEdit((prevDataEdit) => ({
           ...prevDataEdit,
           [name]: value,
         }));
      }
  
  
      useEffect(() => {
        setInput([
          {
            element: "select",
            name: "order_id",
            ref: refBody.order_idRef,
            value: dataEdit.order_id,
            label: "Order",
            htmlFor: "order_id",
            id: "order_id",
            dataSelect: dataOrder,
            onchange: handleChange,
          },
          // {
          //   element: "input",
          //   type: "text",
          //   name: "estimated_completion",
          //   ref: refBody.estimated_completionRef,
          //   value: dataEdit.estimated_completion,
          //   label: "Estimated_completion",
          //   htmlFor: "estimated_completion",
          //   id: "estimated_completion",
          //   onchange: handleChange,
          //   placeholder: "Estimated_completion",
          // },
        ]);
    
        setInputEdit([
          {
            element: "select",
            name: "order_id",
            ref: refBody.order_idRef,
            value: dataEdit.order_id,
            label: "Order",
            htmlFor: "order_id",
            id: "order_id",
            dataSelect: dataOrder,
            onchange: handleChange,
          },
          {
            element: "select",
            name: "product_id",
            ref: refBody.product_idRef,
            value: dataEdit.product_id,
            label: "Order",
            htmlFor: "product_id",
            id: "product_id",
            dataSelect: dataProduct,
            onchange: handleChange,
          },
          {
            element: "select",
            name: "activity_type",
            ref: refBody.activity_typeRef,
            value: dataEdit.activity_type,
            label: "Activity type",
            htmlFor: "activity_type",
            id: "activity_type",
            dataSelect: activity_type,
            onchange: handleChangeAndFindProccesActivities,
          },
        //   {
        //     element: "input",
        //     type: "time",
        //     name: "unloading_time",
        //     ref: refBody.unloading_timeRef,
        //     value: dataEdit.unloading_time,
        //     label: "Unloading time",
        //     htmlFor: "unloading_time",
        //     id: "unloading_time",
        //     onchange: handleChange,
        //     placeholder: "Unloading time",
        //   },
        //   {
        //     element: "input",
        //     type: "number",
        //     name: "number_of_rack",
        //     ref: refBody.number_of_rackRef,
        //     value: dataEdit.number_of_rack,
        //     label: "Number of rack",
        //     htmlFor: "number_of_rack",
        //     id: "number_of_rack",
        //     onchange: handleChange,
        //     placeholder: "Number of rack",
        //   },
        //   {
        //     element: "input",
        //     type: "number",
        //     name: "number_of_animals",
        //     ref: refBody.number_of_animalsRef,
        //     value: dataEdit.number_of_animals,
        //     label: "Number of animals",
        //     htmlFor: "number_of_animals",
        //     id: "number_of_animals",
        //     onchange: handleChange,
        //     placeholder: "Number of animals",
        //   },
        ])
      }, [dataEdit]);
    
  
      if (defaultEdit) {
        return (
          <>
            <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
              {input.map((item, index) => (
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
      }else {
        return(
            <>
            <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2">
              {inputEdit.map((item, index) => (
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
              <div className="col-span-2 mt-3">
                <TabelForActivityType 
                  dataFindProcces={dataFindProcces} 
                  setDataFindProcces={setDataFindProcces}
                  setDataDetailsActivity={setDataDetailsActivity}
                  dataDetailsActivity={dataDetailsActivity}
                  // handleChangeValues={handleChangeValues}
                />
              </div>
              {/* <TextArea
                span={`col-span-3`}
                label={"Description"}
                htmlFor={"description"}
                id={"description"}
                name={"description"}
                referens={refBody.descriptionRef}
                value={dataEdit.description}
                onChange={handleChange}
                placeholder={"Write description here"}
              /> */}
            </div>
          </>
        )
      } 
    };