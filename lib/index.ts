export { useAuth, AuthProvider } from "./authContext";
export { useChat, ChatProvider } from "./chatContext";

export interface IUser {
  id: string | number;
  name: string;
  photoURL: string;
  provider: "github.com" | "google.com";
}
