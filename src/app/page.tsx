import Link from "next/link";
import lol1 from "../public/lol1.jpg";
import lol2 from "../public/lol2.webp";
import lol3 from "../public/lol3.webp";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="text-center mt-6">
        <h1 className="font-bold text-6xl text-red-600 mb-4">
          League of Legends Information
        </h1>
        <p className="text-yellow-50">
          Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.
        </p>
      </div>

      <div className="my-20 px-10 flex justify-around gap-2">
        <div className="flex justify-center">
          <Link
            href={"champions"}
            className="flex flex-col justify-center items-center text-amber-400 font-bold text-2xl hover:text-amber-600"
          >
            <div className="">
              <Image src={lol1} alt="leftImg" width={500} height={300} />
            </div>
            챔피언 목록
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            href={"items"}
            className="flex flex-col justify-center items-center text-amber-400 font-bold text-2xl hover:text-amber-600"
          >
            <div className="">
              <Image src={lol2} alt="centerImg" width={500} height={300} />
            </div>
            아이템 목록
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            href={"rotation"}
            className="flex flex-col justify-center items-center text-amber-400 font-bold text-2xl hover:text-amber-600"
          >
            <div className="">
              <Image src={lol3} alt="rightImg" width={500} height={300} />
            </div>
            금주 로테이션
          </Link>
        </div>
      </div>
    </>
  );
}
