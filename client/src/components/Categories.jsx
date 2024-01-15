import React from "react";
import { Link } from "react-router-dom";
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
    color: "#4b4848",
  };

  return (
    <div className="sidebar py-3">
      <h4>categories</h4>
      <br />
      {categories.map((category, index) => (
  <div key={index} style={categoryStyle}>
    {category.name && (
      <Link to={`/category/${category.name.toLowerCase()}`} style={linkStyle}>
        {category.name}
      </Link>
    )}
  </div>
))}

    </div>
  );
}

export default Categories;
