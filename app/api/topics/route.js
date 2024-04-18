import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import Topic from "../../../models/topic";

export async function POST(request) {
	const { subject, username, content } = await request.json();
	await connectMongoDB();
	await Topic.create({ subject, username, content });
	return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const topics = await Topic.find();
	return NextResponse.json({ topics });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Topic.findByIdAndDelete(id);
	return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
