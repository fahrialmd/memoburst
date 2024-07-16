// require("dotenv").config({ path: "/app/.env" });

// import mongoose from "mongoose";

// const connectMongoDB = async () => {
// 	if (mongoose.connection.readyState >= 1) {
// 		// If already connected, do not create a new connection
// 		return;
// 	}

// 	try {
// 		await mongoose.connect(process.env.MONGODB_URI, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 		console.log("Connected to MongoDB");
// 	} catch (error) {
// 		console.error("Error connecting to MongoDB:", error);
// 		throw new Error("Failed to connect to MongoDB");
// 	}
// };

// export default connectMongoDB;

import mongoose from "mongoose";

const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?authSource=admin`;

// const uri = "mongodb://localhost:27018/crud_db";

const connectMongoDB = async () => {
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Successfully connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};
export default connectMongoDB;
