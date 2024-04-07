"use client";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	username: z.string().min(2, "Required").max(50, "Max 50 characters"),
	subject: z.string().min(1, "Required"),
	content: z.string().min(1, "Required"),
});

export default function MemoForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			subject: "",
			content: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		<DialogClose asChild></DialogClose>;
		// ✅ This will be type-safe and validated.
		console.log(values);
		// Example: Show custom alert
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<div className="flex justify-between">
								<FormLabel>Username</FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<div className="flex justify-between">
								<FormLabel>Subject</FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>Subject of your memo.</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<div className="flex justify-between">
								<FormLabel>Content</FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<Textarea className="resize-none" rows={15} {...field} />
							</FormControl>
							<FormDescription>The content of your memo.</FormDescription>
						</FormItem>
					)}
				/>
				<div className="flex md:space-x-5">
					<Button type="submit">Submit</Button>
					<DialogClose asChild>
						<Button type="button" variant="destructive">
							Close
						</Button>
					</DialogClose>
				</div>
			</form>
		</Form>
	);
}
