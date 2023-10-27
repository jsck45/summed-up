import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/client"; 
import { GET_CATEGORIES } from '../utils/queries';

function Categories() {
  
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    console.error("Error fetching categories:", error);
    return <p>Error loading categories.</p>;
  }

  const categories = data.categories;

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
