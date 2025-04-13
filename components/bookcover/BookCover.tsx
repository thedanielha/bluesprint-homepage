import Image from "next/image";

interface BookCoverProps {
  title: string;
  author: string;
}

const BOOKCOVER_URL =
  "https://beyondcity-public.s3.ap-northeast-2.amazonaws.com/book_cover/book_cover.jpg";

export const BookCover = ({ title, author }: BookCoverProps) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <Image src={BOOKCOVER_URL} alt="cover" fill className="object-cover" />
      <div className="absolute inset-0 p-4 pt-8 flex flex-col justify-between ">
        <h4 className="text-lg font-bold leading-tight">{title}</h4>
        <p className="text-sm mb-0">{author}</p>
      </div>
    </div>
  );
};
