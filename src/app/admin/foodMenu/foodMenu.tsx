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
import { useFormik } from "formik";
import { foodSchema } from "@/utils/foodSchema";

type FoodInfoTypes = {
  _id: string;
  foodName: string;
  ingredients: string;
  price: string;
  image: string;
};

export const FoodMenu = () => {
  const [getDataFoods, setGetDataFoods] = useState<FoodInfoTypes[]>([]);
  const [imageData, setImageData] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const formik = useFormik({
    initialValues: {
      foodName: "",
      ingredients: "",
      price: "",
      category: "",
      image: "",
    },
    validationSchema: foodSchema,
    onSubmit: async (values) => {
      const uploadedImageUrl = await uploadImageToCloudinary();

      if (!uploadedImageUrl) {
        alert("Image upload failed, please try again.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:4000/foods", {
          ...values,
          image: uploadedImageUrl,
        });
        console.log("Food item added:", response.data);
        fetchData();
      } catch (error) {
        console.error("Error adding food item:", error);
      }
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageData(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadImageToCloudinary = async () => {
    if (!imageData) {
      alert("Please select an image.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", imageData);
    formData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET || ""
    );
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_APIKEY || "");

    try {
      const response = await axios.post(
        `http://localhost:4000/foods`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const deleteFood = async (foodId: string) => {
    console.log("food id", foodId);

    try {
      const response = await axios.delete(
        `http://localhost:4000/foods/${foodId}`
      );
      console.log("Food item deleted:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/foods");
      setGetDataFoods(response.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-4xl font-bold text-gray-900">Dishes Category</h2>
        <Dialog>
          <DialogTrigger className="w-full sm:w-auto bg-indigo-600 text-white rounded-lg py-2 px-6 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Add New Dish
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Enter Food Details
              </DialogTitle>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6 py-6">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label
                      htmlFor="foodName"
                      className="text-right text-lg text-gray-700"
                    >
                      Dish Name
                    </Label>
                    <Input
                      id="foodName"
                      {...formik.getFieldProps("foodName")}
                      className="col-span-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    />
                    {formik.touched.foodName && formik.errors.foodName && (
                      <div className="col-span-3 text-red-500 text-sm mt-1">
                        {formik.errors.foodName}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label
                      htmlFor="category"
                      className="text-right text-lg text-gray-700"
                    >
                      Category
                    </Label>
                    <Input
                      id="category"
                      {...formik.getFieldProps("category")}
                      className="col-span-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label
                      htmlFor="ingredients"
                      className="text-right text-lg text-gray-700"
                    >
                      Ingredients
                    </Label>
                    <Input
                      id="ingredients"
                      {...formik.getFieldProps("ingredients")}
                      className="col-span-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label
                      htmlFor="price"
                      className="text-right text-lg text-gray-700"
                    >
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      {...formik.getFieldProps("price")}
                      className="col-span-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label
                      htmlFor="image"
                      className="text-right text-lg text-gray-700"
                    >
                      Upload Image
                    </Label>
                    <div className="col-span-2">
                      <input
                        type="file"
                        id="image"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded-lg py-2 px-4"
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="mt-4 rounded-lg w-32 h-32 object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-span-3 text-center">
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={formik.isSubmitting}
                      className="bg-indigo-600 text-white rounded-lg py-3 px-8 mt-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
                    >
                      {formik.isSubmitting ? "Submitting..." : "Add Dish"}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className=" w-full max-w-7xl mx-auto pl-10 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {getDataFoods.map((food, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <button
              onClick={() => deleteFood(food._id)} // Pass the food ID to the delete function
              className="ml-[120px] text-red-500"
            >
              x
            </button>
            <h3 className="text-2xl font-semibold text-gray-800">
              {food.foodName}
            </h3>
            <p className="text-gray-600 mt-2">{food.ingredients}</p>
            <p className="text-gray-800 font-bold mt-4">{food.price}</p>
            <img
              src={food.image}
              alt={food.foodName}
              className="mt-4 w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodMenu;
