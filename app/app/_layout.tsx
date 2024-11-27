import { Stack } from "expo-router";
import { Link } from "expo-router";
import login from "./login";

export default function RootLayout() {
  return (
    <Stack>
      <Link href="/login">About</Link>
    </Stack>
  );
}
