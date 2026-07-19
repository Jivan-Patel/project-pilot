import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Authenticate using Clerk or fallback to sandbox developer
      let userId: string | null = null;
      
      if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
        try {
          const session = await auth();
          userId = session?.userId || null;
        } catch(e) {}
      } 
      
      // Fallback to mock developer if Clerk fails or is bypassed in dev mode
      if (!userId && process.env.NODE_ENV === "development") {
        userId = "mock-developer-id";
      }

      if (!userId) throw new Error("Unauthorized upload attempt");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("Uploaded file URL:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;