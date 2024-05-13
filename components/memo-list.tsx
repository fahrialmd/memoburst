/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Memo from "./memo";
import OrderMenu from "./order-menu";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export const getTopics = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/topics/", {
			cache: "no-store",
		});
		if (!res.ok) {
			throw new Error("Failed to fetch topics");
		} else {
			return res.json();
		}
	} catch (error) {
		console.log("Error loading topics");
	}
};

export default function MemoList() {
	const [topics, setTopics] = useState([]);
	const [order, setOrder] = useState("latest");

	const orderTranslate: Record<string, string> = {
		latest: "Latest",
		oldest: "Oldest",
		ascend: "A-Z",
		descend: "Z-A",
	};

	useEffect(() => {
		const fetchTopics = async () => {
			const { topics } = await getTopics();
			setTopics(topics);
		};
		fetchTopics();
	}, []);

	useEffect(() => {
		const sortedTopics = [...topics]; // Create a copy of topics array
		sortedTopics.sort((a: any, b: any) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);
			if (order === "latest") {
				return dateB.getTime() - dateA.getTime();
			} else if (order === "oldest") {
				return dateA.getTime() - dateB.getTime();
			} else if (order === "ascend") {
				return a.subject.localeCompare(b.subject);
			} else if (order === "descend") {
				return b.subject.localeCompare(a.subject);
			}
			return 0;
		});
		setTopics(sortedTopics);
	}, [order]);

	return (
		<main className="space-y-5">
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="w-[100px]">
					<Button
						variant="outline"
						className="flex items-center justify-between"
					>
						<p>{orderTranslate[order]}&emsp;</p>
						<ChevronDown className="w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="start">
					<DropdownMenuLabel>Order by</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
						<DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="ascend">A-Z</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="descend">Z-A</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<div className="md:grid md:grid-cols-3 md:gap-5  md:space-y-0 space-y-[32px]">
				{topics.map(
					(m: {
						subject: String;
						username: String;
						content: String;
						createdAt: Date;
						_id: React.Key | null | undefined;
					}) => (
						<Memo
							subject={m.subject}
							username={m.username}
							content={m.content}
							createdAt={m.createdAt}
							id={m._id}
							key={m._id}
						/>
					)
				)}
			</div>
		</main>
	);
}
