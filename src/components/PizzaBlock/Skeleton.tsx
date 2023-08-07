import React from "react";
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={1}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#e6e6e6"
    foregroundColor="#bdbdbd"
  >
    <path d="M 10.44 5 v 0.006 a 0.657 0.657 1 -0.626 0.619 h -8.75 a 0.6 0.6  1 -0.439 -0.186 A 0.6 0.6 0 1.439 5 a 0.6 0.6 0 1.186 -0.44 L 5 0.187 A 0.6 0.6 0 15.44 0 a 0.6 0.6 0 1.439 0.186 l 4.375 4.375 A 0.6 0.6 0 110.44 5 z" />
    <rect x="0" y="275" rx="10" ry="10" width="280" height="28" />
    <rect x="0" y="317" rx="10" ry="10" width="280" height="69" />
    <rect x="0" y="413" rx="10" ry="10" width="104" height="36" />
    <rect x="132" y="404" rx="25" ry="25" width="148" height="50" />
    <circle cx="137" cy="130" r="130" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
