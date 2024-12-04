"use client"

import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import EmployeeTable from "./table";
import { Absent } from "./type";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "../navbar/navbar";
import { AbsentStore } from "@/app/store/absent";

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<Absent[]>([]);
    const { employe_id } = AbsentStore();

    async function getEmployeeListData() {
        const response = await fetch(`http://localhost:3000/absent/${employe_id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
            credentials: "include",
        });
    
        if (response.status === 200) {
            setData(await response.json());
            return;
        }
    
        if (response.status === 401) {
            toast.error("Unauthorized")
            redirect("/login")
        }
    
        toast.error("Failed to fetch data")
    }

    useEffect(() => {
        if (!employe_id) {
            router.push("/employee")
        }
        getEmployeeListData();
    }, [])
    
    return (
        <>
            <Navbar />
            <div className="w-full h-full min-h-screen bg-white flex flex-col gap-y-4 p-10">
                <h1 className="font-bold text-3xl">Employee's Absent List</h1>
                <div className="flex flex row gap-x-4 items-center justify-end">
                    <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => router.push("/list/create")}>Add Employee</Button>
                </div>
                <EmployeeTable data={data}  />
            </div>
        </>
    )
}