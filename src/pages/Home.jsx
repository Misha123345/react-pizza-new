import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import {
  setCurrentPage,
  setFilters,
  initialState,
  selectFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const { searchValue, categoryId, selectedSort, currentPage } = useSelector(
    selectFilters
  );
  const { items, status } = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(3);

  // змінні для того щоб уникнути першого запросу і першого рендера
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // функція запросу піц
  async function getPizzas() {
    const url = "https://6439579c4660f26eb1b08e62.mockapi.io/pizzas";

    const params = {
      category: categoryId === 0 ? "" : categoryId,
      sortBy: selectedSort,
      page: currentPage + 1,
      limit: 4,
    };

    dispatch(fetchPizzas({ url, params }));
  }

  // сканує УРЛ і якщо там є параметри, то зберігає їх в обєкт, є провірка на співпадіння з інітіалСтейт(Костиль) і забороняє на цьому рендері запрошувати піци
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      if (
        initialState.categoryId === Number(params.categoryId) &&
        initialState.selectedSort === params.selectedSort &&
        initialState.currentPage === Number(params.currentPage)
      ) {
        getPizzas();
      }
      dispatch(setFilters(params));
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Запрошує піци якщо ісСьорч фолз і не запрошує якщо тру
  useEffect(() => {
    if (categoryId !== 0) {
      setTotalPages(0);
      dispatch(setCurrentPage(0));
    } else {
      setTotalPages(3);
    }

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;

    // eslint-disable-next-line
  }, [categoryId, selectedSort, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Не дає пристроїти квері параметри при запуску сайту
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          selectedSort,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true },
      );
      navigate(queryString);
    }
    isMounted.current = true;
  }, [categoryId, selectedSort, currentPage, navigate]);

  const pizzas = items
    .filter((item) => {
      if (item.name.toLowerCase().includes(searchValue.toLowerCase().trim())) {
        return true;
      }
      return false;
    })
    .map((pizza) => {
      return <PizzaBlock key={pizza.id} {...pizza} />
    });

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Сталася помилка {":("}</h2>
          <p>Не вдалося отримати піцци, спробуйте трохи пізніше.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(4)].map((_, index) => {
                return <PizzaSkeleton key={index} />;
              })
            : pizzas}
        </div>
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Home;
