import React from 'react'
import { Routes, Route } from "react-router-dom";
import Loadable from 'react-loadable';

import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Loading from './components/Loading';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */"./pages/Cart"),
  loading: Loading
})
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */"./pages/FullPizza"))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */"./pages/NotFound"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={
          <React.Suspense fallback={<Loading />}>
            <FullPizza />
          </React.Suspense>} />
        <Route path="*" element={
          <React.Suspense fallback={<Loading />}>
            <NotFound />
          </React.Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
