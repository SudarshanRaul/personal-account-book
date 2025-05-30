import React, { useState, useEffect } from "react";
import { DB_CONST, addData, getAllData } from "../database/db";
const Categories = () => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setNewCategories] = useState([]);

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      await addData(DB_CONST.CATEGORIES_DB, {
        name: newCategory.trim()
      });
      setNewCategory("");
      fetchCategories();
    } else {
      alert("Please enter a valid category name.");
    }
  };

  const fetchCategories = async () => {
    const data = await getAllData(DB_CONST.CATEGORIES_DB);
    setNewCategories(data);
  };

  useEffect(()=>{
    fetchCategories();
  },[]);

  return (
    <div>
      <div className="padding-10">
        {categories &&
          categories.map(({ id, name }, index) => (
            <div key={index} className="grid-col-1fr-auto">
              {/* <div className="">{id}</div> */}
              <div className="">{name}</div>
            </div>
          ))}
      </div>
      <input
        type="text"
        value={newCategory}
        onChange={handleInputChange}
        placeholder="Enter a new category"
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default Categories;
