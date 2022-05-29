import React from "react";
import BasketItem from "./BasketItem";

function BasketList(props) {
  const {
    order,
    handleBasketShow,
    removeFromBasket,
    incrementQuantity,
    decrementQuantity,
  } = props;

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  return (
    <div className="bsk">
      <ul className="collection basket-list">
        <li className="collection-item active">Basket</li>

        {order.length ? (
          order.map((item) => (
            <BasketItem
              key={item.id}
              {...item}
              removeFromBasket={removeFromBasket}
              decrementQuantity={decrementQuantity}
              incrementQuantity={incrementQuantity}
            />
          ))
        ) : (
          <li className="collection-item">Basket is empty</li>
        )}
        <li className="collection-item active">
          Total-price: {totalPrice} <b>$</b>{" "}
        </li>
        <i className="material-icons basket-close" onClick={handleBasketShow}>
          close
        </i>
      </ul>
    </div>
  );
}

export default BasketList;
