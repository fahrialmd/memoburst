"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function OrderMenu() {
	const [position, setPosition] = useState("latest");

	const positionTranslate: Record<string, string> = {
		latest: "Latest",
		oldest: "Oldest",
		ascend: "A-Z",
		descend: "Z-A",
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex items-center justify-between">
					<span className="">{positionTranslate[position]}&emsp;</span>
					<ChevronDown className="w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuLabel>Order by</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="ascend">A-Z</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="descend">Z-A</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
