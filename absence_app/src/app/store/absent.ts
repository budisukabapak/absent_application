import { create } from "zustand";

interface Absent {
    id: number;
    reason: string;
    date_start: Date;
    date_end: Date;
    employee_id: number;
}

interface AbsentState {
    employe_id: number | undefined;
    absent: Absent | undefined;
    setEmployeeId: (employe_id: number) => void;
    setAbsent: (absent: Absent) => void; 
}

export const AbsentStore = create<AbsentState>()((set) => ({
    employe_id: undefined,
    setEmployeeId: (employe_id: number) => set({ employe_id }),
    absent: undefined,
    setAbsent: (absent: Absent) => set({ absent }),
}));