import { database } from '../common/database';
import { User, BaseUser } from '../models/user.model'

export class UserRepository {
    findByUsername = (username: string): Promise<User|null> => {
        return new Promise((resolve, reject) => {
            database.query("SELECT * FROM public.user WHERE username = $1", [username], (err: Error | null, res: any) => {
                if (err) {
                    reject(err)
                    return
                }

                if (res.rowCount === 0) {
                    resolve(null)
                    return
                }
    
                const row = res.rows[0];
                const user: User = {
                    id: row.id,
                    username: row.username,
                    password: row.password,
                    email: row.email
                }
                resolve(user);
            })
        })
    }

    create = (rawUser: BaseUser): Promise<null> => {
        return new Promise((resolve, reject) => {
            database.query('INSERT INTO "user"(username, password, email) VALUES($1, $2, $3)', [rawUser.username, rawUser.password, rawUser.email], (err: Error | null, res: any) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(null);
            })
        })
    }
}