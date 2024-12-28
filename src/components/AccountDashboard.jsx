import React from "react";
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
const AccountDashboard = () => {
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);

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
              {account.currentBalance}
              &nbsp;
              <span
                className={`amount-change text-${getColor(getBalanceChange(account))}`}
              >
                {getBalanceChange(account)}
              </span>
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
