import { connectToMongoDB } from 'core/mongoose';

export default async () => {
  await connectToMongoDB();
};
