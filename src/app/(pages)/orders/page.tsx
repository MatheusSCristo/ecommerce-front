"use client";
import { UserContext } from "@/context/UserContext";
import { OrderResponse } from "@/types";
import getOrderByClientId from "@/utils/Order/getOrderByClientId";
import { useContext, useEffect, useState } from "react";
import OptionBar from "./OptionBar";
import Order from "./Order";

type StatusKey =
  | "TODOS"
  | "ENVIADOS"
  | "ENTREGUES"
  | "PROCESSANDO"
  | "CANCELADOS";

type Status = {
  [key in StatusKey]: string;
};

const status: Status = {
  TODOS: "",
  ENVIADOS: "shipped",
  ENTREGUES: "delivered",
  PROCESSANDO: "preparing",
  CANCELADOS: "canceled",
};

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [statusSelected, setStatusSelected] = useState<StatusKey>("TODOS");

  useEffect(() => {
    const getUsersOrders = async (userId: string) => {
      const data = await getOrderByClientId(userId);
      if (!data) return;
      setOrders(data);
    };
    if (user) {
      const { id } = user;
      getUsersOrders(id);
    }
  }, [user]);

  return (
    <section className="flex flex-col mx-2 xl:mx-16 py-5 relative ">
      <OptionBar
        setStatusSelected={setStatusSelected}
        statusSelected={statusSelected}
      />
      <div className="2xl:px-32 py-10 flex flex-col gap-5">
        {!orders.some((order) =>
          order.orderStatus.includes(status[statusSelected])
        ) && (
          <div className="flex justify-center">
            <h1 className="text-md md:text-xl text-center ">
              O usuário não tem nenhum pedido com o status selecionado
            </h1>
          </div>
        )}
        {orders.map((order) => {
          if (order.orderStatus.includes(status[statusSelected]))
            return <Order order={order} />;
        })}
      </div>
    </section>
  );
};

export default Orders;
