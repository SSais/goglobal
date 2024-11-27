import { Stack } from "expo-router";
import { Link } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Link href="/auth">About</Link>
    </Stack>
  );
}
