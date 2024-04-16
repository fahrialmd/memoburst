import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import Topic from "../../../models/topic";

export async function POST(request) {
	const { subject, username, content } = await request.json();
	await connectMongoDB();
	await Topic.create({ subject, username, content });
	return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}
