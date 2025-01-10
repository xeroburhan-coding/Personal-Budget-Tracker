import { useContext, useState } from "react";
import { MyContext } from "../lib/MyContext";

const AddCom = () => {
  const {
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
    income,
    setIncome,
    expenses,
    setExpenses,
  } = useContext(MyContext);

  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleRadio = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDropdown = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAddButton = () => {
    if (!selectedType) {
      showNotification(
        "Please select a transaction type (Income or Expense).",
        "error"
      );
      return;
    }

    if (!description.trim()) {
      showNotification("Please provide a valid description.", "error");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      showNotification("Please enter a valid amount greater than 0.", "error");
      return;
    }

    if (!selectedCategory || selectedCategory === "Category") {
      showNotification("Please select a valid category.", "error");
      return;
    }

    const newTransaction = {
      description,
      amount: numericAmount,
      category: selectedCategory,
      type: selectedType,
    };

    setTransactions((prev) => [...prev, newTransaction]);

    if (selectedType === "income") {
      setIncome((prevIncome) => prevIncome + numericAmount);
    }
    if (selectedType === "expense") {
      setExpenses((prevExpenses) => prevExpenses + numericAmount);
    }

    showNotification("Transaction added successfully!", "success");

    setSelectedType("");
    setSelectedCategory("");
    setDescription("");
    setAmount("");
  };

  return (
    <div>
      {notification.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Add New Transaction
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="income"
                name="transaction-type"
                value="income"
                checked={selectedType === "income"}
                onChange={handleRadio}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-600 bg-gray-700"
              />
              <label htmlFor="income" className="ml-2 text-sm font-medium">
                Income
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="expense"
                name="transaction-type"
                value="expense"
                checked={selectedType === "expense"}
                onChange={handleRadio}
                className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-600 bg-gray-700"
              />
              <label htmlFor="expense" className="ml-2 text-sm font-medium">
                Expense
              </label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescription}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
          />
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={handleAmount}
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
            />
            <select
              value={selectedCategory}
              onChange={handleDropdown}
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
            >
              <option>Category</option>
              <option value="Salary">Salary</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Utilities">Utilities</option>
              <option value="Education">Education</option>
              <option value="Shopping">Shopping</option>
              <option value="Rent">Rent</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button
            onClick={handleAddButton}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg px-4 py-2 transition duration-300 font-semibold"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCom;
