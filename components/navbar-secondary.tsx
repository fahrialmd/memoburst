import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { List } from "lucide-react";
import Image from "next/image";
import AddNewMemo from "./add-new-memo";
import { ModeToggle } from "./ui/theme-toggle";
import SearchBar from "./search-bar";

export default function NavbarSecondary() {
	return (
		<div className="md:hidden pr-4">
			<Sheet>
				<SheetTrigger>
					<List />
				</SheetTrigger>
				<SheetContent side={"left"}>
					<SheetHeader>
						<SheetTitle className="flex justify-center pt-5">
							<div className="flex contain items-center space-x-2">
								<div className="w-12 h-12 relative">
									<Image
										className="dark:invert"
										src="/memoburst.svg"
										alt="Vercel Logo"
										layout="fill"
										objectFit="contain"
										priority
									/>
								</div>
								<h1 className="font-bold text-2xl">Memoburst</h1>
							</div>
						</SheetTitle>
						<SheetDescription className="space-y-5 pt-10 ">
							<SearchBar />
							<div>
								<AddNewMemo
									subject=""
									username=""
									content=""
									selection={false}
								/>
							</div>
							<ModeToggle />
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
