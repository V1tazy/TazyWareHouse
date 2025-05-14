import type { User } from 'next-auth'


const users = [
    {
        id: "1",
        email: "vitazyq@gmail.com",
        name: "vitazy",
        password: "12345",
        role: "admin"
    }
]


export async function registerUser(email: string, password: string): Promise<Omit<User, 'password'>>{

    const existingUser = users.find(user => user.email === email)
    
    if(existingUser){
        throw new Error("User already exist")
    }

    const newUser = {
        id: String(users.length + 1),
        email,
        password
    }

    users.push(newUser)

    const {password: _, ...userWithoutPass} = newUser

    return userWithoutPass
}

export async function loginUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {


    const user = users.find(user => user.email === email)

    if(!user) return null


    if(user.password !== password) return null

    const { password: _, ...userWithoutPass} = user


    return userWithoutPass
}