import React from "react";
import { Table, Button, Popconfirm, Tag, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { Machine } from "../types/machine";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  machines: Machine[];
  onEdit: (machine: Machine) => void;
  onDelete: (id: string) => void;
}

const locationColors: Record<string, string> = {
  SCHOOL: "blue",
  "SHOPPING MALL": "green",
  HOSPITAL: "volcano",
};

const MachineTable: React.FC<Props> = ({ machines, onEdit, onDelete }) => {
  const columns: ColumnsType<Machine> = [
    { title: "Machine Name", dataIndex: "name", key: "name" },
    {
      title: "Location",
      dataIndex: "locationType",
      key: "locationType",
      render: (location: string) => (
        <Tag color={locationColors[location]}>{location}</Tag>
      ),
    },
    {
      title: "Expected Sales/Day (฿)",
      dataIndex: "expectedSalesPerDay",
      key: "expectedSalesPerDay",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Profit Margin (%)",
      dataIndex: "averageProfitMarginPercentage",
      key: "averageProfitMarginPercentage",
      render: (value: number) => (value * 100).toFixed(0) + "%",
    },
    {
      title: "Rent per Day (฿)",
      dataIndex: "rentCostPerDay",
      key: "rentCostPerDay",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Electric Cost per °C (฿)",
      dataIndex: "electricCostPerTempPerDay",
      key: "electricCostPerTempPerDay",
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Machine) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="primary" size="small" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record.id!)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (recordId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this machine?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        onDelete(recordId);
      },
    });
  };

  return (
    <Table
      columns={columns}
      dataSource={machines}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      components={{
        body: {
          wrapper: (props: any) => (
            <AnimatePresence>
              <motion.tbody {...props} />
            </AnimatePresence>
          ),
          row: (props: any) => (
            <motion.tr
              {...props}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            />
          ),
        } as any,
      }}
    />
  );
};

export default MachineTable;
