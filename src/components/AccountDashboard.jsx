import React, { useState, useEffect } from "react";
import { DB_CONST, getAllData, addData, updateData } from "../database/db";

const AccountDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [editedBalance, setEditedBalance] = useState();
  const [editModeIndex, setEditModeIndex] = useState();

  const getColor = (change) => {
    return change < 0 ? "red" : "green";
  };

  const [newAccount, setNewAccount] = React.useState({
    name: "",
    startingBalance: 0,
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
    setNewAccount({ name: "", balance: 0 });
  };

  const getBalanceChange = (account) => {
    if (account.history && Object.keys(account.history).length > 0) {
      const historyKeys = Object.keys(account.history).sort((a, b) => b - a);
      return account.history[historyKeys[0]] - (account.history[historyKeys[1]] || account.startingBalance); 
    }
    return 0;
  };

  const changeAccountBalance = (index, value) => {
    const time = new Date().getTime();
    updateData(DB_CONST.ACCOUNTS_DB, accounts[index].id, {
      ...accounts[index],
      history: {
        ...accounts[index].history,
        [time]: value
      },
    });
  };

  const saveEditedBalance = (index) => {
    changeAccountBalance(index, editedBalance);
    setEditedBalance(null);
    setEditModeIndex(null);
  };

  const addAccount = async () => {
    if (newAccount.name && newAccount.startingBalance) {
      await addData(DB_CONST.ACCOUNTS_DB, {
        name: newAccount.name,
        startingBalance: newAccount.startingBalance,
      });
      setNewAccount({ name: "", startingBalance: 0 });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const editRow = (index, account) => {
    const currentBalance = getCurrentBalance(account);
    setEditModeIndex(index);
    setEditedBalance(currentBalance);
  };

  const getCurrentBalance = (account) => {
    if(account.history && Object.keys(account.history).length > 0) {
      const historyKeys = Object.keys(account.history).sort((a, b) => b - a);
      return account.history[historyKeys[0]];
    }
    return account.startingBalance
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await getAllData(DB_CONST.ACCOUNTS_DB);
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      <div className="grid-col-1fr-1fr padding-10 text-bold border-bottom">
        <div>Account</div>
        <div>
          Current Balance : &nbsp;
          {accounts &&
            accounts.reduce(
              (total, account) => total + parseInt(getCurrentBalance(account) || 0),
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
                <button onClick={() => editRow(index, account)} className="link-button">
                  <span className="text-bold">✎</span>
                </button>
                &nbsp;
                {getCurrentBalance(account)}
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
          name="startingBalance"
          step="0.01"
          value={newAccount.startingBalance}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={addAccount}>Add Account</button>
      </form>
    </div>
  );
};

export default AccountDashboard;
