"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useState, useEffect } from "react";
type OrderType = {
  email: string;
  date: string;
  total: string;
};

export const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

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
          <div className="w-full h-full p-4">
            <div className="text-white mb-4">
              <h1>Orders</h1>
            </div>
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Delivery Address</th>
                  <th className="p-4">Delivery State</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{order.email}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{order.total}</td>
                    <td className="p-4">
                      <button className="text-blue-500 hover:text-blue-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default Order;
