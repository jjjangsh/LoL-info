import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  id: string;
  name: string;
  title?: string;
  description?: string;
  imageUrl: string;
  linkUrl: string;
  w: number;
  h: number;
  hasLink: boolean;
};

const Card = ({
  id,
  name,
  title,
  description,
  imageUrl,
  linkUrl,
  w,
  h,
  hasLink,
}: CardProps) => {
  return (
    <div className="border border-gray-500 text-center">
      {hasLink && linkUrl ? (
        <Link href={linkUrl}>
          <div className="flex justify-center">
            <Image src={imageUrl} alt={`${id} 이미지`} width={w} height={h} />
          </div>
          <div className="font-bold text-gray-300 text-2xl">{name}</div>
          {title && <div className="text-gray-300">{title}</div>}
          {description && <div className="text-gray-300">{description}</div>}
        </Link>
      ) : (
        <div>
          <div className="flex justify-center">
            <Image src={imageUrl} alt={`${id} 이미지`} width={w} height={h} />
          </div>
          <div className="font-bold text-gray-300 text-2xl">{name}</div>
          {title && <div className="text-gray-300">{title}</div>}
          {description && <div className="text-gray-300">{description}</div>}
        </div>
      )}
    </div>
  );
};

export default Card;
