'use client';

import { DependencyList, useEffect } from "react";
import { useRouter } from "next/navigation";

const useRedirect = (
  route: string,
  condition: boolean,
  deps?: DependencyList
) => {
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.push(route);
    }
  }, [deps]);
};

export default useRedirect;