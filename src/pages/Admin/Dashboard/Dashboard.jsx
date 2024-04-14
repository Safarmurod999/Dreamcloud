import React, { useEffect } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../utils/slice";
import { HiHome } from "react-icons/hi";
import { Breadcrumb } from "flowbite-react";
import { IoLayersSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  Chart,
  PointElement,
  LineElement,
} from "chart.js";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
function groupByDay(items) {
  const grouped = items.data.map((item) => {
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
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);
  useEffect(() => {
    dispatch(fetchData("orders"));
  }, [dispatch]);

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  if (orders) {
    var groupedByDay = groupByDay(orders);
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
      <main>
        <div className="flex-1 py-6">
          <Breadcrumb aria-label="Orders page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#"></Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-3xl font-medium ml-[50px]">Buyurtmalar</h1>
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="overflow-x-auto w-full rounded-lg">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center border border-white hover:border-gray-800">
                  <IoLayersSharp className="text-4xl" />
                  <h1 className="text-3xl font-medium text-center mt-2">
                    Bugungi
                  </h1>
                  <p className="text-center text-gray-600 text-3xl mt-2">
                    3 400 000 so'm
                  </p>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center border border-white hover:border-gray-800">
                  <MdCalendarMonth className="text-4xl" />
                  <h1 className="text-3xl font-medium text-center mt-2">
                    Haftalik
                  </h1>
                  <p className="text-center text-gray-600 text-3xl mt-2">
                    22 300 000 so'm
                  </p>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center border border-white hover:border-gray-800">
                  <FaRegCreditCard className="text-4xl" />
                  <h1 className="text-3xl font-medium text-center mt-2">
                    Oylik
                  </h1>
                  <p className="text-center text-gray-600 text-3xl mt-2">
                    334 400 000 so'm
                  </p>
                </div>
              </div>
              <div className="mt-8 w-1/2">
                <div className="flex justify-between items-center my-4">
                  <p className="text-xl font-medium">Kunlik buyurtmalar statisikasi </p>
                  <Link
                    to={"/admin/orders"}
                    className="flex items-center font-bold hover:text-gray-600"
                  >
                    Ko'rish <FaChevronRight className="text-sm" />
                  </Link>
                </div>
                <div className="p-4 border rounded-lg border-gray-800">
                  <Line
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
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Dashboard;
