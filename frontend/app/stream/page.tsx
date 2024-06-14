import Image from "next/image";

export default function StreamPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <video controls width="600">
        <source src="http://localhost:5000/video/How_I_Met_Your_Mother_S04_COMBINED_720p_English_WEB_DL_2CH_x265 -Vegamovies.to.mkv" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}
