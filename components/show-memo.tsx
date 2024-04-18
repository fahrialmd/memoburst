import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Eye } from "lucide-react";

export default function ShowMemo() {
	return (
		
			<Dialog>
				<DialogTrigger className="w-full">
					<Button variant={"ghost"} size={"sm"} className="w-full rounded-none">
						<Eye className="h-1/2" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
