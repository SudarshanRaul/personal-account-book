import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

const addTransactions = async (transactionData) => {
  try {
    // const ids = await db.transactions.bulkAdd(transactionData);
    // return ids;
  } catch (error) {
    console.error("Error adding transactions", error);
    return null;
  }
};
const AddTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const categories = [];
  const accounts = [];
  const transactionsData = [];

  const createEmptyRecords = (num) => {
    const emptyRecords = Array(num)
      .fill()
      .map(() => ({
        date: "",
        amount: "",
        category: "",
        type: "",
        account: "",
      }));
    setTransactions([...transactions, ...emptyRecords]);
  };

  const handleAddTransaction = () => {
    addTransactions(transactions);
  };

  const updateTransaction = (index, field, value) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index][field] = value;
    if (field === "amount") {
      value < 0
        ? (updatedTransactions[index]["type"] = "Expense")
        : (updatedTransactions[index]["type"] = "Income");
    }
    setTransactions(updatedTransactions);
  };

  useEffect(() => {
    if (transactionsData && transactionsData.length > 0) {
      setTransactions(transactionsData);
    }
  }, [transactionsData]);

  useEffect(() => {
    createEmptyRecords(10);
  }, []);

  return (
    <div className="txn-container">
      <div className="txn-header text-bold">
        <div>Txn Date</div>
        <div>Amount</div>
        <div>Category</div>
        <div>Account</div>
      </div>
      {transactions.map((txn, index) => (
        <div key={index} className="txn-row">
          <input
            type="date"
            value={txn.date}
            onChange={(e) => updateTransaction(index, "date", e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            value={txn.amount}
            onChange={(e) => updateTransaction(index, "amount", e.target.value)}
          />
          <select
            value={txn.category}
            onChange={(e) =>
              updateTransaction(index, "category", e.target.value)
            }
          >
            {categories &&
              categories.map(({ id, name }, index) => (
                <option key={index} value={id}>
                  {name}
                </option>
              ))}
          </select>
          <select
            value={txn.accountId}
            onChange={(e) =>
              updateTransaction(index, "accountId", e.target.value)
            }
          >
            {accounts &&
              accounts.map(({ id, name }, index) => (
                <option key={index} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
      ))}
      <div className="txn-footer">
        <button onClick={handleAddTransaction}>Add Transaction</button>
        <button onClick={(e) => createEmptyRecords(10)}>+10 rows</button>
      </div>
    </div>
  );
};

export default AddTransactions;
