import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_KEY, API_URL } from "../config";
import BasketList from "./BasketList";
import Cart from "./Cart";
import GoodList from "./GoodList";
import Loader from "./Loader";

const Shop = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => {
      return orderItem.id === item.id;
    });

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    toast.success("Goods added to basket successfully");
  };

  const handleBasketShow = () => {
    setShowBasket(!showBasket);
  };

  const removeFromBasket = (itemID) => {
    const newOrder = order.filter((item) => item.id !== itemID);
    setOrder(newOrder);
    toast.error("Goods deleted from basket successfully");
  };

  const incrementQuantity = (itemID) => {
    const newOrder = order.map((el) => {
      if (el.id === itemID) {
        const newQuantity = el.quantity + 1;
        return {
          ...el,
          quantity: newQuantity,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  const decrementQuantity = (itemID) => {
    const newOrder = order.map((el) => {
      if (el.id === itemID) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, [order]);

  return (
    <div className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Loader />
      ) : (
        <GoodList goods={goods} addToBasket={addToBasket} />
      )}
      {showBasket && (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeFromBasket}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      )}
    </div>
  );
};

export default Shop;
