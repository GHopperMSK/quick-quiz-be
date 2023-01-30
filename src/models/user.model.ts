export interface User extends BaseUser{
    id: string
}

export interface BaseUser {
    username: string
    password: string
    email: number
}