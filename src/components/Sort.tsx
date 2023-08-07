import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { SortVariants, setSelectedSort } from "../redux/slices/filterSlice";

enum SortEnum {
  RATING = 'rating',
  PRICE = 'price',
  NAME = 'name'
}

const sortsArr = ["популярности", "цене", "алфавиту"];
const indexMap = new Map<string, number>();
indexMap.set(SortEnum.RATING, 0);
indexMap.set(SortEnum.PRICE, 1);
indexMap.set(SortEnum.NAME, 2);

type SortProps = {
  selectedSort: SortVariants
}

const Sort: React.FC<SortProps> = React.memo(({ selectedSort }) => {
  const sortRef = useRef<HTMLDivElement>(null);

  const [isPopupActive, setIsPopupActive] = useState(false);
  const [activeSort, setActiveSort] = useState(sortsArr[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    const sortIndex = indexMap.get(selectedSort);
    setActiveSort(sortsArr[sortIndex as number]);
  }, [selectedSort]);

  // close popup when click is outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLBodyElement).closest(".sort") !== sortRef.current) {
        setIsPopupActive(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  function handleClick(sortName: string) {
    
    let sortQuery: SortVariants;

    switch (sortsArr.indexOf(sortName)) {
      case 0:
        sortQuery = SortEnum.RATING;
        break;
      case 1:
        sortQuery = SortEnum.PRICE;
        break;
      case 2:
        sortQuery = SortEnum.NAME;
        break;
      default:
        sortQuery = SortEnum.RATING
        break;
    }

    setActiveSort(sortName);
    setIsPopupActive(false);
    dispatch(setSelectedSort(sortQuery));
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isPopupActive ? "active" : ""}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>

        <b>Сортировка по:</b>
        <span onClick={() => setIsPopupActive((value) => !value)}>
          {activeSort}
        </span>
      </div>

      <div className={isPopupActive ? "sort__popup active" : "sort__popup"}>
        <ul>
          {sortsArr.map((sortName) => (
            <li
              key={sortName}
              className={sortName === activeSort ? "active" : ""}
              onClick={() => {
                handleClick(sortName);
              }}
            >
              {sortName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
})

export default Sort;
