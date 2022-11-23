import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class QueryMenExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();

    if (req.querymen && req.querymen.error) {
      res.status(400).json(req.querymen.error);
    } else if (exception.response && exception.response) {
      res
        .status(exception.status)
        .json(exception.response || exception.message);
    } else {
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
