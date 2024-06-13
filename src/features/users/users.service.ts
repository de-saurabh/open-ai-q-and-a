import { CreateUser, LoginUser } from "./users.types";
import { User } from "../../entity/user.entity";
import bcrypt from "bcrypt";
import { PostgresDataSource } from "../../app-data-source";
import { AuthHelper } from "../../helper/auth.helper";
import { BlacklistedToken } from "../../entity/blacklisted_token.entity";

export class UsersService {
  public async create(createUserParams: CreateUser) {
    try {
      const { firstName, lastName, email, password } = createUserParams;
      const queryRunner = PostgresDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        const passwordSaltRounds: number =
          Number(process.env.PASS_SALT_ROUNDS) || 10;
        const salt: string = await bcrypt.genSalt(passwordSaltRounds);
        user.password = await bcrypt.hash(password, salt);

        await queryRunner.manager.save(user);
        await queryRunner.commitTransaction();

        return {
          email: email,
          password: password,
        };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        return err;
      } finally {
        await queryRunner.release();
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
          email,
        },
      });
      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          const token = new AuthHelper(user.email).generateToken();
          const refreshToken = new AuthHelper(
            user.email,
          ).generateRefreshToken();
          try {
            const queryRunner = PostgresDataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
              const blackListedTokens = await BlacklistedToken.find({
                where: {
                  user,
                },
              });
              await queryRunner.manager.remove(blackListedTokens);
              await queryRunner.commitTransaction();
            } catch (err) {
              await queryRunner.rollbackTransaction();
              return err;
            } finally {
              await queryRunner.release();
            }
          } catch (error) {
            throw error;
          }
          return {
            message: "Successfully logged in",
            token: token,
            refreshToken: refreshToken,
          };
        } else
          return {
            message: "Invalid password",
          };
      } else {
        return { message: "Invalid email" };
      }
    } catch (error) {
      throw error;
    }
  }

  public async logout(user: User, token: string) {
    try {
      const queryRunner = PostgresDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const blackListedToken = new BlacklistedToken();
        blackListedToken.user = user;
        blackListedToken.token = token;
        await queryRunner.manager.save(blackListedToken);
        await queryRunner.commitTransaction();

        return {
          message: "Successfully logged out.",
        };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        return err;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      throw error;
    }
  }
}
