import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

@Controller('api/say-hello')
class TestController {

    public static readonly SUCCESS_MSG = 'hello ';

    @Get(':name')
    private sayHello(req: Request, res: Response) {
        try {
            const { name } = req.params;
            if (name === 'make_it_fail') {
                throw Error('User triggered failure');
            }
            Logger.Info(TestController.SUCCESS_MSG  + name);
            return res.status(OK).json({
                message: TestController.SUCCESS_MSG + name,
            });
        } catch (err:any) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
}

export default TestController;