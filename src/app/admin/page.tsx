"use client";

import { useState } from "react";

import { Settings } from "lucide-react";
import AdminControllerBar from "./components/adminControllerBar";
import FoodMenu from "./foodMenu/foodMenu";
import Order from "./order/page";

export default function Home() {
  const [step, setStep] = useState("menu");
  return (
    <div className="w-screen h-screen">
      <AdminControllerBar setStep={setStep} />
      {step === "menu" && <FoodMenu />}
      {step === "orders" && <Order />}
      {step === "settings" && <Settings />}
    </div>
  );
}
