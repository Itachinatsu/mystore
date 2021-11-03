export interface AuthenticateUserRes {
    user: {
        id: number
        firstname: string
        lastname: string
        password: string
    }
    token: string
}
