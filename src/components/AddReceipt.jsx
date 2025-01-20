import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../database/db";
import Tesseract from "tesseract.js";
import ReceiptList from "./ReceiptList";

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

const receiptItem = function(rawText) {
  this.product = null;
  this.amount = null;
  this.rawText = rawText;
};

receiptItem.prototype.isItem = function(product) {

};

receiptItem.prototype.getData = function() {
  const regex = /\b\d+\.\d{2}\b/;
  const match = this.rawText.match(regex);
  if (match) {
    const amount = parseFloat(match[0]);
    console.log(amount);
  }
};

const textToData = (text) => {
  text = `
2X Member 111826278335
E 673919 FF BS BREAST 23.99 E
E 33561 KS DICED TOM 6.49 E
E 967596 JACKORGSALSA 2.9TE
384.29
EH 878137 18CT EGGS 12.87 E
E 77053 GRAPE TOMATO 6.29 E
404609 ECO HALF PAN 6.49 A
E 55992 GRND TURKEY 18.47 E
£ 263423 CHPD ONION 3.59 E
[SME 22101 MONT JACK 2% 4.45 E
`;
  const textArray = text.split("\n");
  console.log(textArray);
  const output = textArray.map((line) => new receiptItem(line));
  console.log(output);
};

const convertToText = async (image) => {
  const worker = await Tesseract.createWorker('eng');
  const { data: { text } } = await worker.recognize(image);
  console.log(text);
  await worker.terminate();
  textToData(text);
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

  const categories = useLiveQuery(() => db.categories.toArray(), []);
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);

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

  return (
    <div>
      <form className="add-receipt-form">
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
        <button onClick={(e) => {
          e.preventDefault();
          convertToText(receipt)
        }}>
          Convert
        </button>
      </form>
      <ReceiptList />
    </div>
  );
};

export default AddReceipt;
