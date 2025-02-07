import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Banknote, TrendingDown, TrendingUp, CreditCard } from "lucide-react";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="w-ful h-auto mt-8">
      <Card className="w-full  p-4 rounded-xl shadow-lg bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Banknote className="w-6 h-6 text-green-600" /> Recent Transactions
          </CardTitle>
        </CardHeader>

        <CardContent>
          {transactions.length > 0 ? (
            <ScrollArea className="">
              <ul className="space-y-4">
                {transactions.map((txn) => (
                  <li
                    key={txn.transaction_id}
                    className="flex justify-between items-center border-b pb-2 last:border-none"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon for expense or income */}
                      {txn.amount > 0 ? (
                        <TrendingDown className="w-6 h-6 text-red-500" />
                      ) : (
                        <TrendingUp className="w-6 h-6 text-green-500" />
                      )}

                      <div>
                        <p className="text-sm font-medium">
                          {txn.merchant_name || txn.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {txn.category?.join(", ")}
                        </p>
                        <p className="text-xs text-gray-400vt">
                          {new Date(txn.date).toDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Transaction Amount & Payment Type */}
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          txn.amount > 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        ${txn.amount.toFixed(2)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {txn.payment_channel === "online"
                          ? "Paid via Online Banking"
                          : "Processed Securely"}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-center text-gray-500">
              No recent transactions found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTransactions;
