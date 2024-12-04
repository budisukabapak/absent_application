import { create } from "zustand";

interface Admin {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string;
    gender: "male" | "female";
    password: string;
}

interface AdminState {
    admin: Admin | undefined;
    setAdmin: (admin: Admin) => void;
}

export const AdminStore = create<AdminState>()((set) => ({
    admin: undefined,
    setAdmin: (admin: Admin) => set({ admin }),
}));