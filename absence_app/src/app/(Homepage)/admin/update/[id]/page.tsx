"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { AdminStore } from "@/app/store/admin";
import { useEffect } from "react";

const RegisterSchema = z.object({
    first_name: z.string().min(3, "First name must be at least 3 characters long").max(100, "First name must be at most 100 characters long"),
    last_name: z.string().min(3, "Last name must be at least 3 characters long").max(100, "Last name must be at most 100 characters long"),
    email: z.string().email(),
    birth_date: z.date(),
    gender: z.enum(["male", "female"]),
    password: z.string().min(8, "Password must be at least 8 characters long").max(16, "Password must be at most 16 characters long"),
})

export default function Page({
    params,
  }: {
    params: { id: string } 
  }) {
    const { admin } = AdminStore();

    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            first_name: admin?.first_name || "",
            last_name: admin?.last_name || "",
            email: admin?.email || "",
            birth_date: new Date(admin?.birth_date || 0),
            gender: admin?.gender || "male",
            password: ""
        }
    })
    
    useEffect(() => {
        if (!admin) {
            router.push("/admin")        
        }
    }, [])

    async function handleSubmit(values: z.infer<typeof RegisterSchema>) {
        const id = params.id
        try {
            const response = await fetch(`http://localhost:3000/admin/update/${id}`, { 
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin: {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        birth_date: values.birth_date,
                        gender: values.gender,
                        password: values.password,
                    }
                }),
                credentials: "include",
            });
    
            if (response.ok) {
                toast.success("Update Successful")
                router.push("/admin")
                return;
            } else {
                toast.error("Update failed")
            }
        } catch (error) {
            toast.error("Update failed")
        }
    };

    return (
        <div className="w-full h-full min-h-screen bg-white flex flex-col gap-y-4 items-center justify-center">
            <h1 className="font-bold text-3xl">Update an account</h1>
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
                        name="birth_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel className="font-bold">Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your age.
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insert your Password here
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
