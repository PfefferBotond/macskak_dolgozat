import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Nincs hozzáadva');
  }
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  async index(@Query('szem_szin') szem_szin: string) {
    if (szem_szin != undefined) {
      const [rows] = await db.execute(
        'SELECT szem_szn, suly FROM macskak WHERE szem_szín = ?',
        [szem_szin],
      );

      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'SELECT szem_szín, suly FROM macskak ORDER BY suly DESC',
      );

      return {
        macskak: rows,
      };
    }
  }

  @Get('cats/new')
  @Render('form')
  newMacskaForm() {
    return {};
  }
}
