import { Ringkasan } from "./Ringkasan";
import { Dates } from "./Dates";
import { QuickAcces } from "./QuickAccses";
import { StatistikOrder } from "./statistikOrder";
import { TransactionRunning } from "./TransactionRunning";
import { TabelOrder } from "./TabelOrder";
import { GrossSales } from "./GrossSales";
import { index } from "./index";

const Dashboard = () => {
  const { data, dataOrders } = index();

  return (
    <div className="dashboard">
      <div className="mb-7">
        <Dates />
      </div>
      <div className="mb-7">
        <QuickAcces />
      </div>
      <div>
        <Ringkasan data={data} />
      </div>
      <div className="mt-10 mb-10 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-2">
          <StatistikOrder />
        </div>
        <div className="col-span-1">
          <TransactionRunning dataOrders={dataOrders} />
        </div>
      </div>
      <div className="mb-10">
        <TabelOrder dataOrders={dataOrders}/>
      </div>
      <div className="mb-20 grid grid-cols-1 lg:grid-cols-2">
        <GrossSales />
      </div>
    </div>
  );
};

export default Dashboard;
