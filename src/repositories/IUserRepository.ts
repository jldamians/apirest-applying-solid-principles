import { User } from "../entities/User";

export interface IUserRepository {
    findByEmail(emial: string): Promise<User | undefined>;
    save(user: User): Promise<void>
}  