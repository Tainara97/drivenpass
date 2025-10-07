export type User = {
    userId: number;
    name: string;
    email: string;
    password: string;
}

export type UserData = Omit<User, "id">;

