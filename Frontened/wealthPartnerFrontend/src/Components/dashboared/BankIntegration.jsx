import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

const BankIntegration = ({
  accessToken,
  setAccessToken,
  updateTransactions,
}) => {
  const [linkToken, setLinkToken] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/plaid/create-link-token")
      .then((res) => {
        setLinkToken(res.data.link_token);
      });
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (publicToken) => {
      axios
        .post("http://localhost:8080/api/plaid/exchange-token", {
          public_token: publicToken,
        })
        .then((res) => {
          setAccessToken(res.data.access_token);
          fetchTransactions(res.data.access_token);
        });
    },
  });

  const fetchTransactions = (token) => {
    axios
      .post("http://localhost:8080/api/plaid/transactions", {
        accessToken: token,
      })
      .then((res) => {
        // console.log(res.data.transactions) ;
        updateTransactions(res.data.transactions);

        // Show success message & hide button
        Swal.fire({
          title: "Success!",
          text: "Transactions fetched successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setIsConnected(true);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  };

  return (
    <div className="flex justify-center ">
      {!isConnected && (
        <Card className="w-full max-w-md p-4 rounded-xl shadow-lg bg-white dark:bg-gray-900 ">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
              <Banknote className="text-green-500 w-6 h-6" />
              <span>Bank Account</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex justify-center items-center h-32">
            {accessToken && isConnected ? (
              <p className="text-green-600 font-medium">
                Bank connected successfully!
              </p>
            ) : linkToken ? (
              <button
                onClick={open}
                disabled={!ready}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md transition-all"
              >
                <PlusCircle size={20} />
                <span>Connect Bank</span>
              </button>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BankIntegration;
