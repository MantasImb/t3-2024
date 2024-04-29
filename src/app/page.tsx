import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

// Force the page to be dynamic - not statically generated and cached
export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id}>
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={`Image ${image.id}`}
              width={400}
              height={400}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          You must be signed in to view this page.
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </>
  );
}
