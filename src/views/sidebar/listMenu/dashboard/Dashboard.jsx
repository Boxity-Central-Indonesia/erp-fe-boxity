import { Ringkasan } from "./Ringkasan";
import { Dates } from "./Dates";
import { QuickAcces } from "./quickAkses/QuickAccses";
import { StatistikOrder } from "./statistikOrder";
import { TabelOrder } from "./TabelOrder";
import { index } from "./index";
import { MostSales } from "./mostSales";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {


  const dataBody = {
    "name": "bahari",
    "country_id": 111,
    "email": "baharihari49@gmail.com",
    "whatsapp_number": "1234567890",
    "surfing_experience": 8,
    "visit_date": "2024-05-15",
    "desired_board": "Longboard",
    "verification_photo": "https://example.com/passport_photo_updated.png"
  }

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post(`https://be-palmcode.octansidn.com/api/booking`, dataBody, {
          withXSRFToken: true,
          headers: {
            withCredentials: true,
            Authorization: `Bearer 3|U2zR6itoSGhj8JR12dEwRcGtBgpXNcve9AHwj6Dv01f72008`,
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        // Handle error, misalnya log atau tampilkan pesan kesalahan
        console.error("Error in API request:", error);
        throw error; // Rethrow error agar dapat ditangkap oleh pemanggil fungsi
      }
    }
    postData()
  }, [])


  const { data, dataOrdersNotCompleted, dataOrders } = index();
  return (
    <div className="dashboard">
      <div className="mb-4">
        <Dates />
      </div>
      <div className="mb-4">
        <QuickAcces />
      </div>
      <div className="mb-4">
        <Ringkasan data={data} />
      </div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <StatistikOrder />
        </div>
        <div className="col-span-1">
          <MostSales />
        </div>
        {/* <div>
          <GrossSales />
        </div> */}
      </div>
      <div className="mb-4">
        <TabelOrder data={dataOrders} />
      </div>
      <div className="mb-20 grid grid-cols-1 lg:grid-cols-2"></div>
    </div>
  );
};

export default Dashboard;
