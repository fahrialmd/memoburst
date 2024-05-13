import Memo from "@/components/memo";
import React from "react";

interface props {
	params: any;
}

interface Topic {
	subject: string;
	username: string;
	content: string;
	createdAt: Date;
	_id: React.Key | null | undefined;
}

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

export default async function DetailsPage({ params }: props) {
	const { topics } = await getTopics();

	topics.sort((a: any, b: any) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});

	const filteredTopics = topics.filter((topic: Topic) =>
		topic.subject.includes(params.search)
	);

	return (
		<main className="container py-[32px] ">
			<div className="md:grid md:grid-cols-3 md:gap-5 md:space-y-0 space-y-[32px]">
				{filteredTopics.map((topic: Topic) => (
					<Memo
						key={topic._id}
						subject={topic.subject}
						username={topic.username}
						content={topic.content}
						createdAt={topic.createdAt}
						id={topic._id}
					/>
				))}
			</div>
			{filteredTopics.length === 0 ? (
				<p className="text-center">Item not Found.</p>
			) : null}
		</main>
	);
}
