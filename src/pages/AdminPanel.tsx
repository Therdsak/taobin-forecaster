import React, { useState } from "react";
import { message } from "antd";
import MachineModal from "../components/MachineModal";
import MachineTable from "../components/MachineTable";
import { Machine } from "../types/machine";
import { Button } from "antd";

interface Props {
  machines: Machine[];
  addMachine: (machine: Machine) => void;
  updateMachine: (machine: Machine) => void;
  deleteMachine: (id: string) => void;
}

const AdminPanel: React.FC<Props> = ({
  machines,
  addMachine,
  updateMachine,
  deleteMachine,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | undefined>(
    undefined
  );

  const handleAdd = () => {
    setEditingMachine(undefined);
    setModalVisible(true);
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachine(machine);
    setModalVisible(true);
  };

  const handleSubmit = (machine: Machine) => {
    try {
      if (editingMachine) {
        updateMachine(machine);
        message.success("Machine updated successfully");
      } else {
        addMachine(machine);
        message.success("Machine added successfully");
      }
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error("Something went wrong while saving the machine");
    }
  };

  const handleDelete = (id: string) => {
    deleteMachine(id);
  };

  return (
    <div>
      <h1>Machine Management</h1>

      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Machine
      </Button>

      <MachineTable
        machines={machines}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <MachineModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        machine={editingMachine}
      />
    </div>
  );
};

export default AdminPanel;
