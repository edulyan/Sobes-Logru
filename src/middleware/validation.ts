import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "The password can be at least 5 characters").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("firstname", "Enter a firstname").isLength({ min: 2 }),
  body("lastname", "Enter a lastname").isLength({ min: 2 }),
  body("phone", "The phone number must be Russian").isMobilePhone("ru-RU"),
  body("email", "Invalid mail format").isEmail(),
  body("password", "The password can be at least 5 characters").isLength({
    min: 5,
  }),
];
