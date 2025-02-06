import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const RecentTransactions = ({ accessToken, transactions, setTransactions }) => {
  //   const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (accessToken) {
      axios
        .post("http://localhost:8080/api/plaid/transactions", { accessToken })
        .then((res) => {
          setTransactions(res.data.transactions);
        })
        .catch((err) => console.error("Error fetching transactions:", err));
    }
    console.log(transactions);
  }, [accessToken]);


  return (
    <Card className="w-full max-w-lg p-4 rounded-xl shadow-lg">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <ul className="space-y-2">
            {transactions.map((txn) => (
              <li key={txn.transaction_id} className="border-b pb-2">
                <span className="font-bold">{txn.name}</span> - ${txn.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent transactions found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
