import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import {
  setCurrentPage,
  setFilters,
  initialState,
} from "../redux/slices/filterSlice";

const url = "https://6439579c4660f26eb1b08e62.mockapi.io/pizzas";

const Home = () => {
  const { searchValue, categoryId, selectedSort, currentPage } = useSelector(
    (state) => state.filters,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(3);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  function fetchPizzas() {
    const params = {
      category: categoryId === 0 ? "" : categoryId,
      sortBy: selectedSort,
      page: currentPage + 1,
      limit: 4,
    };

    setIsLoading(true);

    axios.get(url, { params }).then((res) => {
      const selectedPizzas = res.data;
      setIsLoading(false);
      setItems(selectedPizzas);
    });
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(initialState);
      if (
        initialState.categoryId === Number(params.categoryId) &&
        initialState.selectedSort === params.selectedSort &&
        initialState.currentPage === Number(params.currentPage)
      ) {
        fetchPizzas();
      }
      dispatch(setFilters(params));
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (categoryId !== 0) {
      setTotalPages(0);
      dispatch(setCurrentPage(0));
    } else {
      setTotalPages(3);
    }

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

    // eslint-disable-next-line
  }, [categoryId, selectedSort, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      return <PizzaBlock key={pizza.id} {...pizza} />;
    });

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => {
              return <PizzaSkeleton key={index} />;
            })
          : pizzas}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Home;
