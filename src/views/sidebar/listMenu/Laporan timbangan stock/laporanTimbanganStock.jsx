import TabelComponent from "../../../layouts/Tabel"
import { useState, useEffect } from "react"
import { getApiData } from "../../../../function/Api"

export const LaporanTimbanganStock = () => {

    const [data, setData] = useState()
    const [dataHeading, setDataHeading] = useState([
        {
            // label: "Laporan timbangan stok",
            // icon: IconAdd(),
            heading: "Laporan timbangan stok",
            information:
              "This is additional information about the content of this section. You can provide any relevant details or instructions here.",
            // eventToggleModal: handleOpenModal,
            // onclick: handleClickHeading,
        },
    ])


    useEffect(() => {
        const getData = async () => {
            try {
                const {data, status} = await getApiData("orders/weighing/exordered")
                if(status === 200){
                    const newData = data
                    .filter(item => item.activity_type === "weighing" && item.details.type_of_item !== null)
                    .map(item => {
                        const formattedDetails = formatDetails(item.details);
                        return {
                            'kode produk': item.code,
                            'nama': item.name,
                            deskripsi: (
                                <div dangerouslySetInnerHTML={{ __html: formattedDetails }} />
                              ),
                            'waktu timbang': item.activity_date
                        }
                    })
                    setData(newData)
                } else if(status === 404){
                    console.log('okeeee');
                    setData([])
                }
            } catch (error) {
                console.log(error);
            }
        }

        const formatDetails = (details) => {
            // Parse the JSON string into an object
            const parsedDetails = JSON.parse(details);
            console.log(details);
            // Construct the formatted details string
            let detailsString = "Timbang melalui Livestock";
            // If type_of_item exists, append it
            if (parsedDetails.type_of_item) {
                detailsString += "<br />Jenis item: " + parsedDetails.type_of_item;
            }
            // Append other details
            // detailsString += "<br />No Kendaraan: " + parsedDetails.vehicle_no;
            if (parsedDetails) {
                let tempDetailsString = "";
                
                tempDetailsString +=
                  "Timbang Melalui Livestock";
                
                if (parsedDetails.qty_weighing || parsedDetails.noa_weighing) {
                  tempDetailsString +=
                    "Timbang Berat Kotor: " +
                    (parsedDetails.qty_weighing || "") +
                    (parsedDetails.noa_weighing ? " " + parsedDetails.noa_weighing : "") +
                    "<br />";
                }
                
                tempDetailsString +=
                  `Jumlah ${
                    parsedDetails?.type_of_item ? parsedDetails.type_of_item : ""
                  } terhitung: ${parsedDetails.number_of_item || ""} <br />`;
              
                if (parsedDetails.basket_weight || parsedDetails.noa_basket_weight) {
                  tempDetailsString +=
                    "Berat Keranjang Per Pcs: " +
                    (parsedDetails.basket_weight || "") +
                    (parsedDetails.noa_basket_weight ? " " + parsedDetails.noa_basket_weight : "") +
                    "<br />";
                }
                
                if (parsedDetails.type_of_item) {
                  tempDetailsString +=
                    "Tipe Item: " + parsedDetails.type_of_item + "<br />";
                }
                
                tempDetailsString +=
                  "Hitung Rata-Rata Berat Ayam Timbang: " +
                  (parsedDetails.avg_weight_chicken || "") +
                  " Kg";
                
                detailsString += tempDetailsString;
              }
              
              
            // Ensure that average_weight_per_animal exists and is a number
            if (
                parsedDetails.average_weight_per_animal &&
                !isNaN(parsedDetails.average_weight_per_animal)
            ) {
                // Format the value with two decimal places and round it
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
  "Hitung Rata-Rata Berat Ayam Timbang: " +
  (parsedDetails.avg_weight_chicken === "Kg" ? "0 Kg" : parsedDetails.avg_weight_chicken);

                    +
                    parsedDetails.noa_weighing;
            }
            return detailsString;
        };
        
        getData()
    }, [])

    return(
        <>
            < TabelComponent 
                data={data}
                dataHeading={dataHeading}
                hiddenButton={true}
                // skeleton={skeleton}
                // setOpenModal={handleCreate}
                // handleEdit={handleEdit}
            />
        </>
    )
}