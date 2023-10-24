import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faFlask,
  faHeart,
  faPlane,
  faUtensils,
  faFutbol,
  faFilm,
  faTshirt,
  faMusic,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

function Categories(categories, onCategorySelect) {
  const categories = [
    { name: "Tech", icon: faLaptop },
    { name: "Science", icon: faFlask },
    { name: "Health", icon: faHeart },
    { name: "Travel", icon: faPlane },
    { name: "Food", icon: faUtensils },
    { name: "Sports", icon: faFutbol },
    { name: "Entertainment", icon: faFilm },
    { name: "Fashion", icon: faTshirt },
    { name: "Music", icon: faMusic },
    { name: "Finance", icon: faMoneyBill },
  ];

  const categoryStyle = {
    lineHeight: "2.5",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "grey",
  };

  const iconStyle = {
    marginRight: "8px",
  }

  return (
    <div className="sidebar py-3">
      <h4>categories</h4>
      <br />
      {categories.map((category, index) => (
        <div key={index} style={categoryStyle}>
          <Link to={`/category/${category.name.toLowerCase()}`} style={linkStyle}>
          <FontAwesomeIcon icon={category.icon} style={iconStyle}/> {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories;
