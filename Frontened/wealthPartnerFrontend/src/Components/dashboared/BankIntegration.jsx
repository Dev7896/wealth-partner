import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, PlusCircle } from "lucide-react";

const BankIntegration = ({accessToken ,setAccessToken}) => {
  const [linkToken, setLinkToken] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    axios.post("http://localhost:8080/api/plaid/create-link-token").then((res) => {
      setLinkToken(res.data.link_token);
    });
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (publicToken) => {
      axios.post("http://localhost:8080/api/plaid/exchange-token", { public_token: publicToken })
        .then((res) => {
          setAccessToken(res.data.access_token);
        });
    },
  });

  return (
    <Card className="w-full max-w-md p-4 rounded-xl shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Banknote className="text-green-500" />
          <span>Bank Account</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {accessToken ? (
          <p className="text-green-600">Bank connected successfully!</p>
        ) : linkToken ? (
          <button
            onClick={open}
            disabled={!ready}
            className=" text-white px-4 py-2 rounded flex items-center space-x-2"
          >
            <PlusCircle size={18} />
            <span>Connect Bank</span>
          </button>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BankIntegration;
