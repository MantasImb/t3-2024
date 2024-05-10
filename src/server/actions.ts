import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import PostHogClient from "./analytics";

export async function deleteImage(id: number) {
  // Delete image with id
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  const posthog = PostHogClient();

  posthog.capture({
    distinctId: user.userId,
    event: "Image Deleted",
    properties: {
      imageId: id,
    },
  });

  await posthog.shutdown();

  redirect("/");
}
