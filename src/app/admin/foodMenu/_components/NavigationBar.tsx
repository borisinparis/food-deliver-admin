import { catchCategories, catchFoods } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import AddCategoriesContainer from "../../_components/addCategoriesContainer";
type Categories = {
  category: string;
  _id: string;
};

type Food = {
  name: string;
  category: string;
};
export const NavigationBar = () => {
  const { data: foods = [] } = useQuery<Food[]>({
    queryKey: ["foods"],
    queryFn: catchFoods,
  });
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Categories[]>({
    queryKey: ["categories"],
    queryFn: catchCategories,
  });

  if (isLoading) {
    return <p>loading categories ...</p>;
  }
  if (error) {
    return <p> error loading categories: {error.message}</p>;
  }
  return (
    <div>
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-4xl font-bold text-gray-900">Dishes Category</h2>
        <div className="flex flex-wrap gap-4 p-6">
          {categories.map((el, index) => {
            const filteredFoods = foods.filter(
              (food) => food.category === el._id
            );
            return (
              <button
                className={`flex items-center gap-2 rounded-3xl px-4 py-2 border ${
                  el.category === "All Dishes"
                    ? "border-red-500 text-black"
                    : "border-gray-300 text-black hover:bg-gray-100"
                }`}
                key={index}
              >
                <span>{el.category}</span>
                <span className="bg-black text-white text-sm font-medium px-2 py-1 rounded-full"></span>
              </button>
            );
          })}
          <AddCategoriesContainer />
        </div>
      </div>
    </div>
  );
};
