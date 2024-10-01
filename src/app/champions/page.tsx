import React from "react";
import { getChampions, getVersions } from "@/utils/serverApi";
import { ChampionList } from "@/types/Champions";
import Link from "next/link";
import Image from "next/image";

const ChampionListPage = async () => {
  const championList: ChampionList[] = await getChampions();
  const version: string = await getVersions();

  return (
    <>
      <h1 className="pl-16 font-bold text-red-600 text-3xl">챔피언 목록</h1>
      <div className="grid grid-cols-6 gap-[15px] p-16">
        {championList.map((champion) => (
          <div
            className="border border-gray-500 text-center"
            key={champion.name}
          >
            <Link href={`/champions/${champion.id}`}>
              <div className="flex justify-center">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
                  alt={`${champion.id}이미지`}
                  width={200}
                  height={200}
                />
              </div>
              <div className="font-bold text-gray-300 text-2xl">
                {champion.name}
              </div>
              <div className="text-gray-300">{champion.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChampionListPage;
