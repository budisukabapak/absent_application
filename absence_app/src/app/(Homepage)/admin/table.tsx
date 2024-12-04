import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Admin } from "./type"
import { Button } from "@/components/ui/button"
import { AdminStore } from "@/app/store/admin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
  

export default function AdminTable({ data }: { data: Admin[] }) {
    const { setAdmin } = AdminStore();
    const router = useRouter();

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/delete/${id}`, {
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
        <TableCaption>A list of Admin.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Birth Date</TableHead>
            <TableHead>Gender</TableHead>
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
                        <TableCell>{new Date(item.birth_date).toLocaleDateString()}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell className="flex gap-2 items-center justify-center">
                            <Button className="bg-white border text-black rounded-md px-4 py-2 font-bold hover:text-white" onClick={() => {
                                setAdmin({
                                    ...item,
                                    password: ""
                                })
                                router.push(`/admin/update/${item.id}`)
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