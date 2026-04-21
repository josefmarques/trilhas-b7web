import { jwtStrategy, jwtStrategyAuth } from './../libs/passport-jwt';
import { privateRequest } from './../middlewares/auth';
import express from 'express';
import { createContactController, deleteContactConstroller, getContactsController } from '../controllers/contact';
import { pingController } from '../controllers/ping';
import { localStrategyAuth } from '../libs/passport-local';
import { bearerStrategyAuth } from '../libs/passport-bearer';
import multer from 'multer';

const upload = multer({
    dest: 'uploads/'
})

const router = express.Router();

router.get('/ping', pingController);
router.post('/contato', upload.single('photo'), privateRequest, createContactController);
router.get('/contatos', getContactsController);
router.delete('/contato', privateRequest, deleteContactConstroller);

router.post('/login', localStrategyAuth, async (req, res) => {
    res.json({
        user: req.user,
        auth: req.authInfo
    });
});

router.get('/private', bearerStrategyAuth, (req, res) => {
    res.json({ msg: 'Acessou!'});
});

router.get('/privatejwt', jwtStrategyAuth, (req, res) => {
    res.json({ msg: 'Acessou JWT!'});
});

export default router;