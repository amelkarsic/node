import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create(
        {
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            }
        }
    )

    const token = createJWT(user);
    res.json({ token });
}

export const singIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        },
        select: {
            id: true,
            username: true,
            password: true
        }
    });

    if (await comparePasswords(req.body.password, user.password)) {
        res.status(200);
        res.json({ token: createJWT(user) });
        return;
    }

    res.status(401);
    res.json({ message: "Wrong username or password" });
}