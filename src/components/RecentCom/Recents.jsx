import { useContext } from "react";
import Recent from "./Recent";
import { MyContext } from "../../lib/MyContext";

const Recents = () => {
  const { transactions } = useContext(MyContext);

  return (
    <div>
      <div className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <Recent
              key={index}
              amount={transaction.amount}
              category={transaction.category}
              description={transaction.description}
              type={transaction.type}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recents;
