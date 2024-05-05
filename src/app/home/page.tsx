"use client";
import MainLayout from "@/app/components/MainLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "../config";

const HomePage = () => {
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    // Retrieve the username and regis_id from session storage
    const username = sessionStorage.getItem("username");
    const regis_id = sessionStorage.getItem("userId");
    const isoReleaseDate = new Date(releaseDate).toISOString();

    const formData = new FormData();
    formData.append("username", username || "");
    formData.append("release_date", isoReleaseDate);
    formData.append("result", String(result));
    formData.append("regis_id", regis_id || "");
    if (file) {
      formData.append("image", file);
    }

    const response = await fetch(`${BASE_URL}/user/result`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <MainLayout>
      <div className="overflow-x-auto bg-white rounded-lg p-2 flex flex-row justify-between">
        <div className="w-full h-full p-32">
          <div className="text-3xl font-bold">ATK Result</div>
          <div className="pt-4 font-bold">Release Date</div>
          <div className="flex justify-center">
            <input
              type="date"
              className="rounded-lg border-accent text-accent w-2/4"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>

          <div className="pt-4 font-bold">Result</div>
          <div className="flex flex-row justify-center gap-32">
            <label className="label cursor-pointer -mt-2 space-x-2">
              <input
                type="radio"
                name="radio-1"
                className="radio"
                value={0}
                checked={result === 0}
                onChange={() => setResult(0)}
              />
              <span className="label-text">Negative</span>
            </label>
            <label className="label cursor-pointer -mt-2 space-x-2">
              <input
                type="radio"
                name="radio-1"
                className="radio"
                value={1}
                checked={result === 1}
                onChange={() => setResult(1)}
              />
              <span className="label-text">Positive</span>
            </label>
          </div>

          <div className="pt-4 font-bold">Lab Result Photo</div>
          <div className="flex justify-center">
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs file-input-accent"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <div className="pt-16 flex justify-center text-accent">
            <div
              className="border border-accent p-2 w-2/4 flex justify-center rounded-lg hover:bg-accent hover:text-white cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
        <div className="w-full h-[40rem] p-2 rounded-lg border border-dashed border-gray-900/25 relative">
          <Image
            src="/myatk.jpg"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
