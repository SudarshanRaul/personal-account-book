import React, { useState, useRef } from "react";
import ReceiptList from "./ReceiptList";
import {imageToText} from "../utils/imageToData";
import { formatDateToYYYYMMDD } from "../utils/utils";

const updateAccountBalance = async (accountId, amount, previousBalance) => {
  try {
    // const id = await db.accounts.update(parseInt(accountId), {
    //   currentBalance: parseFloat(previousBalance) + amount,
    //   previousBalance: previousBalance,
    //   prevBalanceDate: new Date(),
    // });
    // return id;
  } catch (error) {
    console.error("Error updating account balance", error);
    return null;
  }
};

const addReceipt = async ({
  date,
  accountId,
  amount,
  categoryId,
  image,
  currentBalance,
}) => {
  try {
    amount = -1 * parseFloat(amount);
    // const id = await db.receipt.add({
    //   date,
    //   accountId,
    //   amount,
    //   categoryId,
    //   image,
    // });
    updateAccountBalance(accountId, amount, currentBalance);
    // return id;
  } catch (error) {
    console.error("Error adding receipt", error);
    return null;
  }
};

const formatDate = (date) => {
  // Format date as YYYY-MM-DD
  return date.toISOString().split("T")[0];
};

const AddReceipt = () => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [accountId, setAccountId] = useState();
  const [amount, setAmount] = useState();
  const [categoryId, setCategoryId] = useState();
  const [receipt, setReceipt] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [];
  const accounts = [];

  const resetForm = () => {
    setDate(formatDate(new Date()));
    setAccountId();
    setAmount();
    setCategoryId();
    setReceipt(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setReceipt(base64String);
      getDataFromImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
      resetForm();
    }
  };

  const saveReceipt = async (event) => {
    event.preventDefault();
    const result = await addReceipt({
      date: date,
      accountId: accountId,
      amount: amount,
      categoryId: categoryId,
      image: receipt
    });
    if (result) {
      alert(`Receipt ${result} added successfully`);
    }
  };

  const getDataFromImage = async (image) => {
    const data = await imageToText(image);
    setAmount(data.total);
    setDate(formatDateToYYYYMMDD(data.date));
  };

  const handleImageClick = () => {
    /**TODO: fix image change */
    // fileInputRef.current.click();
  };

  return (
    <div>
      <form className="add-receipt-form">
        <div className="grid-col-1fr-3fr padding-10">
          <label>Image:</label>
          {receipt ? (
              <img src={receipt} alt="Receipt" onClick={handleImageClick} />
          ) : (
            <input type="file" onChange={handleFileChange} ref={fileInputRef} />
          )}
          
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="grid-col-1fr-3fr padding-10">
          <label>Account:</label>
          <select
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          >
            <option key="-1" value="">
              Select Account
            </option>
            {accounts &&
              accounts.map(({ id, name }, index) => (
                <option key={index} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid-col-1fr-3fr padding-10">
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid-col-1fr-3fr padding-10">
          <label>Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option key="-1" value="">
              Select Category
            </option>
            {categories &&
              categories.map(({ id, name }, index) => (
                <option key={index} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" onClick={saveReceipt}>
          Save
        </button>
      </form>
      <ReceiptList />
    </div>
  );
};

export default AddReceipt;
