'use client';

import Loading from "@/components/Loading";
import Redirect from "@/components/Redirect";
import { useAuth } from "@/hooks/useAuth";
import useCheckUser from "@/hooks/useCheckUser";
import useLoadData from "@/hooks/useLoadData";

export default function App() {
  const { authenticated, isLoading } = useAuth();
  const { userLoading } = useCheckUser();
  const { dataLoading } = useLoadData();

  if (isLoading || userLoading || dataLoading) {
    return <Loading />;
  }

  return authenticated ? (<Redirect path="/dashboard" />) : (<Redirect path="/login" />);
}