/* eslint-disable @next/next/no-async-client-component */
// app/search/[search]/page.tsx
"use client";
import Memo from "@/components/memo";
import React from "react";

interface Props {
	params: any;
}

interface Topic {
	subject: string;
	username: string;
	content: string;
	createdAt: Date;
	_id: React.Key | null | undefined;
}

export const getTopics = async (query: string) => {
	try {
		const url = new URL(
			`/api/topics${query ? `?query=${query}` : ""}`,
			window.location.origin
		);
		const res = await fetch(url.toString(), {
			cache: "no-store",
		});
		if (!res.ok) {
			throw new Error("Failed to fetch topics");
		}
		return res.json();
	} catch (error) {
		console.log("Error loading topics", error);
		return { topics: [] };
	}
};

const DetailsPage = async ({ params }: Props) => {
	const { topics } = await getTopics(`${params.search}`);

	if (!topics) {
		return (
			<main className="container py-[32px]">
				<p className="text-center">Failed to load topics.</p>
			</main>
		);
	}

	topics.sort((a: any, b: any) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});

	return (
		<main className="container py-[32px]">
			<div className="md:grid md:grid-cols-3 md:gap-5 md:space-y-0 space-y-[32px]">
				{topics.map((topic: Topic) => (
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
			{topics.length === 0 ? (
				<p className="text-center">Item not Found.</p>
			) : null}
		</main>
	);
};

export default DetailsPage;
