import { catchFoods } from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

export const FoodCard = ({categoryId, categoryName}: FoodCardProps) => {
    const {
        data:foods =[],
        isLoading,
        error,
    } = useQuery<Foods[]>({
        queryKey:["foods"],
        queryFn:catchFoods,
    });
    const filteredFoods = foods.filter((food) => food.category === categoryId)  if (isLoading) {
    return <p>Loading foods...</p>;
  }
  if (error) {
    return <p>Error loading foods</p>;
  }
}