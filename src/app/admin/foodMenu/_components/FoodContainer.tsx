import { catchCategories } from "@/utils/axios";
import { useEffect, useState } from "react";
type Categories = {
  category: string;
  _id: string;
};
export const FoodContainer = () => {
  const [categories, setGetCategory] = useState<Categories[]>([]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await catchCategories();
        setGetCategory(response);
      } catch (error) {
        console.log("Error getting categories", error);
      }
    };
    getCategory();
  }, []);
  return (
    <div className="w-full h-auto mt-9 flex flex-col gap-4">
      {categories.map((item, i) => (
        <div key={i} className="mt-4 rounded-lg bg-white py-8 px-5">
          <div className="text-[20px] text-black font-semibold">
            {item.category}
          </div>
          <div className="flex gap-5 ">
            <FoodCard categoryId={item._id} categoryName={item.category} />
          </div>
        </div>
      ))}
    </div>
  );
};
