"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

type OrderType = {
  email: string;
  date: string;
  total: string;
};

type UserType = {
  _id: string;
  email: string;
};

export const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/");
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const getOrders = async (userIds: string[]) => {
    try {
      const response = await axios.get("http://localhost:4000/order", {
        params: { userIds },
      });
      console.log(response);
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const userIds = users.map((el) => el._id);
      getOrders(userIds);
    }
  }, [users]);

  return (
    <>
      <div className="w-full h-full p-4">
        <div className="text-white mb-4">
          <h1>Orders</h1>
        </div>
        <table className="min-w-full table-auto text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Email</th>
              <th className="p-4"></th>
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
                <td className="p-4">{order.user}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">${order.totalPrice}</td>
                <td className="p-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    {order.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
