import { Module } from '@nestjs/common';
import { MenuController } from './menus.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MenuService } from './menus.service';

@Module({
  imports:[PrismaModule],
  controllers: [MenuController],
  providers:[MenuService]
})
export class MenusModule {}
