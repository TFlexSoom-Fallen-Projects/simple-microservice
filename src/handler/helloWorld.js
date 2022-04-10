import * as express from 'express';
import helloWorldService from '../service/helloWorldService';

export const router = express.Router({
    caseSensitive: false,
});

router.all("/hello-world", async (req, res, next) => {
    const msg = await helloWorldService.INSTANCE.getMessage();
    res.status(200).send({
        message: msg,
    });
});