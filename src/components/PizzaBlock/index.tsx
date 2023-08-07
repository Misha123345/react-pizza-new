import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addItem } from "../../redux/slices/cart/slice";
import { selectCartItemById } from "../../redux/slices/cart/selectors";

const typeNames: string[] = ["тонкое", "традиционное"];

type PizzaBlockProps = { id: string, name: string, price: number, imageUrl: string, sizes: number[], types: number[] }

type Item = { 
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, name, price, imageUrl, sizes, types }) => {
  const [activeSize, setActiveSize] = useState<number>(sizes[0]);
  const [typeIndex, setTypeIndex] = useState<number>(types[0]);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItemById(id));


  const count = cartItems
    ? cartItems.reduce((acc: number, item: Item) => (acc += item.count), 0)
    : 0;

  function handleClickAdd() {
    const item: Item = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[typeIndex],
      size: activeSize,
      count: 1
    };
    dispatch(addItem(item));
  }

  return (
    <div className="pizza-block">
      <Link  to={"/pizza/" + id}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={typeIndex === typeId ? "active" : ""}
              onClick={() => setTypeIndex(typeId)}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => {
            return (
              <li
                key={size}
                className={activeSize === size ? "active" : ""}
                onClick={() => setActiveSize(size)}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={handleClickAdd}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
