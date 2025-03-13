"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useState, useEffect } from "react";
import FoodMenu from "./foodMenu/foodMenu";

export const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/");
      console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <FoodMenu />
        </main>
      </SidebarProvider>
    </>
  );
};

export default AdminPage;
