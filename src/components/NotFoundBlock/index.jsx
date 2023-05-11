import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.header}>{"Ничего не найдено :("}</h1>
      <Link to="/" className="button">
        Назад
      </Link>
    </div>
  );
};

export default NotFound;
