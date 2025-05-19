import AudioSlider from "@/componets/TrackCard";

export default async function Home() {
  const res = await fetch("http://localhost:3000/music/tracks.json");
  const tracks = await res.json();
  console.log(tracks);

  return (
    <main className="flex flex-col items-center justify-start h-dvh w-dvw py-30 px-20">
      <div className="flex flex-col items-center justify-start h-dvh w-dvw py-30 px-20">
        <div className="w-full">
          <h1 className="text-xl font-bold mb-4">🎵 추천 음원</h1>
          <div className="overflow-x-auto overflow-y-hidden">
            <AudioSlider tracks={tracks} />
          </div>
        </div>
      </div>
    </main>
  );
}
