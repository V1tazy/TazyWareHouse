import bcrypt from 'bcrypt'



export async function HashPassword( password : string): Promise<string> {

    const SALT_ROUND = 12

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND) 

    return hashedPassword
}


export async function passwordMatch(password: string, hashedPassword: string): Promise<boolean>{

    const IsPasswordMatch = await bcrypt.compare(password, hashedPassword)

    return IsPasswordMatch
}