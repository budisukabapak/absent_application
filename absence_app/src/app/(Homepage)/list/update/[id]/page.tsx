"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { AbsentStore } from "@/app/store/absent";
import { useEffect } from "react";

const RegisterSchema = z.object({
    reason: z.string().min(1, "Reason is required"),
    date_start: z.string().min(1, "Start Date is required"),
    date_end: z.string().min(1, "End Date is required"),
    employee_id: z.number().min(1, "Employee ID is required"),
})

export default function Page(
    {
        params,
    }: {
        params: { id: string } 
    }
) {
    const { employe_id } = AbsentStore();
    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            reason: "",
            date_start: "",
            date_end: "",
            employee_id: employe_id,
        }
    })

    useEffect(() => {
        if (!employe_id) {
            router.push("/employee")
        }
    }, [])

    function validateDateRange(dateStart: string, dateEnd: string): number | undefined {
        // Parse the dates to ensure they are valid Date objects
        const start = new Date(dateStart);
        const end = new Date(dateEnd);
    
        // Check if dates are valid
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return undefined
        }
    
        // Calculate the difference in days
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
    
        // Validate the range
        if (differenceInDays < 0 || differenceInDays > 12) {
            return undefined
        }
    
        return differenceInDays;
    }

    async function handleSubmit(values: z.infer<typeof RegisterSchema>) {
        if (validateDateRange(values.date_start, values.date_end) == null) {
            toast.error("Date range is invalid")
            return;
        }

        const rangeData: number = validateDateRange(values.date_start, values.date_end) || 0;

        if (rangeData == 0 || rangeData > 12) {
            toast.error("Date range is invalid")
            return;
        }

        const id = params.id;

        try {
            const response = await fetch(`http://localhost:3000/absent/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    absent: {
                        reason: values.reason,
                        date_start: values.date_start,
                        date_end: values.date_end,
                        employee_id: values.employee_id,
                    }
                }),
                credentials: "include",
            });
    
            if (response.ok) {
                toast.success("Employee's Absent update Successful")
                router.push("/employee")
                return;
            } else {
                toast.error("Employee's Absent update failed")
            }
        } catch (error) {
            toast.error("Employee's Absent update failed")
        }
    };

    return (
        <div className="w-full h-full min-h-screen bg-white flex flex-col gap-y-4 items-center justify-center">
            <h1 className="font-bold text-3xl">Update a Employee's List Account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-start gap-y-4 w-[600px] h-full bg-white p-10 rounded-md shadow-md">
                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Reason</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Reason" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insert your Reason here
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date_start"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel className="font-bold">Start Date</FormLabel>
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
                                    selected={new Date(field.value)}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of date_start is used to calculate absent start.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date_start"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel className="font-bold">End Date</FormLabel>
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
                                    selected={new Date(field.value)}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of date_end is used to calculate absent end.
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
