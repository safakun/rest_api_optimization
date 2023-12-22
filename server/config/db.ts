import mongoose, { ConnectOptions } from "mongoose";
 
export default function connectDB() {
  const url = process.env.MONGO_URI;
 
  try {
    mongoose.connect(String(url), {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    } as ConnectOptions);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}