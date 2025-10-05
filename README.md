# TAO BIN P/L Forecaster

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.10-blue?logo=antdesign)](https://ant.design/)

**TAO BIN P/L Forecaster** เป็นเว็บแอปสำหรับบริหารและพยากรณ์ผลกำไร/ขาดทุนของเครื่องจำหน่ายสินค้าอัตโนมัติ (Vending Machine) โดยคำนวณจากข้อมูลเครื่องและพยากรณ์อากาศล่วงหน้า 7 วัน

---

## 🚀 Features

- **Machine Management**
  - เพิ่ม/แก้ไข/ลบเครื่อง
  - แสดงข้อมูล: Name, Location, Expected Sales, Profit Margin, Rent, Electric Cost
- **Forecast Dashboard**
  - Pie chart: Best-selling Location Type
  - Line chart: 7-Day Net Profit
  - Cumulative Weekly Overview (Revenue, Rent, Electricity, Net Profit)
  - Table: 7-Day Forecast พร้อมอุณหภูมิ, ค่าไฟ, กำไรสุทธิ
- **Animations & Empty States**
  - ใช้ **Framer Motion** ทำ animation cards/charts
  - แสดงข้อความเมื่อไม่มีข้อมูล
- **Responsive Layout** รองรับ desktop และ mobile

---

## 💻 Tech Stack

- **React 18 + TypeScript**
- **Ant Design** – UI Components
- **Chart.js / react-chartjs-2** – Charts (Pie, Line, Bar)
- **Framer Motion** – Animation
- **Open-Meteo API** – Weather Forecast
- **UUID** – Generate unique IDs

---

## ⚙️ Installation

```bash
git clone https://github.com/yourusername/tao-bin-forecaster.git
cd tao-bin-forecaster
npm install
npm start
```
