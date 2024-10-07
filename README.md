# 프로젝트 개요

- 프로젝트명 : LoL Dex

</br>

- 프로젝트 소개 : Riot API를 활용한 리그 오브 레전드 정보 앱

</br>

- 진행기간 : 2024.09.27 ~ 2024.10.07

</br>

- 배포링크 : https://lo-l-info.vercel.app/

</br>

# 주요 기능

<img src="https://github.com/user-attachments/assets/c1f926e3-3e8d-4448-8bbf-277eef82fc90" width="500" height="400"/>
</br>
🔼홈

</br>
</br>

<img src="https://github.com/user-attachments/assets/4c31692c-4bf9-46d2-ba56-124e5798aab4" width="500" height="200"/>
</br>
🔼챔피언 목록

</br>
</br>

<img src="https://github.com/user-attachments/assets/85c93e13-e9d6-43f7-b14b-dc47374050cd" width="500" height="400"/>
</br>
🔼챔피언 상세보기

</br>
</br>

<img src="https://github.com/user-attachments/assets/e08e17d1-88c8-4c52-abe3-5899a59be460" width="500" height="300"/>
</br>
🔼아이템 목록

</br>
</br>

<img src="https://github.com/user-attachments/assets/545997c7-db15-45bc-a254-f167635a8f4c" width="500" height="200"/>
</br>
🔼로테이션 챔피언 목록

</br>
</br>

<img src="https://github.com/user-attachments/assets/25154d4f-feb5-4494-b989-ceea19fd6c1e" width="500" height="200"/>
</br>
🔼신규 플레이어를 위한 무료 챔피언 목록

</br>
</br>

# 기술 스택

![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1728321561893?alt=media&token=2784cdd6-e581-45ca-81eb-86ebec0dc030)

</br>

# 주요 코드

<details>
<summary>레이아웃</summary>

- 공통적인 헤더, 푸터 레이아웃
- metadata 설정

```
export const metadata: Metadata = {
  title: "LOL DEX",
  description: "League of Legends Information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="py-[60px] bg-black">
        <header className="bg-gray-900 text-white py-6 fixed top-0 w-full z-10">
          <nav className="container mx-auto flex justify-around">
            <Link href={"/"} className="hover:text-red-600">
              <span className="font-bold text-lg">홈</span>
            </Link>
            <Link href={"/champions"} className="hover:text-red-600">
              <span className="font-bold text-lg">챔피언 목록</span>
            </Link>
            <Link href={"/items"} className="hover:text-red-600">
              <span className="font-bold text-lg">아이템 목록</span>
            </Link>
            <Link href={"/rotation"} className="hover:text-red-600">
              <span className="font-bold text-lg">챔피언 로테이션</span>
            </Link>
          </nav>
        </header>

        <main className="flex-1 py-[100px] 100vh">{children}</main>

        <footer className="bg-gray-900 p-4 py-6 mt-8 fixed bottom-0 w-full">
          <div className="container mx-auto text-center text-yellow-50 text-sm">
            LOL-DEX is not endorsed by Riot Games and does not reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing Riot Games properties. Riot Games and all associated
            properties are trademarks or registered trademarks of Riot Games,
            Inc.
          </div>
        </footer>
      </body>
    </html>
  );
}
```

 </details>

<details>
<summary>loading, not-found</summary>
  - 모든 컴포넌트에 공통으로 로딩 UI 를 적용
  - Global not-found ( 존재하지 않는 페이지에 접근했을 때 해당 컴포넌트가 렌더링 )

```
const loading = () => {
  return (
    <div className="text-5xl text-white font-bold">로딩중입니다...!⏳⏳⏳</div>
  );
};

export default loading;
```

</br>

```
const NotFound = () => {
  return (
    <div className="text-center mt-[100px]">
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>페이지가 존재하지 않습니다.</p>
      <Link href="/" className="text-red-600">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
```
  
<details>

<details>
<summary>챔피언 목록페이지(ISR)</summary>

- 모든 챔피언 목록을 보여줌
- 사용자의 요청이 있을 때, revalidate 옵션에 설정된 시간이 경과하면, 페이지를 서버에서 재생성
- metadata 설정
- 에러핸들링

```
// src/utils/serverApi.ts

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
```

</br>

```
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
```

</details>

<details>
<summary>챔피언 상세페이지(SSG)</summary>

 - 챔피언 이름과 설명, 능력치와 보유 스킬을 보여줌
 - 동적 metadata 설정
 - 에러핸들링

```
// src/utils/serverApi.ts

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
```

</br>

```
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
```

 </details>

<details>
<summary>로테이션 페이지(CSR)</summary>

- 주마다 바뀌는 로테이션에 해당하는 챔피언들만 목록으로 보여줌
- Route Handlers는 로테이션 페이지에서만 사용하고 /api/rotation 엔드포인트 유지
- 에러핸들링

