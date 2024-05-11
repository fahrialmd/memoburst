import React from "react";
import { ModeToggle } from "./ui/theme-toggle";
import Image from "next/image";
import AddNewMemo from "./add-new-memo";
import NavbarSecondary from "./navbar-secondary";
import SearchBar from "./search-bar";

export default function NavbarPrimary() {
	return (
		<main className="container border-b flex h-20 items-center px-4">
			<NavbarSecondary />
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
			<div className="ml-auto  items-center space-x-4 md:flex hidden">
				<AddNewMemo subject="" username="" content="" selection={false} />
				<SearchBar />
				<ModeToggle />
			</div>
		</main>
	);
}
