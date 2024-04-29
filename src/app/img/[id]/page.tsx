import Image from "next/image";
import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo ID");
  const image = await getImage(idAsNumber);

  return (
    <div>
      <Image
        src={image.url}
        alt={`Image ${image.id}`}
        width={600}
        height={600}
      />
    </div>
  );
}
