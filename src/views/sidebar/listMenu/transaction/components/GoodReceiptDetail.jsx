import { CRUD } from "./CRUD";
import { useEffect } from "react";
import Button from "../../../../layouts/Button";
import { TabelForDetail } from "../../../../layouts/TabelForDetail";

export const GoodReceiptDetail = ({
  data,
  defaultEdit,
  handleEdit,
  dataHeading,
}) => {
  const dataGoodReceiptItem = data?.goods_receipt_items
    ? data.goods_receipt_items.map((item) => ({
        "kode product": item.product.code,
        "nama product": item.product.name,
        "quantity yang dipesan": item.quantity_ordered + " pcs",
        "quantity diterima": item.quantity_received + " pcs",
        "sisa quantity": item.quantity_due + " pcs",
      }))
    : []; // Use an empty array if data.departments is null

  return (
    <>
      <h1 className="text-2xl my-5 dark:text-white font-semibold">
        Good receipt detail
      </h1>
      <section className="bg-white dark:bg-gray-800 dar00k:text-white rounded-md shadow-md p-5 mb-16">
        <div className="grid lg:grid-cols-2 text-base">
          <div className="col-span-1">
            <table className={`w-full`}>
              <tr className="">
                <td className="py-3">Kode Pemesanan</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.kodeGoodsReceipt || "--"}</span>
                </td>
              </tr>
              <tr className="">
                <td className="py-3">kode Transaksi</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.order.kode_order || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Tanggal Penerimaan</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.created_at || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Tanggal Pemesanan</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.order.created_at || "--"}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-span-1">
            <table className="w-full">
              <tr>
                <td className="py-3">Status Penerimaan</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5 capitalize">
                    {data?.status || "--"}
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3">Tujuan/Asal Gudang</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.warehouse.name || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Details</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {data?.details || data?.order.details}
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
            event={() => defaultEdit(true)}
            icon={
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
            event={() => handleEdit(data.id, "orders")}
            paddingY={"2.5"}
            icon={
              <svg
                className="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
              Good receipt item
            </h2>
            <TabelForDetail
              data={dataGoodReceiptItem}
              dataHeading={dataHeading}
              handleEdit={handleEdit}
              routes={"products"}
            />
          </div>
        </div>
        <hr className="my-7" />
      </section>
    </>
  );
};
