"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import EditMemo from "./edit-memo";

interface props {
	subject: String;
	username: String;
	content: String;
	id: any;
}

const formSchema = z.object({
	confirmation: z.string(),
});

export default function Memo({ subject, username, content, id }: props) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			confirmation: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.confirmation == subject) {
			const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
				method: "DELETE",
			});
			if (res.ok) {
				setOpen(false);
				toast({
					title: "Success",
					description: "Your memo has been deleted.",
				});
				router.refresh();
			}
		} else {
			toast({
				title: "Fail",
				variant: "destructive",
				description: "Your input didn't match.",
			});
		}
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>{subject}</CardTitle>
				<CardDescription>{username}</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="truncate ">{content}</p>
			</CardContent>
			<Separator />
			<CardFooter className="p-0 justify-center ">
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant={"ghost"}
							className="flex-grow rounded-none"
							size={"sm"}
						>
							<Eye className="h-1/2" />
						</Button>
					</DialogTrigger>
					<DialogContent className="rounded-lg max-w-[95%] sm:max-w-md">
						<DialogHeader>
							<DialogTitle>{subject}</DialogTitle>
							<DialogDescription>By: {username}</DialogDescription>
						</DialogHeader>
						{content}
					</DialogContent>
				</Dialog>
				<EditMemo
					subject={subject}
					username={username}
					content={content}
					id={id}
				/>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							variant={"ghost"}
							className="flex-grow rounded-none"
							size={"sm"}
						>
							<Trash2 className="h-1/2 text-destructive" />
						</Button>
					</DialogTrigger>
					<DialogContent className="rounded-lg max-w-[95%] sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your
								memo from our servers.
							</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="confirmation"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												To confirm, type <u>{subject}</u> in the box below
											</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<Button
									className="w-full"
									type="submit"
									variant={"destructive"}
								>
									Delete
								</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	);
}
