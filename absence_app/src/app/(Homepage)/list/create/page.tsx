"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const RegisterSchema = z.object({
    first_name: z.string().min(3, "First name must be at least 3 characters long").max(100, "First name must be at most 100 characters long"),
    last_name: z.string().min(3, "Last name must be at least 3 characters long").max(100, "Last name must be at most 100 characters long"),
    email: z.string().email(),
    phone_number: z.string().min(10, "Phone number must be at least 10 characters long").max(15, "Phone number must be at most 15 characters long"),
    address: z.string().min(3, "Address must be at least 3 characters long").max(100, "Address must be at most 100 characters long"),
    gender: z.enum(["male", "female"]),
})

export default function Page() {
    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            address: "",
            gender: "male",
        }
    })

    async function handleSubmit(values: z.infer<typeof RegisterSchema>) {
        try {
            const response = await fetch("http://localhost:3000/employee/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    employee: {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        phone_number: values.phone_number,
                        address: values.address,
                        gender: values.gender,
                    }
                }),
                credentials: "include",
            });
    
            if (response.ok) {
                toast.success("Employee registration Successful")
                router.push("/employee")
                return;
            } else {
                toast.error("Employee registration failed")
            }
        } catch (error) {
            toast.error("Employee registration failed")
        }
    };

    return (
        <div className="w-full h-full min-h-screen bg-white flex flex-col gap-y-4 items-center justify-center">
            <h1 className="font-bold text-3xl">Create a Employee Account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-start gap-y-4 w-[600px] h-full bg-white p-10 rounded-md shadow-md">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="first name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insert your First Name here
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insert your Last Name here
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insert your Email here
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insert your Phone Number here
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Address" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insert your Address here
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full py-6 default:mt-10 mt-4">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}
