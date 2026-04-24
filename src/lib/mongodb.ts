import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached: { conn: Connection | null; promise: Promise<Connection> | null } = {
  conn: null,
  promise: null,
};

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering to see real connection errors
      maxPoolSize: 5,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      connectTimeoutMS: 30000, // Increased to 30 seconds
      socketTimeoutMS: 60000,
      serverSelectionTimeoutMS: 30000, // Increased to 30 seconds
      retryWrites: true,
      w: 'majority',
      family: 4, // Force IPv4
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('✅ Connected to MongoDB');
        return mongoose.connection;
      })
      .catch((error) => {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('Disconnected from MongoDB');
  }
}
