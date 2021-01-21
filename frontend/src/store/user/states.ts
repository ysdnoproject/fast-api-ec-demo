import { User } from "@/models/User";

export interface UserState {
  token: string | null;
  user: User | null;
}

const state = (): UserState => ({
  token: null,
  user: null
});

export default state;
