import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
	{
		subject: String,
		username: String,
		content: String,
	},
	{
		timestamps: true,
	}
);

const Topic = mongoose.models.memos || mongoose.model("memos", topicSchema);

export default Topic;
