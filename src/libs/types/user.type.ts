export interface UserType {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isActive?: boolean;
  labId?: number;
}
