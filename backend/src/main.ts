import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cokieParser from 'cookie-parser'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost' 

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  app.use(cokieParser())

  await app.listen(PORT, HOST, () => console.log(`Server started on http:\/\/${HOST}:${PORT}`))
}

bootstrap()
