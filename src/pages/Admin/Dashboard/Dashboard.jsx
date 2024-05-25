import Spinner from "../../../components/Spinner/Spinner";
import { HiCalendar, HiHome } from "react-icons/hi";
import { Breadcrumb, Button, Timeline } from "flowbite-react";
import { IoLayersSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { Bar, Line} from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  Chart,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import useFetch from "../../../hooks/useFetch";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);
function groupByDay(items) {
  const grouped = items.map((item) => {
    const date = new Date(item.createdAt);
    const key = date.getDate() + "/" + (date.getMonth() + 1);
    return {
      count: item.count,
      date: key,
      createdAt: item.createdAt,
    };
  });
  return grouped;
}
const Dashboard = () => {
  const {data:orders,loading,error} = useFetch("orders?page=1&limit=10");
  console.log(orders);

  if (loading) {
    return <Spinner position={"relative"} />;
  }
  if (orders) {
    var newOrders = [...orders.data].sort((a, b) => a.id - b.id);
    var groupedByDay = groupByDay(newOrders);
    var aggregatedData = groupedByDay.reduce((acc, curr) => {
      var date = curr.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += curr.count;
      return acc;
    }, {});

    var labels = Object.keys(aggregatedData);
    var counts = Object.values(aggregatedData);

    var chartData = {
      labels: labels,
      datasets: [
        {
          label: "Count",
          fill: false,
          lineTension: 0.4,
          backgroundColor: "rgb(31,41,55)",
          borderColor: "rgb(31,41,55)",
          pointBorderColor: "#FF6B6B",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: counts,
        },
      ],
    };
  }
  if (error) {
    console.log(error);
  }
  return (
    orders && (
      <main className="pt-[90px]">
        <div className="flex-1 py-6">
          <Breadcrumb aria-label="Orders page" className="px-4 sm:px-2 lg:px-6 xl:px-10 mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#"></Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-3xl font-medium px-4 sm:px-2 lg:px-6 xl:px-10">Buyurtmalar</h1>
          <div className="w-full mx-auto py-6 px-4 sm:px-2 lg:px-6 xl:px-10">
            <div className="overflow-x-auto w-full rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 m-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg flex flex-col items-center">
                  <IoLayersSharp className="text-4xl" />
                  <h1 className="text-3xl font-medium text-center mt-2">
                    Bugungi
                  </h1>
                  <p className="text-center text-gray-600 text-3xl mt-2">
                    3 400 000 so'm
                  </p>
                </div>
                <div className="p-4 m-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg flex flex-col items-center">
                  <MdCalendarMonth className="text-4xl" />
                  <h1 className="text-3xl font-medium text-center mt-2">
                    Haftalik
                  </h1>
                  <p className="text-center text-gray-600 text-3xl mt-2">
                    22 300 000 so'm
                  </p>
                </div>
                <div className="p-4 m-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg flex flex-col items-center">
                  <FaRegCreditCard className="text-4xl" />
                  <h1 className="text-3xl font-medium text-center mt-2">
                    Oylik
                  </h1>
                  <p className="text-center text-gray-600 text-3xl mt-2">
                    334 400 000 so'm
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-5">
                <div className="mt-2 py-4 m-1">
                  <div className="flex justify-between items-center pt-0 lg:pt-3">
                    <p className="texm-sm xl:text-xl font-medium">
                      Kunlik buyurtmalar statisikasi{" "}
                    </p>
                    <Link
                      to={"/admin/orders"}
                      className="flex items-center font-bold hover:text-gray-600"
                    >
                      Ko'rish <FaChevronRight className="text-sm" />
                    </Link>
                  </div>
                  <div className="p-5 mt-4 w-full rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <Line
                      className="w-full h-full"
                      data={chartData}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true,
                            stepSize: 1,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 py-0 lg:py-4 m-1">
                  <div className="flex justify-between items-center pt-0 xl:pt-3">
                    <p className="texm-sm xl:text-xl font-medium">
                      Oxirgi buyurtmalar{" "}
                    </p>
                    <Link
                      to={"/admin/orders"}
                      className="flex items-center font-bold hover:text-gray-600"
                    >
                      Ko'rish <FaChevronRight className="text-sm" />
                    </Link>
                  </div>
                  <div className="mt-4 p-4 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <Timeline className="ml-6 mt-2">
                      {orders?.data.slice(-5).map((order) => {
                       return <Timeline.Item key={order.id} className="mb-5">
                          <Timeline.Point icon={HiCalendar} />
                          <Timeline.Content>
                            <Timeline.Time>
                              {order?.createdAt.slice(0, 10)}
                            </Timeline.Time>
                            <Timeline.Title>
                              {order?.product_name.charAt(0).toUpperCase()+order?.product_name.slice(1, order?.product_name.length)}
                            </Timeline.Title>
                          </Timeline.Content>
                        </Timeline.Item>;
                      })}
                    </Timeline>
                  </div>
                </div>
                <div className="mt-2 py-0 lg:py-4 m-1">
                  <div className="flex justify-between items-center pt-3">
                    <p className="texm-sm xl:text-xl font-medium">
                      Kunlik buyurtmalar statisikasi{" "}
                    </p>
                    <Link
                      to={"/admin/orders"}
                      className="flex items-center font-bold hover:text-gray-600"
                    >
                      Ko'rish <FaChevronRight className="text-sm" />
                    </Link>
                  </div>
                  <div className="p-5 mt-4 w-full rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    <Bar
                      className="w-full h-full mx-auto"
                      data={chartData}
                      // options={{
                      //   scales: {
                      //     y: {
                      //       beginAtZero: true,
                      //       stepSize: 1,
                      //     },
                      //   },
                      // }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Dashboard;
