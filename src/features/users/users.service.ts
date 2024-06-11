import {CreateUser, LoginUser} from "./users.types";
import {User} from "../../entity/user.entity";
import bcrypt from 'bcrypt';
import {PostgresDataSource} from "../../app-data-source";

export class UsersService {

    public async create(createUserParams: CreateUser) {
        try {
            const { firstName, lastName, email, password } = createUserParams;
            const queryRunner = PostgresDataSource.createQueryRunner()
            await queryRunner.connect()
            await queryRunner.startTransaction()
            try {
                const user = new User();
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                await queryRunner.manager.save(user);
                await queryRunner.commitTransaction()

                return{
                    email: email,
                    password: password
                }
            } catch (err) {
                await queryRunner.rollbackTransaction()
                return err;
            } finally {
                await queryRunner.release()
            }
        } catch (error) {
            throw error;
        }
    }

    public async login(loginUserParams: LoginUser) {
        try {
            const { email, password } = loginUserParams;
            const user = await User.findOne({
                where: {
                    email
                }
            });
            if (user) {
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (isPasswordMatch)  return {
                    message: 'Successfully logged in'
                }; else return {
                    message: 'Invalid password'
                };
            } else {
                return { message: "Invalid email" };
            }
        } catch (error) {
            throw error;
        }
    }
}