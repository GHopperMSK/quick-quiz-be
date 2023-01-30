import { BaseUser, User } from "../models/user.model"
import { UserRepository } from "../repositories/user.repository"

export class UserService {
    userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    findByUsername = (username: string): Promise<User|null> => {
        return new Promise((resolve, reject) => {
            this.userRepository.findByUsername(username)
                .then(function(user: User|null) {     
                    resolve(user)
                }).catch(function(err: Error) {
                    reject(err)
                });
        })
    }

    create = (rawUser: BaseUser): Promise<null> => {
        return new Promise((resolve, reject) => {
            this.userRepository.create(rawUser)
                .then(function() {     
                    resolve(null)
                }).catch(function(err: Error) {
                    reject(err)
                });
        })
    }
}