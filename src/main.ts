import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fs = require('fs');

const key = fs.readFileSync("./key/key.pem")
const cert = fs.readFileSync("./key/cert.pem")

const httpsOptions = {
    key: key,
    cert: cert,
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.enableCors()
  await app.listen(80);
}
bootstrap();
