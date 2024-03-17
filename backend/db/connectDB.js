import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb+srv://vikasnannu:Vikas%4019@cluster0.hkvkf8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
			// To avoid warnings in the console
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
