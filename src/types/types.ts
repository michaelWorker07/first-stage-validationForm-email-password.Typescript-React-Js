export interface UserData {
    email: string;
    password: string;
}

export interface CurrentUser {
    email: string;
    isLoggedIn: boolean;
}