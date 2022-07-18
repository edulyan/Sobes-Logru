import UserRepository, { UserDto, UserDtoUpd } from "./model/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createError from "http-errors";

class UserService {
  async getAll(): Promise<UserDto[]> {
    try {
      return await UserRepository.find();
    } catch (error) {
      console.log(error);
      throw createError(500, "Failed to get users");
    }
  }

  async getOneById(id: string): Promise<UserDto> {
    try {
      const user = await UserRepository.findById(id);
      if (!user) {
        throw createError(404, "User not found");
      }

      return user;
    } catch (error) {
      console.log(error);
      throw createError(500, "Failed to get user");
    }
  }

  async signUp(user: UserDto): Promise<{}> {
    try {
      const hashPassword = await bcrypt.hash(user.password, 5);

      const data = await UserRepository.create({
        ...user,
        password: hashPassword,
      });

      const newUser = await data.save();

      const token = jwt.sign(
        {
          _id: data._id,
        },
        "SECRET",
        {
          expiresIn: "15m",
        }
      );

      const { password, ...user_one } = newUser._doc;

      return {
        ...user_one,
        token,
      };
    } catch (error) {
      console.log(error);
      throw createError(500, "Failed to register");
    }
  }

  async signIn(email: string, pass: string): Promise<{}> {
    try {
      const findUser = await UserRepository.findOne({ email: email });

      if (!findUser) {
        throw createError(404, "User not found");
      }

      const comparePass = await bcrypt.compare(pass, findUser.password);

      if (!comparePass) {
        throw createError(404, "Invalid username or password");
      }

      const token = jwt.sign(
        {
          _id: findUser._id,
        },
        "SECRET",
        {
          expiresIn: "15m",
        }
      );

      const { password, ...userData } = findUser._doc;

      return {
        ...userData,
        token,
      };
    } catch (error) {
      console.log(error);
      throw createError(500, "Failed to log in");
    }
  }

  async update(id: string, user: UserDtoUpd): Promise<boolean> {
    try {
      await UserRepository.findByIdAndUpdate(
        id,
        user,
        (err: string, useR: UserDto) => {
          if (err) {
            console.log(err);
            throw createError(500, "Failed to update user");
          }

          if (!useR) {
            throw createError(404, "User not found");
          }
        }
      );

      return true;
    } catch (error) {
      console.log(error);
      throw createError(500, "Failed to get the user");
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await UserRepository.findByIdAndDelete(
        id,
        (err: string, useR: UserDto) => {
          if (err) {
            console.log(err);
            throw createError(500, "Failed to delete user");
          }

          if (!useR) {
            throw createError(404, "User not found");
          }
        }
      );

      return true;
    } catch (error) {
      console.log(error);
      throw createError(500, "Failed to get user");
    }
  }
}

export default new UserService();
