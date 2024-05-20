import { CRUD } from "./CRUD";
import { useEffect } from "react";
import Button from "../../../../layouts/Button";
import { TabelForDetail } from "../../../../layouts/TabelForDetail";

export const DeliveryNotesDetail = ({
  data,
  defaultEdit,
  handleEdit,
  dataHeading,
  setPath,
  setLoading,
  setRefresh
}) => {
  const dataDeliveryNotesItem = data?.delivery_note_items
    ? data.delivery_note_items.map((item) => ({
        id: item.id,
        order: item.order.kode_order,
        product: item.product.name,
        quantity: item.quantity + " Kg",
      }))
    : []; // Use an empty array if data.departments is null

  const handleBack = () => {
    defaultEdit(true);
    setPath("delivery-notes");
  };

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh)
    setLoading(false)
  }

  return (
    <>
       <div className="flex gap-5 items-center my-5">
        <h1 className="text-2xl dark:text-white font-semibold">
          Detail pengiriman barang
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
              <tr className="">
                <td className="py-1">Number</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.number || "--"}</span>
                </td>
              </tr>
              <tr className="">
                <td className="py-1">Warehouses</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.warehouse?.name || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Vendor</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.vendor?.name || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Date</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.date || "--"}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-span-1">
            <table className="w-full">
              <tr>
                <td className="py-1">Details</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5 capitalize">
                    {data?.details || "--"}
                  </span>
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
            event={() => handleEdit(data.id, "delivery-notes")}
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
              Delivery notes item
            </h2>

       <div className="bg-white rounded-md border shadow-md mb-16">
        <div className="grid grid-cols-1 gap-5">
            <div>
              <TabelForDetail
                data={dataDeliveryNotesItem}
                dataHeading={dataHeading}
                handleEdit={handleEdit}
                routes={"delivery-notes-item"}
              />
            </div>
          </div>
       </div>
    </>
  );
};
