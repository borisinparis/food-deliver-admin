import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addCategoryValidationSchema } from "@/utils/loginValidtion";

export const AddCategoriesContainer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: { categoryName: string }) => {
      try {
        const response = await axios.post("http://localhost:4000/category", {
          categoryName: values.categoryName,
        });
        return response.data;
      } catch (error) {
        console.log("Error in mutation function", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Successfully added category", {
        position: "top-right",
        autoClose: 5000,
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to add category: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    },
  });

  const categoryFormik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: addCategoryValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await mutation.mutateAsync(values);
        console.log("mutation result:", response);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
  });

  return (
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
            <div className="grid-cols-4 items-center gap-4">
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
              {categoryFormik.touched.categoryName &&
              categoryFormik.errors.categoryName ? (
                <div className="text-red-500 text-sm mt-2">
                  {categoryFormik.errors.categoryName}
                </div>
              ) : null}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={categoryFormik.isSubmitting}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoriesContainer;
