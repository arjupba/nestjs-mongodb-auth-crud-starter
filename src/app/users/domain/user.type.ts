export enum RoleEnum {
  Manager = 'mngr',
  User = 'user',
  Admin = 'admin',
}

export type User = {
  id: string;
  email: string;
  roles: RoleEnum[];
  isEnabled: boolean;
  avatar?: string;
  firstName?: string;
  lastName?: string;
};
