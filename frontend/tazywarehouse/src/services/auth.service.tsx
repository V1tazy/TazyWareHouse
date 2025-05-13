import { users } from '@/@libs/data/user'
import type { User } from 'next-auth'
import { HashPassword, passwordMatch } from '@/@libs/middleware/hashPassword'


export async function registerUser(email: string, password: string): Promise<Omit<User, 'password'>>{

    const existingUser = users.find(user => user.email === email)
    
    if(existingUser){
        throw new Error("User already exist")
    }

    const hashedPassword = await HashPassword(password)

    const newUser = {
        id: String(users.length + 1),
        email,
        password: hashedPassword
    }

    console.log(hashedPassword)

    users.push(newUser)

    const {password: _, ...userWithoutPass} = newUser

    return userWithoutPass
}

export async function loginUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {


    const user = users.find(user => user.email === email)

    if(!user) return null

    const hashedMatch = await passwordMatch(password, user.password)
    if(!passwordMatch) return null

    const { password: _, ...userWithoutPass} = user


    return userWithoutPass
}