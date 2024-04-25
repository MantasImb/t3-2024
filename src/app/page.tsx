import Image from "next/image";

const mockUrls = [
  "https://utfs.io/f/47140d1a-bc8f-402a-afc0-a6073eeeddfc-bs1zj9.jpg",
  "https://utfs.io/f/fd32e22a-9393-4639-a534-49c93c679d7a-971nuq.jpeg",
  "https://utfs.io/f/3e64b408-580e-4ee5-bdce-6bc356dc630e-1ody.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      Gallery (work in progress)
    </main>
  );
}
