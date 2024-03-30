import { useState, useEffect, useRef } from "react"
import FormInput from "../../../../../layouts/FormInput"
import { TextArea, RadioButtons } from "../../../../../layouts/FormInput"
import { getApiData } from "../../../../../../function/Api"
import {TabelForProducts} from "../../../transaction/components/TabelForProducts"
import IconAdd from "../../../../../layouts/icons/IconAdd"
import {useColor} from "../../../../../config/GlobalColour"
import { postApiData } from "../../../../../../function/Api"

export const NewOrder = ({
  setOpenDrawer
}) => {
    const [selectedOption, setSelectedOption] = useState();
    const [inputProducts, setInputProducts] = useState();
    const [inputOrder, setInputOrder] = useState([])
    const [dataEdit, setDataEdit] = useState({})
    const [dataTabelProducts, setDataTabelProducts] = useState([]);
    const [dataSelectWarehouses, setDataSelectWarehouses] = useState();
    const [dataSelectVendor, setDataSelectVendor] = useState();
    const [dataSelectProducts, setDataSelectProducts] = useState();
    const [responseError, setResponseError] = useState();
    const [validationError, setValidationError] = useState();


    const [refBody, setRefBody] = useState({
      vendor_idRef: useRef(),
      warehouse_idRef: useRef(),
      order_typeRef: useRef(),
      detailsRef: useRef(),
      product_idRef: useRef()
    });

    const { globalColor, changeColor } = useColor();

    useEffect(() => {
        const fetchData = async (param, state) => {
            try {
              const { data, status } = await getApiData(param);
              if (status === 200) {
                const newData = data.map((item) => ({
                  id: item.id,
                  name: item.name,
                }));
                state(newData);
              }
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchData("warehouses", setDataSelectWarehouses);
          fetchData("vendors", setDataSelectVendor);
          fetchData("products", setDataSelectProducts);
    }, [])

    useEffect(() => {
        setInputOrder([
            {
              element: "select",
              name: "vendor_id",
              ref: refBody?.vendor_idRef,
              value: dataEdit.vendor_id,
              label: "Vendor",
              htmlFor: "vendor_id",
              id: "vendor_id",
              dataSelect: dataSelectVendor && dataSelectVendor,
              onchange: handleChange,
            },
            {
              element: "select",
              name: "warehouse_id",
              ref: refBody?.warehouse_idRef,
              value: dataEdit.warehouse_id,
              label: "Warehouses",
              htmlFor: "warehouse_id",
              id: "warehouse_id",
              dataSelect: dataSelectWarehouses,
              onchange: handleChange,
            },
            // {
            //   element: "radio",
            //   name: "order_type",
            //   // ref: refBody.order_typeRef,
            //   value: dataEdit.order_type,
            //   label: "Order type",
            //   htmlFor: "order_type",
            //   id: "order_type",
            //   dataSelect: [
            //     { id: 1, name: "Direct Order", ref: refBody.directOrderRef },
            //     { id: 2, name: "Production Order", ref: refBody.ProductionOrderRef },
            //   ],
            //   onchange: handleChange,
            // },
        ]);

        setInputProducts([
            {
              element: "select",
              name: "product_id",
              ref: refBody?.product_idRef,
              value: dataEdit.product_id,
              label: "products",
              htmlFor: "product_id",
              id: "product_id",
              dataSelect: dataSelectProducts,
              onchange: handleChangeAndPushProducts,
            },
            // {
            //     element: 'select',
            //     name: 'products',
            //     ref: refBody.productsRef,
            //     value: dataEdit.products,
            //     label: '',
            //     htmlFor: 'products',
            //     id: 'products',
            //     dataSelect: [],
            //     onchange: handleChange
            // },
          ]);
    }, [dataEdit, dataSelectVendor])

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setDataEdit((prevDataEdit) => ({
            ...prevDataEdit,
            [name]: value,
        }));
    };

    const saveDataToLocalStorage = (data) => {
        localStorage.setItem("dataTabelProducts", JSON.stringify(data));
    };

    const handleSaveClick = () => {
        console.log("Edited dataTabelProducts:", dataTabelProducts);

        // Simpan ke Local Storage sebelum pembaruan state
        saveDataToLocalStorage(dataTabelProducts);

        // Perbarui state dan re-render jika diperlukan
        setDataTabelProducts([...dataTabelProducts]);
        // setRender(!render); // Hanya jika re-render diperlukan
        // setEditingItemId(null);
    };

    const handleChangeAndPushProducts = async (event) => {
        // Mendapatkan nama dan nilai input yang berubah
        const { name, value } = event.target;
    
        try {
          const { data, status } = await getApiData("products/" + value);
          if (status === 200 && value) {
            // Cari data sebelumnya berdasarkan id
            const previousData = dataTabelProducts.find(
              (item) => item.id === data.id
            );
            const newData = {
              product_id: data.id,
              name: data.name,
              quantity: previousData ? previousData.quantity : 0, // Gunakan nilai qty dari data sebelumnya jika ditemukan
              price_per_unit: data.price_per_unit || 0, // Gunakan harga dari API, jika tidak ada, gunakan nilai kosong
            };
    
            // Tambahkan data baru ke dataTabelProducts
            setDataTabelProducts((prevData) => [...prevData, newData]);
    
            // Simpan data baru ke Local Storage setelah pembaruan state
            saveDataToLocalStorage([...dataTabelProducts, newData]);
          }
        } catch (error) {
          console.log(error);
        }
    
        // Memperbarui state sesuai dengan nilai input yang berubah
        setDataEdit((prevDataEdit) => ({
          ...prevDataEdit,
          [name]: value,
        }));
    };
    
    useEffect(() => {
      if (!!responseError) {
        setValidationError({
          order_id: responseError?.order_id?.[0] || "",
          invoice_date: responseError?.invoice_date?.[0] || "",
          due_date: responseError?.due_date?.[0] || "",
          status: responseError?.status?.[0] || "",
          invoice_id: responseError?.invoice_id?.[0] || "",
          amount_paid: responseError?.amount_paid?.[0] || "",
          payment_method: responseError?.payment_method?.[0] || "",
          payment_date: responseError?.payment_date?.[0] || "",
          warehouse_id: responseError?.warehouse_id?.[0] || "",
          details: responseError?.details?.[0] || "",
          vendor_id: responseError?.vendor_id?.[0] || "",
          number: responseError?.number?.[0] || "",
          date: responseError?.date?.[0] || "",
          product_id: responseError?.product_id?.[0] || "",
        });
      }
    }, [responseError]);

    const handleCreateOrder = async() => {
      const dataBody = {
        vendor_id: refBody.vendor_idRef.current.value,
        warehouse_id: refBody.warehouse_idRef.current.value,
        details: refBody.detailsRef.current.value,
        status: "pending",
        order_type: localStorage.getItem("order_type"),
        products: JSON.parse(localStorage.getItem("dataTabelProducts")),
      };
  
      try {
        const store = await postApiData('orders/', dataBody);
        if (store.status === 201) {
          localStorage.removeItem("dataTabelProducts");
          setOpenDrawer(prevOpenDrawer => !prevOpenDrawer)
          setDataTabelProducts([]);
          alert('Data order berhasl ditambahkan')
        }
      } catch (error) {
        setResponseError(error.response.data.errors);
        alert('Data order gagal ditambahkan')
      }
    }

    return(
      <>
          <div className="px-5 overflow-y-scroll">
            <div className="grid grid-cols-2 gap-3">
            {inputOrder && inputOrder?.map((item, index) => (
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
            
            <div className="my-5">
                <RadioButtons
                onChange={handleChange}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                referens={refBody?.order_typeRef}
                name={"order_type"}
                />
            </div>

            <div className="mb-5">
                <TextArea
                span={`col-span-2`}
                label={"Detail"}
                htmlFor={"detail"}
                id={"detail"}
                name={"detail"}
                referens={refBody?.detailsRef}
                placeholder={"Write detail here"}
                />
            </div>


            {inputProducts &&
              inputProducts?.map((item, index) => (
                <div
                  className={`col-span-2`}
                >
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
                    // validationError={validationError}
                  />
                </div>
              ))}

            <div
              className={`col-span-2 mt-5 mb-32`}
            >
              <TabelForProducts
                dataTabelProducts={dataTabelProducts}
                setDataTabelProducts={setDataTabelProducts}
                refBody={refBody}
                onChange={handleChange}
                handleSaveClick={handleSaveClick}
                saveDataToLocalStorage={saveDataToLocalStorage}
              />
            </div>
          </div>

          <div className="fixed p-5 border w-full bottom-0 flex gap-3 bg-white z-50 ">
                    <button className="rounded-md py-3 px-5 border w-fit text-sm">
                        Back
                    </button>
                    <button onClick={handleCreateOrder} style={{backgroundColor : globalColor}} className="rounded-md text-white py-3 px-5 border w-fit text-sm flex items-center">
                        <IconAdd/>
                        Add new order
                    </button>
            </div>
      </>
    )

    
}