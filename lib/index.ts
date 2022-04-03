export { useAuth, AuthProvider } from "./authProvider";

export interface IUser {
  id: string | number;
  name: string;
  photoURL: string;
  provider: "github.com" | "google.com";
}
