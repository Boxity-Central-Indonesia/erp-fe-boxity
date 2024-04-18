import Button from "../../../../layouts/Button";
import { numberToCurrency } from "../../../../config/FormatCurrency";
import { useEffect, useState } from "react";
import { getApiData, putApiData } from "../../../../../function/Api";
import { WarehousesLocations } from "./warehousesLocations";

export const DetailWarehouses = ({
  data,
  setData,
  defaultEdit,
//   handleEdit,
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
}) => {
  const handleBack = () => {
    defaultEdit(true);
    setPath("warehouses");
  };


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
            setData({
                name: data.name,
                address: data.address,
                capacity: data.capacity,
                description: data.description,
            })
        }
    } catch (error) {
        setResponseError(error.response.data);
        setLoading((prevLoading) => !prevLoading);
    }
  }

  const handleEdit = () => {
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
        setDataEdit({
            name: data.name,
            address: data.address,
            capacity: data.capacity,
            description: data.description,
            id: data.id,
        })
    }

  return (
    <>
      <h1 className="text-2xl my-5 dark:text-white font-semibold">
        Detail gudang
      </h1>
      <section className="bg-white dark:bg-gray-800 dar00k:text-white rounded-md shadow-md p-5 mb-16">
        <div className="grid lg:grid-cols-2 text-base">
          <div className="col-span-1">
            <table className={`w-full`}>
              <tr>
                <td className="py-1">Nama</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {data?.name || "--"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Alamat</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.address || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Kapasitas</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.capacity || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Deskripsi</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.description || "--"}</span>
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
        <hr className="my-7" />
        <div className="grid grid-cols-1 gap-5">
          <div>
            <h2 className="text-xl font-medium dark:text-white mb-4">
              Lokasi gudang
            </h2>
            <WarehousesLocations
                data={data}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setPath={setPath}
                setDataModal={setDataModal}
                refBody={refBody}
            />
          </div>
          <hr className="my-3" />
          {/* <div>
            <h2 className="text-xl font-medium dark:text-white mb-4">
              Timbangan
            </h2>
            <TabelForDetail
              data={[]}
              dataHeading={dataHeading}
              handleEdit={handleEdit}
              routes={""}
              hidden={true}
            />
          </div> */}
        </div>
        <hr className="my-7" />
      </section>
    </>
  );
};
