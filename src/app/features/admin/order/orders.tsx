"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useState, useEffect } from "react";

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
          <div className="w-[1171px] h-[948px]">
            <div className="flex">
              <p className="text-white">Orders</p>
            </div>
            <div className="w-full h-[52px] justify-between gap-[10px] flex">
              <div className="p-[16px]">
                <Checkbox />
              </div>
              <p className="p-[16px]">№</p>
              <p className="p-[16px]">Customer</p>
              <p className="p-[16px]">Food</p>
              <p className="p-[16px]">Date</p>
              <p className="p-[16px]">Total</p>
              <p className="p-[16px]">Delivery Address</p>
              <p className="p-[16px]">Delivery state</p>
            </div>
            {/* Display the fetched orders
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full h-[52px] justify-between gap-[10px] flex"
                >
                  <div className="p-[16px]">
                    <Checkbox />
                  </div>
                  <p className="p-[16px]">{order.number}</p>
                  <p className="p-[16px]">{order.customer}</p>
                  <p className="p-[16px]">{order.food}</p>
                  <p className="p-[16px]">{order.date}</p>
                  <p className="p-[16px]">{order.total}</p>
                  <p className="p-[16px]">{order.deliveryAddress}</p>
                  <p className="p-[16px]">{order.deliveryState}</p>
                </div>
              ))
            ) : (
              <p className="text-white">No orders available</p>
            )} */}
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default AdminPage;
