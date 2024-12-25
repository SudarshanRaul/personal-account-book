import Dexie from "dexie";

const db = new Dexie("accountBookDB");
db.version(1).stores({
  accounts: "++id, name, currentBalance, previousBalance, prevBalanceDate",
  categories: "++id, name, groupId",
  transactions: "++id, accountId, amount, date, categoryId, type",
  receipt: "++id, accountId, date, amount, categoryId, image",
});

export default db;
