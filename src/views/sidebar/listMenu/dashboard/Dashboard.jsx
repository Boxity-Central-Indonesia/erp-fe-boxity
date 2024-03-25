import { Ringkasan } from "./Ringkasan";
import { Dates } from "./Dates";
import { QuickAcces } from "./QuickAccses";
import { StatistikOrder } from "./statistikOrder";
import { TransactionRunning } from "./TransactionRunning";
import { TabelOrder } from "./TabelOrder";
import { GrossSales } from "./GrossSales";
import { index } from "./index";

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
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <StatistikOrder />
        </div>
        {/* <div>
          <GrossSales />
        </div> */}
      </div>
      <div className="mb-4">
        <TabelOrder dataOrders={dataOrders} />
      </div>
      <div className="mb-20 grid grid-cols-1 lg:grid-cols-2"></div>
    </div>
  );
};

export default Dashboard;
