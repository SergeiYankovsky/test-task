import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

type ApiError = {
  httpCode: number;
  name: string;
  message: string;
  timestamp: string;
  stack: any;
  path?: string;
  method?: string;
  response: unknown;
};


const generateError = (e: any): ApiError => {
  const httpCode = e.status || HttpStatus.INTERNAL_SERVER_ERROR;

  return {
    httpCode,
    timestamp: new Date().toISOString(),
    ...(e.message && { message: e.message, }),
    ...(e.name && { name: e.name, }),
    ...(e.stack && { stack: e.stack, }),
    ...(e.response && { response: e.response, }),
  };
};

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const errorResponse = generateError(exception);

    console.warn(`${request.method} ${request.url}`);
    console.log(exception);

    response.status(errorResponse.httpCode).json(errorResponse);
  }
}