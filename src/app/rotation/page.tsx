"use client";

import Card from "@/components/Card";
import { ChampionRotation } from "@/types/ChampionRotation";
import { ChampionList } from "@/types/Champions";
import { getChampionRotation } from "@/utils/riotApi";
import { getChampionList, getVersions } from "@/utils/serverApi";
import React, { useEffect, useState } from "react";

const RotationChampionPage = () => {
  const [rotation, setRotation] = useState<ChampionRotation | null>(null);
  const [championList, setChampionList] = useState<ChampionList[] | null>(null);
  const [version, setVersion] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRotation = async () => {
      try {
        setLoading(true);

        const res: ChampionRotation = await getChampionRotation();
        const championList = await getChampionList();
        const versionRes = await getVersions();

        setVersion(versionRes);
        setChampionList(championList);
        setRotation(res);
      } catch (err) {
        console.log(err);
        setError("데이터를 불러오는 중 오류가 발생하였습니다" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchRotation();
  }, []);

  const rotatedChampions = rotation?.freeChampionIds
    .map((id) =>
      championList?.find((champion) => champion.key === id.toString())
    )
    ?.filter(Boolean);

  const newPlayersRotatedChampions = rotation?.freeChampionIdsForNewPlayers
    .map((id) =>
      championList?.find((champion) => champion.key === id.toString())
    )
    ?.filter(Boolean);

  if (loading) {
    return <div>로딩 중입니다...</div>;
  }

  if (!championList || !rotation) {
    return <div>데이터를 불러오지 못하였습니다.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-16">
      <h1 className="font-bold text-red-600 text-3xl mb-4">로테이션 챔피언</h1>
      <div className="grid grid-cols-6 gap-[15px]">
        {rotatedChampions && rotatedChampions.length > 0 ? (
          rotatedChampions.map(
            (champion) =>
              champion && (
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
              )
          )
        ) : (
          <div>로테이션 챔피언이 없습니다.</div>
        )}
      </div>

      <h1 className="mt-32 font-bold text-red-600 text-3xl mb-4">
        신규 플레이어용 챔피언
      </h1>
      <div className="grid grid-cols-6 gap-[15px]">
        {newPlayersRotatedChampions && newPlayersRotatedChampions.length > 0 ? (
          newPlayersRotatedChampions.map(
            (champion) =>
              champion && (
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
              )
          )
        ) : (
          <div>신규 플레이어용 챔피언이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RotationChampionPage;
