import { Champion } from "@/types/Champions";
import { getChampionDetail } from "@/utils/serverApi";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    name: string;
  };
};

export function generateMetadata({ params }: Props) {
  return {
    title: `lol ${params.name}`,
    description: `lol ${params.name} detail information`,
  };
}

const ChampionDetailPage = async ({ params }: { params: { name: string } }) => {
  try {
    const championDetail: Champion = await getChampionDetail(params.name);

    if (!championDetail) {
      return <div>챔피언 정보를 찾을 수 없습니다.</div>;
    }

    return (
      <div>
        <p className="text-gray-300">{championDetail.name}</p>
        <p className="text-gray-300">{championDetail.title}</p>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/cdn/img/champion/splash/${championDetail.id}_0.jpg`}
          alt={`${championDetail.id}이미지`}
          width={700}
          height={700}
        />
        <span className="text-white">{championDetail.blurb}</span>
        <div className="text-white">
          <h3>스탯</h3>
          <li>{`hp : ${championDetail.stats.hp}`}</li>
          <li>{`mp : ${championDetail.stats.mp}`}</li>
          {Object.entries(championDetail.info).map(([key, value]) => (
            <li key={key}>{`${key} : ${value}`}</li>
          ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error("챔피언 정보를 불러오는 중 오류가 발생하였습니다.", err);
    return <div>챔피언 정보를 불러오는 중 오류가 발생하였습니다.</div>;
  }
};

export default ChampionDetailPage;
