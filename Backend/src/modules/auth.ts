import jwt from 'jsonwebtoken'
import * as bcrypt from "bcrypt";

export const createJWT = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        notAuthorized(res);
        return;
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        notAuthorized(res);
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;
        next();
    } catch (e) {
        console.error(e)
        notAuthorized(res);
        return;
    }
}

const notAuthorized = (res) => {
    res.status(401);
    res.send('Not Authorized');

    return res;
}

// this will return promise sync the default version is async
export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
    // 5 is just a salt
    return bcrypt.hash(password, 5);
};