import { create } from "zustand";

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    gender: "male" | "female";
}

interface EmployeeState {
    employee: Employee | undefined;
    setEmployee: (employee: Employee) => void; 
}

export const EmployeeStore = create<EmployeeState>()((set) => ({
    employee: undefined,
    setEmployee: (employee: Employee) => set({ employee }),
}));