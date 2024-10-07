import Card from "@/components/Card";
import { getItems, getVersions } from "@/utils/serverApi";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LOL Items",
  description: "League of Legends Item Information",
};

const ItemListPage = async () => {
  try {
    const version = await getVersions();
    const items = await getItems();

    if (!items || items.length === 0) {
      return <div>아이템 정보를 불러오지 못했습니다.</div>;
    }

    return (
      <div>
        <h1 className="font-bold text-red-600 text-3xl pl-16">아이템 목록</h1>
        <div className="grid grid-cols-5 gap-[15px] p-16">
          {items
            .filter((item) => item.consumed !== true && item.inStore !== false)
            .map((item) => (
              <Card
                key={item.name}
                id={item.name}
                name={item.name}
                description={item.plaintext}
                imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/img/item/${item.image.full}`}
                linkUrl={`/items/${item.name}`}
                w={100}
                h={100}
                hasLink={false}
              />
            ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error("아이템 목록을 불러오는 중 오류가 발생했습니다:", err);
    return <div>아이템 목록을 불러오는 중 문제가 발생했습니다.</div>;
  }
};

export default ItemListPage;