```
// src/utils/riotApi.ts

export async function getChampionRotation(): Promise<ChampionRotation> {
  const res = await fetch("/api/rotation");
  const data: ChampionRotation = await res.json();

  return data;
}
```

</br>

```
// src/app/api/rotation/route.tsx

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
```

</br>

```
"use client"

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


```

</details>

<details>
<summary>아이템 목록페이지(SSG)</summary>

- 아이템 전부를 목록으로 보여줌
- 에러핸들링

```
// src/utils/serverApi

export const metadata: Metadata = {
  title: "LOL Items",
  description: "League of Legends Item Information",
};

const ItemListPage = async () => {
  try {
    const version = await getVersions();
    const items = await getItems();

    if (!items || items.length === 0) {
      return <div>아이템 정보를 불러오지 못했습니다.</div>;
    }

    return (
      <div>
        <h1 className="font-bold text-red-600 text-3xl pl-16">아이템 목록</h1>
        <div className="grid grid-cols-5 gap-[15px] p-16">
          {items
            .filter((item) => item.consumed !== true && item.inStore !== false)
            .map((item) => (
              <Card
                key={item.name}
                id={item.name}
                name={item.name}
                description={item.plaintext}
                imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/img/item/${item.image.full}`}
                linkUrl={`/items/${item.name}`}
                w={100}
                h={100}
                hasLink={false}
              />
            ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error("아이템 목록을 불러오는 중 오류가 발생했습니다:", err);
    return <div>아이템 목록을 불러오는 중 문제가 발생했습니다.</div>;
  }
};

export default ItemListPage;

```

</details>

<details>
<summary>types</summary>

```
// ChampionRotation

export type ChampionRotation = {
  freeChampionIds: number[];
  freeChampionIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
};

```

</br>

```
// Champion

export type ChampionList = {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  key: string;
};

export type Skin = {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
};

export type Champion = {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficultiy: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  partype: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
  spells: [
    {
      id: string;
      name: string;
      description: string;
      cooldownBurn: string;
      image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
      };
    }
  ];
  passive: {
    name: string;
    description: string;
    image: {
      full: string;
      sprite: string;
      group: string;
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
  skins: Skin[];
};
```

</br>

```
// Items

export type Items = {
  name: string;
  plaintext: string;
  image: {
    full: string;
  };
  consumed?: boolean;
  inStore?: boolean;
};

```

</details>

</br>
</br>

# 트러블 슈팅

## 1. 💣 unknown[] 형식에는 Items 형식의 속성이 없다는 에러

```
export type Items = {
  name: string;
  plaintext: string;
  image: {
    full: string;
  };
  consumed?: boolean;
  inStore?: boolean;
};
```

</br>

```
export async function getItems(): Promise<Items> {
  const version = await getVersions();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/data/ko_KR/item.json`
  );
  const data = await res.json();

  const response: Items = Object.values(data.data);
  return response;
}
```

</br>

- 원인
  - Items와 Object.values(data.data)의 타입 불일치
  - Items 타입과 반환값의 형식이 맞지 않기 때문에 타입스크립트에서 오류가 발생

</br>

Object.values()가 반환하는 것은 배열(Items[])이지만 함수의 반환 타입은 Items로 정의되어 있었기 때문!

- 해결책
  - 함수의 반환 타입을 Items[]로 수정

```
export async function getItems(): Promise<Items[]> {
  const version = await getVersions();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/data/ko_KR/item.json`
  );
  const data = await res.json();

  const response: Items[] = Object.values(data.data);
  return response;
}

```

</br>

## 2. 💣 Champion[] 형식에 'data' 속성이 없습니다.

```
export async function getChampionDetail(name: string): Promise<Champion> {
  const version = await getVersions();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/cdn/${version}/data/ko_KR/champion/${name}.json`
  );
  const data: Champion[] = await res.json();

  return data.data[name];
}
```

- 원인

  - 또! 응답 구조와 타입 불일치
  - const data: Champion[] = await res.json(); 여기서 Champion[]로 타입을 지정했기 때문, 실제로 API 응답 구조는 단일 챔피언 객체가 아니라, 챔피언 객체들을 포함한 데이터 구조이고 즉 데이터는 Champion[]가 아니라 객체 안에 챔피언 데이터가 포함된 구조이다.

- 해결책
  - data 객체는 문자열의 키, 값은 Champion 타입이라고 명시해야함

```
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
```

이전 코드에서 Champion 객체가 배열로 반환된다고 예상했고 Champion[]라고 타입을 정의 했지만 실제로는 객체를 받았던 것이고, API 응답이 객체(Record<string, Champion>)임을 반영한 ChampionDetailResponse 타입으로 수정하였고, 그 결과 데이터 구조가 올바르게 매칭되었다.
