// app/api/topics/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import Topic from "../../../models/topic";

export async function POST(request) {
	try {
		const { subject, username, content } = await request.json();
		await connectMongoDB();
		const newTopic = await Topic.create({ subject, username, content });
		return NextResponse.json(
			{ message: "Topic Created", topic: newTopic },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error creating topic", error: error.message },
			{ status: 500 }
		);
	}
}

export async function GET(request) {
	try {
		await connectMongoDB();
		const query = request.nextUrl.searchParams.get("query");

		let topics;
		if (query) {
			const regexQuery = {
				$or: [
					{ subject: new RegExp(`${query}`, "i") },
					{ username: new RegExp(`${query}`, "i") },
					{ content: new RegExp(`${query}`, "i") },
				],
			};
			topics = await Topic.find(regexQuery);
		} else {
			topics = await Topic.find();
		}

		return NextResponse.json({ topics });
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching topics", error: error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(request) {
	try {
		const id = request.nextUrl.searchParams.get("id");
		await connectMongoDB();
		await Topic.findByIdAndDelete(id);
		return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Error deleting topic", error: error.message },
			{ status: 500 }
		);
	}
}
