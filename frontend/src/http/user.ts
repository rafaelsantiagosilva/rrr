import { User } from "@/interfaces/user";
import { API_URL } from "./env";

export async function getUser(userId: string): Promise<User> {
  const response = await fetch(API_URL + "/users/" + userId);
  const data = await response.json();

  return data;
}

export async function updateProfileImg(userId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/users/upload/profile/${userId}`, {
    method: 'POST',
    body: formData
  });

  return response;
}