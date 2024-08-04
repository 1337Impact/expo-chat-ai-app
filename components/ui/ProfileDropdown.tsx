import { router } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import * as DropdownMenu from 'zeego/dropdown-menu'
import { supabase } from "../../lib/supabase";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledButton = styled(Pressable);

const logout = () => {
  supabase.auth.signOut();
};

export default function ProfileDropdown() {
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
      <DropdownMenu.Content loop side align alignOffset avoidCollisions collisionPadding sideOffset>
      <DropdownMenu.Label >
        My label
      </DropdownMenu.Label>
        <DropdownMenu.Item destructive onSelect={logout} key="42">
          <DropdownMenu.ItemTitle>Sign Out</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
