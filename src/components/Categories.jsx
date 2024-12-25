import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../database/db";

const addCategories = async (
  { name, groupId } = { name: "", groupId: "-1" },
) => {
  try {
    const id = await db.categories.add({
      name,
      groupId,
    });
    return id;
  } catch (error) {
    console.error("Error adding categories", error);
    return null;
  }
};

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");
  // const [newGroupId, setNewGroupId] = useState('-1');
  const categories = useLiveQuery(() => db.categories.toArray(), []);

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      addCategories({ name: newCategory });
      setNewCategory("");
    }
  };

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
