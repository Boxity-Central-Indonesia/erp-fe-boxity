import Button from "../../../../layouts/Button";
import { numberToCurrency, stringToDecimal, currencyToNumber } from "../../../../config/FormatCurrency";
import { useEffect, useState } from "react";
import { getApiData, putApiData } from "../../../../../function/Api";
import { WarehousesLocations } from "./warehousesLocations";
import { Produk } from "./product";

export const DetailWarehouses = ({
  data,
  setData,
  defaultEdit,
  handleEditWarehouseLocations,
  handleEditDetailForProduct,
  dataHeading,
  setPath,
  setOpenModal,
  openModal,
  setDataModal,
  dataModal,
  setDataEdit,
  refBody,
  setValidationError,
  setResponseError,
  setLoading,
  setRefreshForDetail,
  handleCreate,
  getWarehouseById,
  setRefresh
}) => {

  const dataDetail = {
    name: data?.warehouse?.name,
    address: data?.warehouse?.address,
    capacity: data?.warehouse?.capacity ? stringToDecimal({ value: data.warehouse.capacity }) + ' ton' : null,
    description: data?.warehouse?.description,
    location: data?.locations,
    products: data?.products,
    id: data?.warehouse?.id,
};



  const handleBack = () => {
    defaultEdit(true);
    setPath("warehouses");
  };

  const handleRefresh = () => {
    setLoading(false)
    setRefresh(prevRefresh => !prevRefresh)
  }


  const edit = async() => {
    setLoading((prevLoading) => !prevLoading);
    try {
        const dataBody = {
            name: refBody.nameRef.current.value,
            address: refBody.addressRef.current.value,
            capacity: refBody.capacityRef.current.value,
            description: refBody.descriptionRef.current.value,
        }
        const {data, status} = await putApiData('warehouses/' + refBody.idRef.current.value, dataBody)
        if(status === 201) {
            setOpenModal(prevOpenModal => !prevOpenModal)
            setLoading((prevLoading) => !prevLoading);
            getWarehouseById(refBody.idRef.current.value, dataBody)
        }
    } catch (error) {
        setResponseError(error.response.data);
        setLoading((prevLoading) => !prevLoading);
    }
  }

  const handleEdit = () => {
      setPath('warehouses')
      setDataModal({
          size: "lg",
          labelModal: "Update gudang",
          labelBtnModal: "Simpan",
          labelBtnSecondaryModal: "Delete",
          handleBtn: edit,
        });
        setValidationError({
            name: "",
            address: "",
            capacity: "",
            description: "",
            id: "",
        });
        setOpenModal(prevOpenModal => !prevOpenModal)
        console.log(dataDetail.capacity,)
        setDataEdit({
            name: dataDetail.name,
            address: dataDetail.address,
            capacity: stringToDecimal(dataDetail.capacity),
            description: dataDetail.description,
            id: dataDetail.id,
        })
    }

  return (
    <>
      <div className="flex gap-5 items-center my-5">
        <h1 className="text-2xl dark:text-white font-semibold">
          Detail gudang
        </h1>
        <div onClick={() => handleRefresh()} className="flex gap-1 items-center cursor-pointer">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
            </svg>
            <p>Refresh</p>
          </div>
      </div>
      <section className="bg-white dark:bg-gray-800 dar00k:text-white rounded-md shadow-md p-5 mb-7">
        <div className="grid lg:grid-cols-2 text-base">
          <div className="col-span-1">
            <table className={`w-full`}>
              <tr>
                <td className="py-1">Nama</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {dataDetail && dataDetail?.name || "--"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Alamat</td>
                <td>
                  {" "}
                  : <span className="ml-5">{dataDetail && dataDetail?.address || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Kapasitas</td>
                <td>
                  {" "}
                  : <span className="ml-5">{dataDetail && dataDetail?.capacity || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Deskripsi</td>
                <td>
                  {" "}
                  : <span className="ml-5">{dataDetail && dataDetail?.description || "--"}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button
            bgColour={""}
            label={"Back"}
            paddingX={"4"}
            paddingY={"2.5"}
            event={() => handleBack()}
            icon={
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            }
          />
          <Button
            bgColour={"primary"}
            label={"Edit"}
            paddingX={"4"}
            event={() => handleEdit(data.id, "invoices")}
            paddingY={"2.5"}
            icon={
              <svg
                className="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                />
              </svg>
            }
          />
        </div>
      </section>
            <h2 className="text-xl font-medium dark:text-white mb-4">
              Lokasi gudang
            </h2>
         <div className="bg-white rounded-md border mb-7">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <WarehousesLocations
                  data={dataDetail}
                  setData={setData}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  setPath={setPath}
                  setDataModal={setDataModal}
                  refBody={refBody}
                  setRefreshForDetail={setRefreshForDetail}
                  handleCreate={handleCreate}
                  handleEdit={handleEditWarehouseLocations}
              />
            </div>
            </div>
         </div>


            <h2 className="text-xl font-medium dark:text-white mb-4">
              Daftar produk
            </h2>
          <div className="bg-white rounded-md shadow-md mb-16">
            <div>
              <Produk
                  data={dataDetail}
                  setData={setData}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  setPath={setPath}
                  setDataModal={setDataModal}
                  refBody={refBody}
                  setRefreshForDetail={setRefreshForDetail}
                  handleCreate={handleCreate}
                  handleEdit={handleEditDetailForProduct}
              />
            </div>
          </div>
    </>
  );
};
