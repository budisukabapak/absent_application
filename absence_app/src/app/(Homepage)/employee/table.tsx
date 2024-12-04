import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Employee } from "./type"
import { Button } from "@/components/ui/button"
import { EmployeeStore } from "@/app/store/employee";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AbsentStore } from "@/app/store/absent";
  

export default function EmployeeTable({ data }: { data: Employee[] }) {
    const { setEmployeeId } = AbsentStore();
    const { setEmployee } = EmployeeStore();
    const router = useRouter();

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/employee/delete/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                toast.success("Delete Successful")
                window.location.reload()
                return;
            } else {
                toast.error("Delete failed")
            }
        } catch (error) {
            toast.error("Delete failed")
        }
    }

    return (
        <Table className="w-full bg-white rounded-md shadow-md">
        <TableCaption>A list of Employee.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-center">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                data && data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.first_name}</TableCell>
                        <TableCell>{item.last_name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.phone_number}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell className="flex gap-2 items-center justify-center">
                            <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => {
                                setEmployee(item);
                                router.push(`/employee/update/${item.id}`)
                            }}>Edit</Button>
                            <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => {
                                handleDelete(item.id)
                            }}>Delete</Button>
                            <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => {
                                setEmployeeId(item.id);
                                router.push(`/list`)
                            }}>See Absent</Button>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
        </Table>
    )
}