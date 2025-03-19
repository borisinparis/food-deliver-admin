import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { foodSchema } from "@/utils/foodSchema";
import * as yup from "yup";

type FoodInfoTypes = {
  _id: string;
  foodName: string;
  ingredients: string;
  price: string;
  image: string;
};
type CategoryTypes = {
  _id: string;
  categoryName: string;
};

export const FoodMenu = () => {
  const [getDataFoods, setGetDataFoods] = useState<FoodInfoTypes[]>([]);
  const [imageData, setImageData] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [getCategory, setGetCategory] = useState<CategoryTypes[]>([]);

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
  const categoryFormik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: yup.object({
      categoryName: yup.string().required("Category name is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await axios.post("http://localhost:4000/category", {
          categoryName: values.categoryName,
        });
        console.log("Category added:", response.data);
        setGetCategory((prev) => [...prev, response.data]);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/category");
      setGetCategory(response.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-4xl font-bold text-gray-900">Dishes Category</h2>
        <div className="flex flex-wrap gap-4 p-6">
          {getCategory.map((el, index) => (
            <button
              className={`flex items-center gap-2 rounded-3xl px-4 py-2 border ${
                el.categoryName === "All Dishes"
                  ? "border-red-500 text-black"
                  : "border-gray-300 text-black hover:bg-gray-100"
              }`}
              key={index}
            >
              <span>{el.categoryName}</span>
              <span className="bg-black text-white text-sm font-medium px-2 py-1 rounded-full"></span>
            </button>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-red-500 text-white text-2xl rounded-[100%]"
              variant="outline"
            >
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <form onSubmit={categoryFormik.handleSubmit}>
              <div className="gap-4 py-4">
                <div className=" grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="categoryName"
                    className="text-right text-lg font-inter font-medium text-[14px] leading-[14px] tracking-[-0.02em]"
                  >
                    Category Name
                  </Label>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    value={categoryFormik.values.categoryName}
                    onChange={categoryFormik.handleChange}
                    className="col-span-3"
                    placeholder="Type category name..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {getCategory.map((el, index) => (
        <div
          key={el._id}
          className="w-[270.75px] h-[241px] border border-gray-300 rounded-[20px] p-[8px_16px] shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <p key={index}>{el.categoryName}</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="m-auto flex items-center justify-center w-12 h-12 border-2 border-gray-200 rounded-lg p-4 shadow-lg"
              >
                +
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enter Food Details</DialogTitle>
                <DialogDescription>
                  Fill in the food details here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="foodName" className="text-right">
                      Dish Name
                    </Label>
                    <Input
                      id="foodName"
                      {...formik.getFieldProps("foodName")}
                      className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    />
                    {formik.touched.foodName && formik.errors.foodName && (
                      <div className="col-span-3 text-red-500 text-sm mt-1">
                        {formik.errors.foodName}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <select
                      id="category"
                      {...formik.getFieldProps("category")}
                      className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    >
                      <option value="">Select a category</option>
                      {getCategory.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ingredients" className="text-right">
                      Ingredients
                    </Label>
                    <Input
                      id="ingredients"
                      {...formik.getFieldProps("ingredients")}
                      className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      {...formik.getFieldProps("price")}
                      className="col-span-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-lg py-2 px-4"
                    />
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Upload Image
                    </Label>
                    <div className="col-span-3">
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
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-indigo-600 text-white rounded-lg py-3 px-8 mt-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
                  >
                    {formik.isSubmitting ? "Submitting..." : "Add Dish"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ))}

      {/* <div className="w-full max-w-7xl mx-auto pl-10 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {getDataFoods.map((food, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <button
                onClick={() => deleteFood(food._id)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                ❌
              </button>
              <img
                src={food.image}
                alt={food.foodName}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">
              {food.foodName}
            </h3>
            <p className="text-gray-600 mt-2">{food.ingredients}</p>
            <p className="text-gray-800 font-bold mt-4">${food.price}</p>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default FoodMenu;
