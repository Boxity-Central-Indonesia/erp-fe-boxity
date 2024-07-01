import { CRUD } from "./CRUD";
import { useEffect, useState } from "react";
import Button from "../../../../layouts/Button";
import { TabelForDetail } from "../../../../layouts/TabelForDetail";
import { getApiData } from "../../../../../function/Api";
import IconDownload from "../../../../layouts/icons/IconDownload";

export const OrderDetail = ({
  data,
  defaultEdit,
  handleEdit,
  dataHeading,
  setPath,
  setLoading,
  setRefresh
}) => {
  const [dataTimbangan, setDataTimbangan] = useState([]);
  const dataProducts = data?.products
    ? data.products.map((product) => ({
        id: product.id,
        name: product.name,
        "jumlah pesanan": product.quantity_pesanan + " Kg",
        "harga satuan": new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(product.price_per_unit),
        "total tagihan": new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(product.total_price),
        "selisih jumlah": product.selisih_quantity + " Kg",
        "timbang kotor": product.timbang_kotor + " Kg",
        "total keranjang": product.total_keranjang + " Pcs",
        "total berat keranjang": product.total_berat_keranjang + " Kg",
        "timbang bersih": product.timbang_bersih + " Kg",
        "jumlah hewan": product.total_jumlah_item + " Pcs",
        "rata-rata berat hewan":
          product.rata_rata_berat_hewan.toFixed(2) + " Kg",
        susut: product.susut_percentage.toFixed(2) + " %",
      }))
    : [];

  const handleBack = () => {
    defaultEdit(true);
    setPath("orders");
  };

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh)
    setLoading(false)
  }

  const downloadReport = async () => {
    try {
      const orderId = data?.id;
      console.log(orderId);

      // Ensure the order ID is available before proceeding
      if (!orderId) {
        console.error("Order ID not available");
        return;
      }
      const { data: pdfData, status } = await getApiData(
        `download/orders/${orderId}`
      );
      if (status === 200) {
        const pdfUrl = pdfData;

        // Create a hidden link
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank"; // Open in a new tab/window
        link.download = `order_detail_${orderId}.pdf`; // Set the desired file name

        // Append the link to the document
        document.body.appendChild(link);

        // Simulate a click to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
     if(data?.id){
        try {
          const response = await getApiData(
            "processing-activities/by-order/" + data?.id
          );
          if (response.status === 200) {
            const newData = response.data
              .filter((item) => item.activity_type === "weighing")
              .map((item) => {
                const formattedDetails = formatDetails(item.details);
                return {
                  id: item.id,
                  "kode order": item.kodeOrder,
                  nama: item.product_name,
                  deskripsi: (
                    <div dangerouslySetInnerHTML={{ __html: formattedDetails }} />
                  ),
                  "waktu timbang": item.created_at,
                };
              });
            setDataTimbangan(newData);
          } else if (response.status === 404) {
            setDataTimbangan([]);
          }
        } catch (error) {
          setDataTimbangan([]);
        }
     }
    };

    // Function to format details
    const formatDetails = (details) => {
      // Parse the JSON string into an object
      const parsedDetails = JSON.parse(details);
      console.log(details);
      // Construct the formatted details string
      let detailsString = "Timbang melalui Livestock";
      // If ordered_quantity exists, append it
      detailsString += "<br />No Kendaraan: " + parsedDetails.vehicle_no;
      detailsString +=
        "<br />Timbang Berat Kotor: " +
        parsedDetails.qty_weighing +
        " " +
        parsedDetails.noa_weighing;
      detailsString +=
        "<br />Jumlah ayam terhitung: " +
        parsedDetails.number_of_item +
        " " +
        parsedDetails.noa_numberofitem;
      detailsString +=
        "<br />Berat keranjang per pcs: " +
        parsedDetails.basket_weight +
        " " +
        parsedDetails.noa_basket_weight;
      // Memastikan bahwa average_weight_per_animal ada dan merupakan angka
      if (
        parsedDetails.average_weight_per_animal &&
        !isNaN(parsedDetails.average_weight_per_animal)
      ) {
        // Memformat nilai dengan dua digit di belakang koma dan membulatkannya
        const roundedAverageWeight = parseFloat(
          parsedDetails.average_weight_per_animal
        ).toFixed(2);
        detailsString +=
          "<br />Hitung rata-rata berat ayam timbang: " +
          roundedAverageWeight +
          " " +
          parsedDetails.noa_weighing;
      } else {
        detailsString +=
          "<br />Hitung rata-rata berat ayam timbang: " +
          parsedDetails.average_weight_per_animal +
          " " +
          parsedDetails.noa_weighing;
      }
      return detailsString;
    };

    getData();
  }, [data]);

  return (
    <>
      <div className="flex gap-5 items-center my-5">
        <h1 className="text-2xl dark:text-white font-semibold">
          Detail pesanan
        </h1>
        <div onClick={() => handleRefresh()} className="flex gap-1 items-center cursor-pointer">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
            </svg>
            <p>Refresh</p>
          </div>
      </div>
      <section className="p-5 mb-7 bg-white rounded-md shadow-md dark:bg-gray-800 dark:text-white">
        <div className="grid mb-2 text-base lg:grid-cols-2">
          <div className="col-span-1">
            <table className={`w-full responsive`}>
              <tr className="">
                <td className="py-1">Kode Transaksi</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.kode_order || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  {data?.vendor?.transaction_type == "outbound"
                    ? "Customer"
                    : "Supplier"}
                </td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.vendor?.name || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">
                  {data?.vendor?.transaction_type == "outbound"
                    ? "Gudang Tujuan"
                    : "Gudang Asal"}
                </td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.warehouse?.name || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Kode transaksi invoice</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {data?.invoices?.length > 0
                      ? data.invoices
                          .map((invoice) => invoice.kode_invoice)
                          .join(", ")
                      : "--"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Order type</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.order_type || "--"}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-span-1">
            <table className="w-full">
              <tr>
                <td className="py-1">Order status</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.order_status || "--"}</span>
                </td>
              </tr>

              <tr>
                <td className="py-1">PPN</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.taxes || "Rp. 0"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Biaya Pengiriman</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.shipping_cost || "Rp. 0"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Total Tagihan</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {data?.total_price
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(data.total_price)
                      : "--"}
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
            event={() => handleEdit(data.id, "orders")}
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
          <Button
            bgColour={"#040d1d"}
            textColour={"#fff"}
            label={"Print"}
            paddingX={"3"}
            event={downloadReport}
            paddingY={"2"}
            icon={
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
              >
                <path
                  stroke="white"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16.4 18H19c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h2.6m9.4-7V5c0-.6-.4-1-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-4Z"
                />
              </svg>
            }
          />
        </div>
      </section>

      <h2 className="mb-4 text-xl font-medium dark:text-white">
                Daftar Produk
        </h2>
      <div className="bg-white rounded-md border shadow-md py-1 mb-7">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <TabelForDetail
                data={dataProducts}
                dataHeading={dataHeading}
                handleEdit={handleEdit}
                routes={"products"}
              />
            </div>
        </div>
      </div>

      <h2 className="mb-4 text-xl rounded font-medium dark:text-white">
          Timbangan
      </h2>       
      <div className="bg-white rounded px-1 mb-24">   
        <div>
          <TabelForDetail
            data={dataTimbangan}
            dataHeading={dataHeading}
            handleEdit={handleEdit}
            hidden={true}
            hiddenBtnEdit={true}
            // routes={"products"}
          />
        </div>
      </div>
    </>
  );
};
