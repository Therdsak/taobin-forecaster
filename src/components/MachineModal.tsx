import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";
import { Machine, LocationType } from "../types/machine";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (machine: Machine) => void;
  machine?: Machine;
}

const defaultValues = {
  name: undefined, // empty string จะถือว่า validation fail
  locationType: "SCHOOL" as LocationType,
  expectedSalesPerDay: 5000,
  averageProfitMarginPercentage: 0.4,
  rentCostPerDay: 500,
  electricCostPerTempPerDay: 10,
};

const MachineModal: React.FC<Props> = ({
  visible,
  onCancel,
  onSubmit,
  machine,
}) => {
  const [form] = Form.useForm();

  // ใส่ค่าเริ่มต้น
  useEffect(() => {
    form.setFieldsValue(machine || defaultValues);
  }, [machine, form]);

  const handleFinish = (values: any) => {
    const parsedValues: Machine = {
      id: machine?.id || uuidv4(),
      name: values.name,
      locationType: values.locationType,
      expectedSalesPerDay: Number(values.expectedSalesPerDay),
      averageProfitMarginPercentage: Number(
        values.averageProfitMarginPercentage
      ),
      rentCostPerDay: Number(values.rentCostPerDay),
      electricCostPerTempPerDay: Number(values.electricCostPerTempPerDay),
    };
    onSubmit(parsedValues);
    form.resetFields();
  };

  return (
    <Modal
      title={machine ? "Edit Machine" : "Add Machine"}
      open={visible}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={() => form.submit()}
      okText="Save"
      cancelText="Cancel"
    //   transitionName="ant-motion-zoom"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Machine Name"
          rules={[{ required: true, message: "Please enter machine name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="locationType"
          label="Location"
          rules={[{ required: true, message: "Please select location" }]}
        >
          <Select>
            <Option value="SCHOOL">SCHOOL</Option>
            <Option value="SHOPPING MALL">SHOPPING MALL</Option>
            <Option value="HOSPITAL">HOSPITAL</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="expectedSalesPerDay"
          label="Expected Sales per Day"
          rules={[
            { required: true, message: "Enter expected sales" },
            { type: "number", min: 0, message: "Must be >= 0" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="averageProfitMarginPercentage"
          label="Profit Margin (%)"
          rules={[
            { required: true, message: "Enter profit margin" },
            {
              type: "number",
              min: 0,
              max: 1,
              message: "Must be between 0 and 1",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} step={0.01} />
        </Form.Item>
        <Form.Item
          name="rentCostPerDay"
          label="Rent per Day (฿)"
          rules={[
            { required: true, message: "Enter rent cost" },
            { type: "number", min: 0, message: "Must be >= 0" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="electricCostPerTempPerDay"
          label="Electric Cost per °C (฿)"
          rules={[
            { required: true, message: "Enter electric cost" },
            { type: "number", min: 0, message: "Must be >= 0" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MachineModal;
