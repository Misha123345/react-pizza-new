import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

const Categories = () => {
  const categoryId = useSelector((state) => state.filters.categoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((category) => {
          return (
            <li
              key={category.id}
              className={categoryId === category.id ? "active" : ""}
              onClick={() => {
                dispatch(setCategoryId(category.id));
              }}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const categoriesArr = [
  { id: 0, name: "Все" },
  { id: 1, name: "Мясные" },
  { id: 2, name: "Вегетерианские" },
  { id: 3, name: "Гриль" },
  { id: 4, name: "Острые" },
  { id: 5, name: "Закрытые" },
];

export default Categories;
