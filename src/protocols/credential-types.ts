export type Credential = {
    id: number;
    title: string;
    url: string;
    username: string;
    password: string;
    userId: number;
};

export type CredentialData = Omit<Credential, "id" | "userId">;