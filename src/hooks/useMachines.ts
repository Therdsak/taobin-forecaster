import { useState } from "react";
import { Machine } from "../types/machine";

export const useMachines = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  const addMachine = (machine: Machine) => setMachines([...machines, machine]);
  const updateMachine = (updated: Machine) =>
    setMachines(machines.map((m) => (m.id === updated.id ? updated : m)));
  const deleteMachine = (id: string) =>
    setMachines(machines.filter((m) => m.id !== id));

  return { machines, addMachine, updateMachine, deleteMachine };
};
