import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Absent } from "./type"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AbsentStore } from "@/app/store/absent";
  

export default function EmployeeTable({ data }: { data: Absent[] }) {
    const { setAbsent } = AbsentStore();
    const router = useRouter();

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/list/delete/${id}`, {
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
        <TableCaption>A list of Employee's Absent.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                data && data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.employee_id}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>{item.date_start.toLocaleDateString()}</TableCell>
                        <TableCell>{item.date_end.toLocaleDateString()}</TableCell>
                        <TableCell className="flex gap-2 items-center justify-center">
                            <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => {
                                setAbsent(item);
                                router.push(`/list/update/${item.employee_id}`)
                            }}>Edit</Button>
                            <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => {
                                handleDelete(item.id)
                            }}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
        </Table>
    )
}