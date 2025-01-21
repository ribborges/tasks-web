"use client";

import { useEffect } from "react";

import { useUserContext } from "@/context/UserContext";

const useRedirect = () => {
  const { checkAndGetUser } = useUserContext();

  useEffect(() => {
    const redirectUser = async () => {
      await checkAndGetUser();
    };

    redirectUser();
  }, []);
};

export default useRedirect;