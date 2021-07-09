import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';


@Catch(TypeError)
export class TypeErrorExceptionFilter implements ExceptionFilter {
    catch (exception: TypeError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        return response.status(400).json({
            error: 'Input Error',
            message: exception.message,
        });
    }
}
