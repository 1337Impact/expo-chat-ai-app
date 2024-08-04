import { Stack } from "expo-router";
import React, { useEffect } from "react";
import ProfileDropdown from "../components/ui/ProfileDropdown";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { sessionContext } from "../hooks/SessionContext";

export default function Layout() {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      session ? router.push("/") : router.push("/signin");
    });

    const authListner = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      session ? router.push("/") : router.push("/signin");
    });
    return () => {
      authListner.data.subscription.unsubscribe();
    }
  }, []);


  return (
    <sessionContext.Provider value={session}>
      <Stack
        screenOptions={{
          headerRight: () => <ProfileDropdown />,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Home",
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            headerTitle: "Sign In",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerTitle: "Sign Up",
          }}
        />
      </Stack>
    </sessionContext.Provider>
  );
}
