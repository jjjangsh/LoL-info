import { Champion } from "@/types/Champions";
import { getChampionDetail, getVersions } from "@/utils/serverApi";
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
    const version = await getVersions();
    const championDetail: Champion = await getChampionDetail(params.name);

    if (!championDetail) {
      return <div>챔피언 정보를 찾을 수 없습니다.</div>;
    }

    return (
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row mb-6 justify-center">
          <div className="md:w-1/3 mb-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/cdn/img/champion/splash/${championDetail.id}_0.jpg`}
              alt={`${championDetail.id} 이미지`}
              width={800}
              height={800}
              className="rounded-lg"
            />
          </div>

          <div className="md:w-1/3 md:pl-4">
            <p className="text-gray-300 text-3xl font-bold">
              {championDetail.name}
            </p>
            <p className="text-lg text-yellow-500">{championDetail.title}</p>
            <span className="text-white">{championDetail.blurb}</span>

            <div className="mb-6 text-white py-[32px]">
              <h3 className="text-3xl font-bold mb-2">스탯</h3>
              <ul>
                <li>체력: {championDetail.stats.hp}</li>
                <li>마나: {championDetail.stats.mp}</li>
                <li>이동 속도: {championDetail.stats.movespeed}</li>
                <li>방어력: {championDetail.stats.armor}</li>
                <li>공격력: {championDetail.stats.attackdamage}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 text-white flex flex-col max-w-[1000px]">
          <h3 className="text-2xl font-bold mb-2 relative left-[310px]">
            스킬
          </h3>
          {championDetail.spells.map((spell) => (
            <div
              key={spell.id}
              className="mb-4 flex items-start relative left-[310px]"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/img/spell/${spell.image.full}`}
                alt={spell.name}
                width={64}
                height={64}
                className="mr-2"
              />
              <div>
                <h4 className="text-xl font-bold">{spell.name}</h4>
                <p>{spell.description}</p>
              </div>
            </div>
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
