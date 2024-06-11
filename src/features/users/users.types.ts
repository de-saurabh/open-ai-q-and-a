export type CreateUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type LoginUser = {
    email: string;
    password: string;
}