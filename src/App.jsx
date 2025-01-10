import { useState, useEffect } from "react";
import AddCom from "./components/AddCom";
import BalanceCom from "./components/BalanceCom";
import Recents from "./components/RecentCom/Recents";
import { MyContext } from "./lib/MyContext";

const App = () => {
  const [currentBalance, setCurrentBalance] = useState(() => {
    return JSON.parse(localStorage.getItem("currentBalance")) || 0;
  });
  const [income, setIncome] = useState(() => {
    return JSON.parse(localStorage.getItem("income")) || 0;
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || 0;
  });
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  useEffect(() => {
    localStorage.setItem("currentBalance", JSON.stringify(currentBalance));
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [currentBalance, income, expenses, transactions]);

  const handleReset = () => {
    setCurrentBalance(0);
    setIncome(0);
    setExpenses(0);
    setTransactions([]);
    setSelectedType("");
    setSelectedCategory("");
    setDescription("");
    setAmount("");

    localStorage.clear();
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Xero Budget Tracker
            </h1>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 sm:ml-4 sm:mt-0 mt-4"
            >
              Reset All Data
            </button>
          </div>

          <MyContext.Provider
            value={{
              currentBalance,
              setCurrentBalance,
              income,
              setIncome,
              expenses,
              setExpenses,
              selectedType,
              setSelectedType,
              selectedCategory,
              setSelectedCategory,
              description,
              setDescription,
              amount,
              setAmount,
              transactions,
              setTransactions,
            }}
          >
            <BalanceCom />
            <AddCom />
            <Recents />
          </MyContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default App;
