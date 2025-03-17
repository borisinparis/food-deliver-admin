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
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

type FoodInfoTypes = {
  foodName: string;
  ingredients: string;
  price: string;
  image: string;
};

const NEXT_PUBLIC_CLOUDINARY_APIKEY = "533495513536988";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dfutcgigt";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const FoodMenu = () => {
  const [imageData, setImageData] = useState<File | null>(null);
  const [foodName, setFoodName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [getDataFoods, setGetDataFoods] = useState<FoodInfoTypes[]>([]);
  const [uploadImage, setUploadImage] = useState("");

  const handleUpLoading = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    setImageData(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const UploadImageToCloudinary = async () => {
    if (!imageData) {
      alert("Please insert photo");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", NEXT_PUBLIC_CLOUDINARY_APIKEY);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image upload response:", response);
      setUploadImage(response.data.secure_url);

      return response.data.secure_url;
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    }
  };

  const handleSubmitCategory = async () => {
    await UploadImageToCloudinary();
    console.log(uploadImage);

    if (!uploadImage) return;

    try {
      const response = await axios.post("http://localhost:4000/foods", {
        foodName,
        price,
        ingredients,
        uploadImage,
      });

      getData();
      console.log("Category created", response.data);
    } catch (err) {
      console.error("Error creating category", err);
    }
  };

  const getData = async () => {
    try {
      const responseData = await axios.get("http://localhost:4000/foods");
      setGetDataFoods(responseData.data);

      console.log(responseData.data);
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
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
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

                <div>
                  <input type="file" onChange={handleUpLoading} />
                  <p>Preview: </p>
                  {previewImage && <img src={previewImage} alt="preview-img" />}
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
              <p>{el.price}</p>
              <img src={el.image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodMenu;
