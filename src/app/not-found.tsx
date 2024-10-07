import Link from "next/link";

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
