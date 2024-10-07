import { Champion, ChampionList } from "@/types/Champions";
import { Items } from "@/types/Item";

export async function getVersions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/versions.json`
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/data/ko_KR/champion.json`,
    {
      next: { revalidate: 86400 },
    }
  );
  const data: ChampionListResponse = await res.json();
  return Object.values(data.data);
}

export async function getChampionList(): Promise<ChampionList[]> {
  const version = await getVersions();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/data/ko_KR/champion.json`
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/data/ko_KR/champion/${name}.json`
  );
  const data: ChampionDetailResponse = await res.json();

  return data.data[name];
}

export async function getItems(): Promise<Items[]> {
  const version = await getVersions();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/data/ko_KR/item.json`
  );
  const data = await res.json();

  const response: Items[] = Object.values(data.data);
  return response;
}
