import { User } from "../models/User"







export function GetUser(){

    return false
}

export function RegisterUser(user: User){
    return false
}

export function AuthUser(user: User){
    
    return false
}

export const users = [
    {
        id: "1",
        email: "vitazyq@gmail.com",
        name: "Vitazy",
        password: "12345",
        role: "admin"
    },
    {
        id: "2",
        email: "tazy@gmail.com",
        name: "tazyt",
        password: "1234567",
        role: "guest"
    }
]