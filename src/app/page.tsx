"use client";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const getData = async () => {
    const response = await axios.get("http://localhost:9999");
    console.log(response);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      "hello world admin"
    </div>
  );
}
