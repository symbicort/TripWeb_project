import { randomBytes } from "crypto";

export function randomKey(): string{
    return randomBytes(25).toString('hex');
}
