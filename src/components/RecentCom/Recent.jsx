import { useContext } from "react";
import { MyContext } from "../../lib/MyContext";
import { TrashIcon } from "@heroicons/react/24/outline";


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
            className="flex items-center justify-center w-8 h-8 bg-gray-800 text-red-400 hover:bg-gray-700 hover:text-red-500 rounded-full transition duration-300"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recent;
