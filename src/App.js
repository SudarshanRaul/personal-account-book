import "./App.css";
import AccountDashboard from "./components/AccountDashboard";
import Transactions from "./components/Transactions";
import Summary from "./components/Summary";
import AddReceipt from "./components/AddReceipt";
import Categories from "./components/Categories";
// import Header from './components/Header';
import Tab from "./components/Tab";
import AddTransactions from "./components/AddTransactions";

const TabContents = [
  { name: "Account Dashboard", component: <AccountDashboard /> },
  { name: "Transactions", component: <Transactions /> },
  { name: "Summary", component: <Summary /> },
  { name: "Add Receipt", component: <AddReceipt /> },
  { name: "Categories", component: <Categories /> },
  { name: "Add Transactions", component: <AddTransactions /> },
];

function App() {
  return (
    <div className="App">
      <Tab contents={TabContents} />
    </div>
  );
}

export default App;
