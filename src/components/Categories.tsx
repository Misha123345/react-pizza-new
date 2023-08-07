import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";


const Categories: React.FC = React.memo(() => {
  const categoryId = useSelector((state: any) => state.filters.categoryId);
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
})

type CategoriesItem = {
  id: number; 
  name: string;
}

const categoriesArr: CategoriesItem[] = [
  { id: 0, name: "Все" },
  { id: 1, name: "Мясные" },
  { id: 2, name: "Вегетерианские" },
  { id: 3, name: "Гриль" },
  { id: 4, name: "Острые" },
  { id: 5, name: "Закрытые" },
];

export default Categories;
