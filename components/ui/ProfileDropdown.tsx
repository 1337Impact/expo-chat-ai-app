import { router } from "expo-router";
import { styled } from "nativewind";
import React, { useContext } from "react";
import { Image, Pressable, View } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";
import { supabase } from "../../lib/supabase";
import { sessionContext } from "../../hooks/SessionContext";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledButton = styled(Pressable);

const logout = () => {
  supabase.auth.signOut();
};

export default function ProfileDropdown() {
  const session = useContext(sessionContext);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <StyledButton>
          <StyledImage
            className="w-10 h-10 rounded-full"
            source={require("../../assets/profile.jpg")}
          />
        </StyledButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        loop
        side
        align
        alignOffset
        avoidCollisions
        collisionPadding
        sideOffset
      >
        <DropdownMenu.Label>My label</DropdownMenu.Label>
        {session?.user ? (
          <DropdownMenu.Item destructive onSelect={logout} key="42">
            <DropdownMenu.ItemTitle>Sign Out</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        ) : (
          <DropdownMenu.Item onSelect={() => router.push("/signin")} key="42">
            <DropdownMenu.ItemTitle style={{ color: "green" }}>
              Sign In
            </DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
