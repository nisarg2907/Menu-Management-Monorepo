import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
  } from '@nestjs/common';
  import { MenuService } from './menus.service';
  
  @Controller('menus')
  export class MenuController {
    constructor(private readonly menuService: MenuService) {}
  
    @Get()
    async getAllMenus() {
      return this.menuService.getAllMenus();
    }
  
    @Get(':id')
    async getMenuWithDepth(
      @Param('id') id: string,
      @Query('depth') depth: string
    ) {
      return this.menuService.getMenuWithDepth(id, parseInt(depth) || 0);
    }
  
    @Post()
    async createMenuItem(
      @Body()
      data: {
        name: string;
        depth: number;
        root_id?: string;
        menu_id?: string;
      }
    ) {
      return this.menuService.createMenuItem(data);
    }
  
    @Put(':id')
    async updateMenuItem(
      @Param('id') id: string,
      @Body()
      data: {
        name?: string;
        depth?: number;
        order?: number;
        root_id?: string;
      }
    ) {
      return this.menuService.updateMenuItem(id, data);
    }
  
    @Delete(':id')
    async deleteMenuItem(@Param('id') id: string) {
      return this.menuService.deleteMenuItem(id);
    }
  
    @Put('reorder')
    async reorderMenuItems(
      @Body() items: { id: string; order: number }[]
    ) {
      return this.menuService.reorderMenuItems(items);
    }
  }