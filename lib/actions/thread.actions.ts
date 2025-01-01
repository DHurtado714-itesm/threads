"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface ThreadProps {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: ThreadProps) {
  try {
    await connectToDB();
    const thread = await Thread.create({
      text,
      author,
      community: communityId,
      path,
    });

    await User.findByIdAndUpdate(author, { $push: { threads: thread._id } });

    revalidatePath(path);

    return thread;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}
