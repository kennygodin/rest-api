import { createUser, getUserByEmail } from 'db/users';
import express from 'express';
import { random } from 'helpers';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random;
    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
