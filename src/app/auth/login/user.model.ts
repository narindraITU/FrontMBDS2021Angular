import {Roles} from "./Role.enum";

export interface UserModel{
  nom: string;
  password: string;
  isAdmin: boolean;
}
