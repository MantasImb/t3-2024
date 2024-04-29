import Image from "next/image";
import { getImage } from "~/server/queries";

export default async function FullImagePageView(props: { id: number }) {
  const image = await getImage(props.id);

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
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
