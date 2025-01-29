'use client';

import Loading from "@/components/Loading";
import { useCheckUser, useRedirect } from "@/hooks";
import { useUserStore, useLoadingStore } from "@/lib/store";

export default function App() {
  const { isLoading } = useLoadingStore();
  const { user } = useUserStore();

  useCheckUser();

  useRedirect("/login", user === undefined && !isLoading, [user]);
  useRedirect("/dashboard", user !== undefined && !isLoading, [user]);

  return (
    <main className="
      bg-zinc-100 dark:bg-zinc-950
      w-screen h-screen
    ">
      {
        isLoading ? <Loading withLogo /> : <></>
      }
    </main>
  );
}