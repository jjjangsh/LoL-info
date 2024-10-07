import React from "react";
import { getChampions, getVersions } from "@/utils/serverApi";
import { ChampionList } from "@/types/Champions";
import Card from "@/components/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOL Champions",
  description: "League of Legends Champion Information",
};

const ChampionListPage = async () => {
  try {
    const championList: ChampionList[] = await getChampions();
    const version: string = await getVersions();

    if (!championList.length) {
      return <div>챔피언 목록을 불러오지 못했습니다.</div>;
    }

    return (
      <>
        <h1 className="pl-16 font-bold text-red-600 text-3xl">챔피언 목록</h1>
        <div className="grid grid-cols-6 gap-[15px] p-16">
          {championList.map((champion) => (
            <Card
              key={champion.id}
              id={champion.id}
              name={champion.name}
              title={champion.title}
              imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/img/champion/${champion.id}.png`}
              linkUrl={`/champions/${champion.id}`}
              w={200}
              h={200}
              hasLink={true}
            />
          ))}
        </div>
      </>
    );
  } catch (err) {
    console.error("챔피언 목록을 불러오는 중 오류가 발생하였습니다.", err);
    return <div>챔피언 목록을 불러오는 중 오류가 발생하였습니다.</div>;
  }
};

export default ChampionListPage;
