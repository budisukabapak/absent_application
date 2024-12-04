"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export default function Page() {
    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "" 
        }
    })

    async function handleSubmit(values: z.infer<typeof LoginSchema>) {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
                credentials: "include",
            });
    
            if (response.ok) {
                toast.success("Login Successful")
                router.push("/admin")
                return;
            } else {
                toast.error("Login failed")
            }
        } catch (error) {
            toast.error("Login failed")
        }
    };


    return (
        <div className="w-full h-full min-h-screen bg-white flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-start gap-y-4 w-[400px] h-full bg-white p-10 rounded-md shadow-md">
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