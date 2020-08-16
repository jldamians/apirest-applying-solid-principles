import { uuid } from "uuidv4";

export class User {
    public readonly id?: string;
    public name?: string;
    public email?: string;
    public password?: string;

    constructor(porps: Omit<User, 'id'>, id?: string) {
        Object.assign(this, porps);

        if (!id) {
            this.id = uuid();
        }
    }

}
