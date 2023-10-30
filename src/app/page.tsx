import PostLayout from "./[category]/layout";

export default function Home() {
  return (
    <PostLayout>
      <div>home 입니다~</div>
      <Banner />
    </PostLayout>
  );
}

function Banner() {
  return <div>Banner</div>;
}
