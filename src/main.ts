import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('bootstrap');
const PORT = process.env.PORT || 3000;

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )
    
    await app.listen(PORT);

    logger.log(`Application is running on port: ${PORT}`);

}
bootstrap();
