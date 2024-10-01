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
  const championDetail: Champion = await getChampionDetail(params.name);
  // const status = () => {
  //   const result = [];
  //   for (const [key, value] of Object.entries(championDetail.info)) {
  //     result.push(
  //       <li key={key}>
  //         {" "}
  //         {key} : {value}{" "}
  //       </li>
  //     );
  //   }

  //   return result;
  // };

  return (
    <div>
      <p className="text-gray-300">{championDetail.name}</p>
      <p className="text-gray-300">{championDetail.title}</p>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetail.id}_0.jpg`}
        alt={`${championDetail.id}이미지`}
        width={700}
        height={700}
      />
      <span className="text-white">{championDetail.blurb}</span>
      <div className="text-white">
        <h3>스탯</h3>
        {/* <ul>{status()}</ul> */}
        <li>{`hp : ${championDetail.stats.hp}`}</li>
        <li>{`mp : ${championDetail.stats.mp}`}</li>
        {Object.entries(championDetail.info).map(([key, value]) => (
          <li key={key}>{`${key} : ${value}`}</li>
        ))}
      </div>
    </div>
  );
};

export default ChampionDetailPage;
