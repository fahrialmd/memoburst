"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { FilePenLine } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	username: z.string().min(2, "Required").max(50, "Max 50 characters"),
	subject: z.string().min(1, "Required"),
	content: z.string().min(1, "Required"),
});

interface props {
	subject: String;
	username: String;
	content: String;
	id: any;
}

export default function EditMemo({
	subject = "",
	username = "",
	content = "",
	id,
}: props) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			subject: subject.toString(),
			username: username.toString(),
			content: content.toString(),
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					newSubject: values.subject,
					newUsername: values.username,
					newContent: values.content,
				}),
			});

			if (res.ok) {
				setOpen(false);
				toast({
					title: "Success",
					description: "Your memo has been edited.",
				});
				router.refresh();
			} else {
				throw new Error("Failed to edit memo");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant={"ghost"}
						className="flex-grow rounded-none"
						size={"sm"}
					>
						<FilePenLine className="h-1/2" />
					</Button>
				</DialogTrigger>
				<DialogContent className="rounded-lg max-w-[95%] sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Edit Memo</DialogTitle>
						<DialogDescription>Fill this form below.</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
							<div className="flex space-x-5">
								<Button type="submit">Submit</Button>
								<DialogClose asChild>
									<Button type="button" variant="destructive">
										Close
									</Button>
								</DialogClose>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
}
