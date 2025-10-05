import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { Machine } from "../types/machine";
import {
  calculateCumulativeWeekly,
  calculateDailyProfit,
} from "../utils/calculations";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface Props {
  machines: Machine[];
  dailyTemps: number[];
}

const CumulativeWeeklyCards: React.FC<Props> = ({ machines, dailyTemps }) => {
  return (
    <Row gutter={[16, 16]}>
      {machines.map((m) => {
        const { totalRevenue, totalRent, totalElectricity, totalProfit } =
          calculateCumulativeWeekly([m], dailyTemps);

        // สร้าง daily net profit สำหรับ mini line chart
        const miniLineData = {
          labels: dailyTemps.map((_, i) => `Day ${i + 1}`),
          datasets: [
            {
              data: dailyTemps.map((temp) => calculateDailyProfit(m, temp)),
              borderColor: "#1890ff",
              backgroundColor: "rgba(24,144,255,0.2)",
              tension: 0.3,
            },
          ],
        };

        const stats = [
          {
            title: "Revenue",
            value: totalRevenue,
            color: "#1890ff",
            icon: <ArrowUpOutlined />,
          },
          {
            title: "Rent",
            value: totalRent,
            color: "#ff4d4f",
            icon: <ArrowDownOutlined />,
          },
          {
            title: "Electricity",
            value: totalElectricity,
            color: "#faad14",
            icon: <ArrowDownOutlined />,
          },
          {
            title: "Net Profit",
            value: totalProfit,
            color: "#52c41a",
            icon:
              totalProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />,
          },
        ];

        return (
          <React.Fragment key={m.id}>
            {stats.map((stat) => (
              <Col xs={24} sm={12} md={6} key={stat.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card bordered>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      precision={0}
                      valueStyle={{ color: stat.color }}
                      prefix={stat.icon}
                      suffix="฿"
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </React.Fragment>
        );
      })}
    </Row>
  );
};

export default CumulativeWeeklyCards;
