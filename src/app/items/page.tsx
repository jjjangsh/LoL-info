import { getItems, getVersions } from "@/utils/serverApi";
import Image from "next/image";
import React from "react";

const ItemListPage = async () => {
  const version = await getVersions();
  const items = await getItems();

  return (
    <div>
      <h1 className="font-bold text-red-600 text-3xl pl-16">아이템 목록</h1>
      <div className="grid grid-cols-5 gap-[15px] p-16">
        {items
          .filter((item) => item.consumed !== true && item.inStore !== false)
          .map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center border border-gray-400 p-4"
            >
              <div>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                  width={100}
                  height={100}
                  alt={`${item.name}이미지`}
                />
              </div>
              <span className="text-gray-300 font-bold text-2xl">
                {item.name}
              </span>
              <span className="text-gray-300 text-sm">{item.plaintext}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemListPage;
