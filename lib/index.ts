export { useAuth, AuthProvider } from "./authProvider";

export interface IUser {
  id: string | number;
  name: string;
  imageURL: string;
  provider: "github" | "google";
}
