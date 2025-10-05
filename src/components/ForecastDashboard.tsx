import React from "react";
import { Card, Row, Col, Table, Empty } from "antd";
import { Pie, Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Machine } from "../types/machine";
import { WeatherDaily } from "../types/weather";
import CumulativeWeeklyCards from "./CumulativeWeeklyCards";
import {
  calculateDailyProfit,
  aggregateSalesByLocation,
} from "../utils/calculations";

interface Props {
  machines: Machine[];
  forecast: WeatherDaily;
}

const ForecastDashboard: React.FC<Props> = ({ machines, forecast }) => {
  const dailyTemps = forecast.temperature_2m_max.map(
    (max, i) => (max + forecast.temperature_2m_min[i]) / 2
  );

  // Pie chart data
  const salesByLocation = aggregateSalesByLocation(machines);
  const pieData = {
    labels: Object.keys(salesByLocation),
    datasets: [
      {
        data: Object.values(salesByLocation),
        backgroundColor: ["#1890ff", "#52c41a", "#faad14"],
      },
    ],
  };

  // 7-day forecast table
  const dailyData = forecast.time.map((date, i) => {
    const avgTemp = dailyTemps[i];
    const electricity = machines.reduce(
      (sum, m) => sum + m.electricCostPerTempPerDay * avgTemp,
      0
    );
    const netProfit = machines.reduce(
      (sum, m) => sum + calculateDailyProfit(m, avgTemp),
      0
    );
    return {
      key: i,
      date,
      tempMin: forecast.temperature_2m_min[i],
      tempMax: forecast.temperature_2m_max[i],
      avgTemp,
      electricity,
      netProfit,
    };
  });

  const tableColumns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Min Temp (°C)", dataIndex: "tempMin", key: "tempMin" },
    { title: "Max Temp (°C)", dataIndex: "tempMax", key: "tempMax" },
    { title: "Avg Temp (°C)", dataIndex: "avgTemp", key: "avgTemp" },
    {
      title: "Electricity Cost (฿)",
      dataIndex: "electricity",
      key: "electricity",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Net Profit (฿)",
      dataIndex: "netProfit",
      key: "netProfit",
      render: (value: number) => value.toLocaleString(),
    },
  ];

  // Line chart for net profit
  const lineData = {
    labels: dailyData.map((d) => d.date),
    datasets: [
      {
        label: "Net Profit",
        data: dailyData.map((d) => d.netProfit),
        borderColor: "#1890ff",
        backgroundColor: "rgba(24,144,255,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={{ padding: 16 }} title="Cumulative Weekly Overview">
              <CumulativeWeeklyCards
                machines={machines}
                dailyTemps={dailyTemps}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={{ padding: 16 }} title="7-Day Forecast Table">
              {dailyData.length === 0 ? (
                <Empty description="No forecast data available" />
              ) : (
                <Table
                  columns={tableColumns}
                  dataSource={dailyData}
                  pagination={false}
                  rowKey="key"
                />
              )}
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {" "}
        {/* เพิ่ม horizontal gutter ให้ Card มีระยะซ้ายขวา */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={{ padding: 16 }} title="Best-selling Location Type">
              {machines.length === 0 ? (
                <Empty description="No machines added yet" />
              ) : (
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "right" } },
                    animation: { animateRotate: true, animateScale: true },
                  }}
                />
              )}
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card style={{ padding: 16 }} title="7-Day Net Profit Chart">
              {machines.length === 0 ? (
                <Empty description="No machines added yet" />
              ) : (
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                    animation: { duration: 1000, easing: "easeOutQuart" },
                  }}
                />
              )}
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default ForecastDashboard;
