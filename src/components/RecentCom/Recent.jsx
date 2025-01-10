import { useContext } from "react";
import { MyContext } from "../../lib/MyContext";

const Recent = ({ amount, category, description, type, index }) => {
  const {
    transactions,
    setTransactions,
    income,
    setIncome,
    expenses,
    setExpenses,
  } = useContext(MyContext);

  const handleDelete = () => {
    const updatedTransactions = transactions.filter((_, idx) => idx !== index);
    setTransactions(updatedTransactions);

    if (type === "income") {
      setIncome((prevIncome) => prevIncome - amount);
    } else if (type === "expense") {
      setExpenses((prevExpenses) => prevExpenses - amount);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-700 rounded-lg p-4">
        <div>
          <p className="font-medium">{description}</p>
          <p className="text-sm text-gray-400">{category}</p>
        </div>
        <div className="flex items-center space-x-4">
          <p
            className={`font-bold ${
              type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {type === "income" ? "+" : "-"}${Math.abs(amount).toFixed(2)}
          </p>
          <button
            onClick={handleDelete}
            className="text-sm text-red-400 hover:text-red-500 font-semibold transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recent;
