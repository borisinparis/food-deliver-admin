import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
type FoodInfoTypes = {
  foodName: string;
  ingredients: string;
  price: string;
};

export const FoodMenu = () => {
  const [foodName, setFoodName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [getDataFoods, setGetDataFoods] = useState<FoodInfoTypes[]>([]);

  const handleSubmitCategory = async () => {
    try {
      const response = await axios.post("http://localhost:4000/foods", {
        foodName: foodName,
        price: price,
        ingredients: ingredients,
      });
      console.log("Category created", response.data);
    } catch (err) {
      console.error("Error creating category", err);
    }
  };
  const getData = async () => {
    try {
      const responseData = await axios.get("http://localhost:4000/foods");
      setGetDataFoods(responseData.data);
    } catch (err) {
      console.log("Error getData", err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-[1171px] h-[20%]">
        <h2>Dishes category</h2>
        <Button className="w-[36px] h-[36px] rounded-3xl">Submit</Button>
      </div>

      <div className="w-[1171px] h-[582px] flex">
        <Dialog>
          <div className="border-4 w-[270px] border-red-500 border-dashed">
            <DialogTrigger className="w-[270px] h-[241px] bg-gray-200">
              Open Dish Info
            </DialogTrigger>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dishes Info</DialogTitle>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dishName" className="text-right">
                    Dish name
                  </Label>
                  <Input
                    id="dishName"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dishName" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="dishName"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ingredients" className="text-right">
                    Ingredients
                  </Label>
                  <Input
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <Button onClick={handleSubmitCategory} variant="outline">
                  Add
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="food-list">
          {getDataFoods.map((el, index) => (
            <div
              key={index}
              className="border-4 w-[270px] border-red-500 border-dashed"
            >
              <h3>{el.foodName}</h3>
              <p>{el.ingredients}</p>
              <p>${el.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodMenu;
