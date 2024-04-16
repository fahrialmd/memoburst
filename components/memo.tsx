import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Memo() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Subject</CardTitle>
				<CardDescription>Username</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Content</p>
			</CardContent>
		</Card>
	);
}
