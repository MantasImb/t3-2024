import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { getImage } from "~/server/queries";
import { Button } from "./ui/button";
import { deleteImage } from "~/server/actions";

export default async function FullImagePageView(props: { id: number }) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-shrink items-center justify-center">
        <img className="object-contain" src={image.url} />
      </div>
      {/* <Image
        src={image.url}
        alt={`Image ${image.id}`}
        width={600}
        height={600}
      /> */}
      <div className="w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="p-2">
          <p>Uploaded by:</p>
          <p>{uploaderInfo.fullName}</p>
        </div>
        <div className="p-2">
          <p>Created at:</p>
          <p>{new Date(image.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(image.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
