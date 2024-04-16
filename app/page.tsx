import Memo from "@/components/memo";
import NavbarPrimary from "@/components/navbar-primary";

export default function Home() {
	return (
		<main className="container grid md:grid-cols-3 gap-5 p-5">
			<Memo />
			<Memo />
			<Memo />
		</main>
	);
}
