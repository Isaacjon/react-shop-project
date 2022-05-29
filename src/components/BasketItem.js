import React from "react";

function BasketItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    removeFromBasket,
    decrementQuantity,
    incrementQuantity,
  } = props;
  return (
    <li className="collection-item flex">
      <p>
        {name} {price}
        <b>$</b> <small>x</small> {quantity} = {price * quantity}
        <b>$</b>
      </p>
      <span className="secondary-content">
        <a
          href="!#"
          className="waves-effect waves-light btn"
          onClick={() => incrementQuantity(id)}
        >
          <i className="material-icons ">exposure_plus_1</i>
        </a>
        <a
          href="!#"
          className="waves-effect waves-light btn"
          onClick={() => decrementQuantity(id)}
        >
          <i className="material-icons ">exposure_minus_1</i>
        </a>
        <a href="!#" className="" onClick={() => removeFromBasket(id)}>
          <i className="material-icons basket-delete">delete_forever</i>
        </a>
      </span>
    </li>
  );
}

export default BasketItem;
