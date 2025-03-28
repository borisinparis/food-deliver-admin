import axios from "axios";
export const catchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:4000/category");
    return response.data;
  } catch (error) {
    console.log("error categories axios", error);
  }
};
export const catchFoods = async () => {
  try {
    const response = await axios.get("http://localhost:4000/foods");
    return response.data;
  } catch (error) {
    console.log("error foods axios", error);
  }
};
