import { API_URL } from "./env";

export async function getUser(userId: string) {
  const response = await fetch(API_URL + "/users/" + userId);
  const data = await response.json();

  return data;
}