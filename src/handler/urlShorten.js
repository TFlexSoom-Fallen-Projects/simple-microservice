import * as express from 'express';
import urlShortenService from '../service/urlShortenService';

export const router = express.Router({
    caseSensitive: false,
});

router.all("/", async (req, res, next) => {
    const url = req.body.url;
    const pair = await urlShortenService.INSTANCE.insertNewURL(url);

    if(pair.url === url ) {
        res.status(201).send({
            short_url_code: "/" + pair.key,
            url: pair.url
        });
    }
});