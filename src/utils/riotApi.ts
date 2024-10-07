import { ChampionRotation } from "@/types/ChampionRotation";

export async function getChampionRotation(): Promise<ChampionRotation> {
  const res = await fetch("/api/rotation");
  const data: ChampionRotation = await res.json();

  return data;
}
