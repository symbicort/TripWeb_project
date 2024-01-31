import * as bcrypt from 'bcrypt';

export function hashPW(password: string): string {
    const saltRounds: number = Number(process.env.PASSWORD_SALT);
    const salt: string = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export function comparePW(password: string, hashedPW: string): boolean {
    console.log(hashedPW);
    return bcrypt.compareSync(password, hashedPW);
}
