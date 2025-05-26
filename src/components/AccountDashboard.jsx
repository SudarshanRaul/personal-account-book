import React, { useState } from "react";
import db from "../database/db";
import { useLiveQuery } from "dexie-react-hooks";

const addAccount = async (
  { name, currentBalance } = { name: "", currentBalance: 0 },
) => {
  try {
    const id = await db.accounts.add({
      name,
      currentBalance,
    });
    return id;
  } catch (error) {
    console.error("Error adding account", error);
    return null;
  }
};

const updateAccountBalance = async (key, newValue) => {
  try {
    await db.accounts.put(key, newValue);
    return true;
  } catch (error) {
    console.error("Error updating account balance", error);
    return null;
  }
};

const AccountDashboard = () => {
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);
  const [editedBalance, setEditedBalance] = useState();
  const [editModeIndex, setEditModeIndex] = useState();

  const getColor = (change) => {
    return change < 0 ? "red" : "green";
  };

  const [newAccount, setNewAccount] = React.useState({
    name: "",
    currentBalance: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    addAccount(newAccount);
    setNewAccount({ name: "", balance: 0 });
  };

  const getBalanceChange = (account) => {
    if (account.previousBalance) {
      return account.currentBalance - account.previousBalance;
    }
    return 0;
  };

  const changeAccountBalance = (index, value) => {
    updateAccountBalance(index, {
      ...accounts[index],
      previousBalance: accounts[index].currentBalance,
      currentBalance: `${value}`,
    });
  };

  const enabledEditing = (index) => {
    setEditedBalance(accounts[index].currentBalance);
    setEditModeIndex(index);
  };

  const saveEditedBalance = (index) => {
    changeAccountBalance(index, editedBalance);
    setEditedBalance(null);
    setEditModeIndex(null);
  };

  return (
    <div>
      <div className="grid-col-1fr-1fr padding-10 text-bold border-bottom">
        <div>Account</div>
        <div>
          Current Balance : &nbsp;
          {accounts &&
            accounts.reduce(
              (total, account) => total + parseInt(account.currentBalance || 0),
              0,
            )}
        </div>
      </div>
      {accounts &&
        accounts.map((account, index) => (
          <div key={index} className="grid-col-1fr-1fr padding-10">
            <div>{account.name}</div>
            <div>
              {editModeIndex === index ? (
                <>
                  <input
                    type="number"
                    step="0.01"
                    value={editedBalance}
                    onChange={(e) => setEditedBalance(e.target.value)}
                  />
                  <button onClick={() => saveEditedBalance(index)} className="link-button">
                    <span className="text-bold">✔</span>
                  </button>
                </>
              ) : (
              <>
                <button onClick={() => enabledEditing(index)} className="link-button">
                  <span className="text-bold">✎</span>
                </button>
                &nbsp;
                {account.currentBalance}
                &nbsp;
                <span
                  className={`amount-change text-${getColor(getBalanceChange(account))}`}
                >
                  {getBalanceChange(account)}
                </span>
              </>
              )}
            </div>
          </div>
        ))}
      <form onSubmit={handleAddAccount}>
        <input
          type="text"
          placeholder="Account Name"
          name="name"
          value={newAccount.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Current Balance"
          name="currentBalance"
          step="0.01"
          value={newAccount.currentBalance}
          onChange={handleInputChange}
        />
        <button type="submit">Add Account</button>
      </form>
    </div>
  );
};

export default AccountDashboard;
