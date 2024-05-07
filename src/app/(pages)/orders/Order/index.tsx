import { ProductsContext } from "@/context/ProductsContext";
import { OrderProductResponse, OrderResponse } from "@/types";
import updateOrder from "@/utils/Order/updateOrder";
import { useContext, useState } from "react";
import ProductOrderCard from "./ProductOrderCard";

const getCreatedDateInPT = (date: Date) => {
  const newDate = new Date(date);
  return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
};

const translatePaymentStatus = (paymentStatus: string) => {
  const status = [
    { paymentStatus: "pending", translatedStatus: "pendente" },
    { paymentStatus: "authorized", translatedStatus: "autorizado" },
    { paymentStatus: "refused", translatedStatus: "cancelado" },
  ];
  const find = status.find((item) => item.paymentStatus === paymentStatus);
  return find?.translatedStatus;
};

const translateOrderStatus = (orderStatus: string) => {
  const status = [
    { orderStatus: "preparing", translatedStatus: "preparando" },
    { orderStatus: "payment_pending", translatedStatus: "Pedido pendente" },
    { orderStatus: "shipped", translatedStatus: "enviado" },
    { orderStatus: "delivered", translatedStatus: "entregue" },
    { orderStatus: "canceled", translatedStatus: "cancelado" },
  ];
  const find = status.find((item) => (item.orderStatus === orderStatus));
  if (!find) return null;
  return find?.translatedStatus;
};

const getColorPaymentStatusText = (paymentStatus: string) => {
  switch (paymentStatus) {
    case "pending":
      return "text-pendingYellow";
    case "authorized":
      return "text-lime-500";
    case "refused":
      return "text-red-500";
    default:
      return;
  }
};



const Order = ({ order }: { order: OrderResponse }) => {
  const { orderProduct: orderProducts } = order;
  const { products } = useContext(ProductsContext);
  const [cancelError, setCancelError] = useState(false);

  const getProductInfos = (orderProduct: OrderProductResponse) => {
    const product = products.find((item) => item.id === orderProduct.productId);
    return product;
  };

  const handleCancelOrder = async () => {
    const body = {
      orderStatus: "canceled",
    };
    try {
      await updateOrder(body, order.id);
    } catch {
      setCancelError(true);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(order.id);
  }


  return (
    <div className="flex flex-col bg-white px-3 2xl:px-10 py-5 rounded-sm">
      <div className="flex flex-col 2xl:flex-row 2xl:justify-between border-gray-400 border-b-[1px] py-2 2xl:items-center">
        <h1 className={`font-bold capitalize text-xl ${order.orderStatus==="canceled" && "text-red-500"} `}>
          {translateOrderStatus(order.orderStatus)}
        </h1>
        <div className="flex flex-col">
          <span className="text-gray-600 2xl:text-right">
            Pedido feito em: {getCreatedDateInPT(order.createdAt)}
          </span>
          <div className="flex gap-2">
            <span className="text-gray-600">Numero do pedido: {order.id}</span>
            <span className="text-blue cursor-pointer hover:underline "onClick={handleCopyToClipboard}>
              Copiar
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-5 gap-5 ">
        {orderProducts.map((orderProduct) => {
          const product = getProductInfos(orderProduct);
          if (product)
            return (
              <ProductOrderCard product={product} orderProduct={orderProduct} />
            );
        })}
      </div>
      <div className="self-end flex flex-col gap-2 ">
        <div className="flex flex-col">
          <div className="flex gap-1 items-center w-full  ">
            <h1 className="font-bold 2xl:text-2xl">Total:</h1>
            <h1 className="2xl:text-xl">R$ {order.totalInCents / 100}</h1>
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="font-bold 2xl:text-2xl">Status do pagamento:</h1>
            <h1
              className={`capitalize 2xl:text-xl ${getColorPaymentStatusText(
                order.payment?.paymentStatus
              )} `}
            >
              {translatePaymentStatus(order.payment?.paymentStatus) ??
                "Pagamento não realizado"}
            </h1>
          </div>
        </div>
        <div className="flex self-end flex-col  w-full">
          <button
            className="px-3 py-2 bg-black text-white rounded-md w-fit disabled:opacity-75 "
            disabled={
              order.orderStatus === "delivered" ||
              order.orderStatus === "canceled"
            }
            onClick={handleCancelOrder}
          >
            Cancelar pedido
          </button>
          {cancelError && (
            <span className="text-red-500">
              Aconteceu um erro ao cancelar o pedido,tente novamente.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Order;
