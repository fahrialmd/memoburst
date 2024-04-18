import React from "react";
import Memo from "./memo";

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

export default async function MemoList() {
	const { topics } = await getTopics();
	return (
		<main className="md:grid md:grid-cols-3 md:gap-5 md:pt-[32px] md:space-y-0 md:py-0 space-y-[32px] py-[32px]">
			{topics.map(
				(m: {
					subject: String;
					username: String;
					content: String;
					_id: React.Key | null | undefined;
				}) => (
					<Memo
						subject={m.subject}
						username={m.username}
						content={m.content}
						id={m._id}
						key={m._id}
					/>
				)
			)}
		</main>
	);
}
