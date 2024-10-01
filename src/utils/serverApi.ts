import { Champion, ChampionList } from "@/types/Champions";

export async function getVersions() {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const data: string[] = await res.json();
  return data[0];
}

type ChampionListResponse = {
  data: Record<string, ChampionList>;
};

export async function getChampions(): Promise<ChampionList[]> {
  const version = await getVersions();
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`,
    {
      next: { revalidate: 86400 },
    }
  );
  const data: ChampionListResponse = await res.json();
  return Object.values(data.data);
}

type ChampionDetailResponse = {
  data: Record<string, Champion>;
};

export async function getChampionDetail(name: string): Promise<Champion> {
  const version = await getVersions();
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${name}.json`
  );
  const data: ChampionDetailResponse = await res.json();

  return data.data[name];
}
