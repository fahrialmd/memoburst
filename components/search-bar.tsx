"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
	context: z.string().min(1, "Required"),
});

function SearchBar() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			context: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2 flex">
				<FormField
					control={form.control}
					name="context"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Context</FormLabel> */}
							<FormControl>
								<Input placeholder="Search..." {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button variant="outline" type="submit" className="p-2">
					<Search className="w-5" />
				</Button>
			</form>
		</Form>
	);
}

export default SearchBar;
