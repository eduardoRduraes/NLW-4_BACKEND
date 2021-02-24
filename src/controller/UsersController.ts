import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UserRepository';


export default class UserController {
    async index(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find({ select: ['name', 'email'] });

        return response.json(users);
    }

    async show(request: Request, response: Response) {
        const { name } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ name });
        console.log(user);

        if (!user) {
            return response.status(400).json({ message: 'não existe usuário com esse nome!' });
        }

        return response.json(user);
    }

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const user = usersRepository.create({ name, email });

        const userAlreadyExists = await usersRepository.findOne({ name });

        if (userAlreadyExists) {
            return response.status(400).json({ message: "Usuario já existe!!!" });
        }

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

    async update(request: Request, response: Response) { }

    async delete(request: Request, response: Response) { }
}