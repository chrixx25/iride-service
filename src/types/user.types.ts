type Table<Result> = {
  results: Result[];
  page: number;
  pages: number;
  size: number;
  total: number;
};

export type UsersModel = {
  id: string;
  Username: string;
  Password: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  MobileNo: string;
  IsAdmin: boolean;
}[];

export type UserResBody = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNo: string;
  isAdmin: boolean;
};

export type UsersResBody = Table<UserResBody>;

export type Decoded = {
  result: Omit<UserResBody, "password">;
  iat: number;
  exp: number;
};

export type UserParams = {
  id?: number;
  page?: number;
  size?: number;
  paging: number;
};

export type SuccessRes = {
  message: string;
};

export type CreateUserReqBody = {
  userName: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  password: string;
  admin?: boolean;
};

export type UpdateUserReqBody = {
  userName: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
};
