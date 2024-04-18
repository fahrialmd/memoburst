import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import Topic from "../../../../models/topic";

export async function PUT(request, { params }) {
	const { id } = params;
	const {
		newSubject: subject,
		newUsername: username,
		newContent: content,
	} = await request.json();
	await connectMongoDB();
	await Topic.findByIdAndUpdate(id, { subject, username, content });
	return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const topic = await Topic.findOne({ _id: id });
	return NextResponse.json({ topic }, { status: 200 });
}
