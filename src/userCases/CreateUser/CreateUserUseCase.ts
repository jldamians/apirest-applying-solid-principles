import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../entities/User";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
    private userRepository: IUserRepository;
    private mailProvider: IMailProvider;

    constructor(userRepository: IUserRepository, mailProvider: IMailProvider) {
        this.userRepository = userRepository;    
        this.mailProvider = mailProvider;
    }

    async execute(data: ICreateUserRequestDTO): Promise<void> {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        const user = new User(data);

        await this.userRepository.save(user);

        await this.mailProvider.sendEmail({
            to: {
                email: 'jldamians@outlook.com',
                name: 'Jose Damian',
            },
            from: {
                email: 'marketing@ripley.com',
                name: 'Marketing Ripley'
            },
            subject: 'Sea bienvenido a la plataforma',
            body: '<p>Usted ya puede realizar compras en nuestra plataforma</p>',
        });
    }
}
