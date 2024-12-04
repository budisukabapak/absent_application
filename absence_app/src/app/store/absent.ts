import { create } from "zustand";

interface Absent {
    id: number;
    reason: string;
    date_start: Date;
    date_end: Date;
    employee_id: number;
}

interface AbsentState {
    absent: Absent | undefined;
    setAbsent: (absent: Absent) => void; 
}

export const AbsentStore = create<AbsentState>()((set) => ({
    absent: undefined,
    setAbsent: (absent: Absent) => set({ absent }),
}));