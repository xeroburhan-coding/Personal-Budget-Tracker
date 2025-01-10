import { useContext, useEffect } from "react";
import { MyContext } from "../lib/MyContext";

const BalanceCom = () => {
  const { currentBalance, setCurrentBalance, income, expenses } =
    useContext(MyContext);

  useEffect(() => {
    setCurrentBalance(income - expenses);
  }, [income, expenses, setCurrentBalance]);

  const balanceColor = currentBalance >= 0 ? "text-green-400" : "text-red-400";

  return (
    <div>
      <div className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
          Current Balance
        </h2>
        <p
          className={`text-3xl sm:text-4xl md:text-5xl font-bold ${balanceColor}`}
        >
          ${currentBalance.toFixed(2)}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm space-y-2 sm:space-y-0">
          <span className="text-gray-400">
            Income: <span className="text-green-400">${income.toFixed(2)}</span>
          </span>
          <span className="text-gray-400">
            Expenses:{" "}
            <span className="text-red-400">${expenses.toFixed(2)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCom;
