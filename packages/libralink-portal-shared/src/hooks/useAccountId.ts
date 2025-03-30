import { useState, useEffect } from "react";

const ACCOUNT_ID_KEY = "accountId";

const useAccountId = () => {
  const [accountId, setAccountId] = useState<string>(() => {
    const storedCurrency = localStorage.getItem(ACCOUNT_ID_KEY);
    return storedCurrency || '';
  });

  useEffect(() => {
    localStorage.setItem(ACCOUNT_ID_KEY, accountId);
  }, [accountId]);

  const changeAccountId = (newAccountId: string) => {
    setAccountId(newAccountId);
  };

  return [accountId, changeAccountId];
};

export default useAccountId;
