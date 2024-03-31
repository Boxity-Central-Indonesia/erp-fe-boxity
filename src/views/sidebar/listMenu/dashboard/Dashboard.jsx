import { Ringkasan } from "./Ringkasan";
import { Dates } from "./Dates";
import { QuickAcces } from "./quickAkses/QuickAccses";
import { StatistikOrder } from "./statistikOrder";
import { TabelOrder } from "./TabelOrder";
import { index } from "./index";
import { MostSales } from "./mostSales";
import Swal from "sweetalert2";

const Dashboard = () => {
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
