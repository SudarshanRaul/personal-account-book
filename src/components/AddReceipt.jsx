import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../database/db";

const updateAccountBalance = async (accountId, amount, previousBalance) => {
  try {
    const id = await db.accounts.update(parseInt(accountId), {
      currentBalance: parseFloat(previousBalance) + amount,
      previousBalance: previousBalance,
      prevBalanceDate: new Date(),
    });
    return id;
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
    const id = await db.receipt.add({
      date,
      accountId,
      amount,
      categoryId,
      image,
    });
    updateAccountBalance(accountId, amount, currentBalance);
    return id;
  } catch (error) {
    console.error("Error adding receipt", error);
    return null;
  }
};

const AddReceipt = () => {
  const [date, setDate] = useState(new Date());
  const [accountId, setAccountId] = useState(1);
  const [amount, setAmount] = useState(100);
  const [categoryId, setCategoryId] = useState(1);
  const [receipt, setReceipt] = useState(null);

  const categories = useLiveQuery(() => db.categories.toArray(), []);
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setReceipt(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveReceipt = (event) => {
    event.preventDefault();
    addReceipt({
      date: date,
      accountId: accountId,
      amount: amount,
      categoryId: categoryId,
      image: receipt,
      currentBalance: accounts.find(
        (account) => `${account.id}` === `${accountId}`,
      ).currentBalance,
    });
  };

  return (
    <div>
      <form>
        <div className="grid-col-1fr-3fr padding-10">
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
            {categories &&
              categories.map(({ id, name }, index) => (
                <option key={index} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid-col-1fr-3fr padding-10">
          <label>Image:</label>
          {receipt ? (
            <img src={receipt} alt="Receipt" />
          ) : (
            <input type="file" onChange={handleFileChange} />
          )}
        </div>
        <button type="submit" onClick={saveReceipt}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddReceipt;
