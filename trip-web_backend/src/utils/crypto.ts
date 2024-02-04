import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export function hashPW(password: string): string {
    console.log(process.env.PASSWORD_SALT, password)
    const saltRounds: number = Number(process.env.PASSWORD_SALT);
    const salt = genSaltSync(saltRounds);
    console.log(salt)
    return hashSync(password, salt);
}

export function comparePW(password: string, hashedPW: string): boolean {
    return compareSync(password, hashedPW);
}

