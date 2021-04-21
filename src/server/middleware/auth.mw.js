import passport from 'passport';
import jwt from 'jsonwebtoken'

export function tokenCheck(req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {




        if (err) {
            return next(err);
        }


        if (info.message === 'jwt expired') {
            /* let token = jwt.sign({ "id": user.id, "role": user.role, "email": user.email }, process.env.JWT_SECRET, { expiresIn: '15d' }); */

            return res.json({ message: 'Your token has expired' });

        }

        if (info) {
            return res.status(401).send({ message: info.message })
        }

        if (!user) {
            return res.status(401).json({ message: 'I cant find a user fool' })
        }


        req.user = user
        next();
    })(req, res, next)

}