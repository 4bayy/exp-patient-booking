
import { cookies } from "next/headers";

export async function getAccessToken() {

  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;

}

export async function isLoggedIn() {

  const token = await getAccessToken();
  if (!token) {
    return false;
  }

  // Token exists.
  // Actual JWT validation should happen on the server/API.
  return true;
}