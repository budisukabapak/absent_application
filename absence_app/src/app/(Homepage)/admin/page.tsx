"use client"

import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminTable from "./table";
import { Admin } from "./type";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "../navbar/navbar";

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<Admin[]>([]);

    async function getAdminData() {
        const response = await fetch("http://localhost:3000/admin", {
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
        getAdminData();
    }, [])
    
    
    return (
        <>
            <Navbar />
            <div className="w-full h-full min-h-screen bg-white flex flex-col gap-y-4 p-10">
                <h1 className="font-bold text-3xl">Admin List</h1>
                <div className="flex flex row gap-x-4 items-center justify-end">
                    <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => router.push("/register")}>Add Admin</Button>
                </div>
                <AdminTable data={data}  />
            </div>
        </>
    )
}