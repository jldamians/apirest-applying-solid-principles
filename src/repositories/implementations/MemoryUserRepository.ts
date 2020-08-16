import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/User";
import Mail from "nodemailer/lib/mailer";

export class MemoryUserRepository implements IUserRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}