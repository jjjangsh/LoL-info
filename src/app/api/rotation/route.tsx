import { ChampionRotation } from "@/types/ChampionRotation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": process.env.NEXT_RIOT_API_KEY || "",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "챔피언 로테이션 정보를 불러올 수 없습니다." },
        { status: res.status }
      );
    }

    const data: ChampionRotation = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("서버 에러 발생:", error);
    return NextResponse.json(
      { error: "서버에서 문제가 발생했습니다." },
      { status: 500 }
    );
  }
}
