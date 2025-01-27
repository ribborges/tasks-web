'use client';

import { useEffect } from "react";

import Dashboard from "@/components/Dashboard";
import Spinner from "@/components/Spinner";
import useRedirect from "@/hooks/useRedirect";
import useUserStore from "@/lib/store/user.store";

export default function App() {
  const { user, status } = useUserStore();

  useEffect(() => {
    if (user === undefined) {
      status();
    }
  }, []);

  useRedirect("/login", !user, [user]);

  return (
    <main className="
      bg-zinc-100 dark:bg-zinc-950
      w-screen h-screen
    ">
      {
        user ? <Dashboard /> : <Spinner />
      }
    </main>
  );
}