import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { getImage } from "~/server/queries";

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
        <div className="flex flex-col p-2">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created at:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
