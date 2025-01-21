'use client';

import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useUserContext } from "@/context/UserContext";
import useRedirect from "@/hooks/useRedirect";

export default function App() {
  const { user } = useUserContext();
  useRedirect();
  
  return (
    <main className="
      bg-zinc-100 dark:bg-zinc-950
      w-screen h-screen
    ">
      {
        user ? <Header /> : <Spinner />
      }
    </main>
  );
}