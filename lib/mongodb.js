require("dotenv").config({ path: "/app/.env" });

import mongoose from "mongoose";

const connectMongoDB = async () => {
	if (mongoose.connection.readyState >= 1) {
		// If already connected, do not create a new connection
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw new Error("Failed to connect to MongoDB");
	}
};

export default connectMongoDB;
