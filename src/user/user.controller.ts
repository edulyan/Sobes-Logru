import { Request, Response } from "express";
import UserService from "./user.service";

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (error) {
      res.json(error);
    }
  }

  async getOneById(req: Request, res: Response) {
    try {
      const user = await UserService.getOneById(req.params.id);
      return res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = await UserService.signUp(req.body);
      return res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await UserService.signIn(req.body.email, req.body.password);
      return res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      await UserService.update(req.params.id, req.body);
      return res.json(true);
    } catch (error) {
      res.json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await UserService.delete(req.params.id);
      return res.json(true);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new UserController();
