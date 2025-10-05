import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { AppstoreOutlined, DashboardOutlined } from "@ant-design/icons";
import AdminPanel from "./AdminPanel";
import ForecastDashboard from "../components/ForecastDashboard";
import { useMachines } from "../hooks/useMachines";
import { useWeatherForecast } from "../hooks/useWeatherForecast";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("machine");

  const { machines, addMachine, updateMachine, deleteMachine } = useMachines();
  const { forecast, loading } = useWeatherForecast();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          TAO BIN
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["machine"]}
          mode="inline"
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="machine" icon={<AppstoreOutlined />}>
            Machine Management
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "16px" }}>
          {selectedMenu === "machine" && (
            <AdminPanel
              machines={machines}
              addMachine={addMachine}
              updateMachine={updateMachine}
              deleteMachine={deleteMachine}
            />
          )}
          {selectedMenu === "dashboard" && !loading && forecast && (
            <ForecastDashboard machines={machines} forecast={forecast} />
          )}
          {selectedMenu === "dashboard" && loading && (
            <p>Loading forecast...</p>
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          TAO BIN P/L Forecaster ©20251
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
