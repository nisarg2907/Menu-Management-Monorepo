import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '@repo/types';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getAllMenus() {
    const allMenus = await this.prisma.menu.findMany({
      orderBy: [{ depth: 'asc' }, { order: 'asc' }],
    });
  
    const menuMap = new Map<string, any>();
  
    allMenus.forEach((menu) => {
      menuMap.set(menu.id, { ...menu, children: [] });
    });
  
    const roots: any[] = [];
    allMenus.forEach((menu) => {
      if (menu.parent_id) {
        const parent = menuMap.get(menu.parent_id);
        if (parent) {
          parent.children.push(menuMap.get(menu.id));
        }
      } else {
        roots.push(menuMap.get(menu.id));
      }
    });
  
    return roots;
  }
  
  private async getChildrenRecursive(parentId: string) {
    const children = await this.prisma.menu.findMany({
      where: { root_id: parentId },
      orderBy: { order: 'asc' },
    });

    const childrenWithSubChildren = await Promise.all(
      children?.map(async (child) => {
        const subChildren = await this.getChildrenRecursive(child.id);
        return { ...child, children: subChildren };
      })
    );

    return childrenWithSubChildren;
  }

  async getMenuWithDepth(menuId: string, depth: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
      select:{
        parent:{
          select:{
            name:true
          }
        },
        root:{
          select:{
            name:true
          }
        }
      }
    });

    if (!menu) return null;

    if (depth > 0) {
      const children = await this.getChildrenWithDepth(menuId, depth - 1);
      return { ...menu, children };
    }

    return menu;
  }

  private async getChildrenWithDepth(parentId: string, depth: number) {
    if (depth < 0) return [];

    const children = await this.prisma.menu.findMany({
      where: { root_id: parentId },
      orderBy: { order: 'asc' },
    });

    if (depth > 0) {
      const childrenWithSubChildren = await Promise.all(
        children?.map(async (child) => {
          const subChildren = await this.getChildrenWithDepth(child.id, depth - 1);
          return { ...child, children: subChildren };
        })
      );
      return childrenWithSubChildren;
    }

    return children;
  }

  async createMenuItem(data: {
    name: string;
    depth: number;
    root_id?: string;
    menu_id?: string;
    parent_id?: string;
  }) {
    let rootId = null;
  
    if (data.parent_id) {
      const parent = await this.prisma.menu.findUnique({
        where: { id: data.parent_id },
      });
  
      if (parent) {
        rootId = parent.root_id || parent.id;
      }
    }
  
    const lastItem = await this.prisma.menu.findFirst({
      where: { parent_id: data.parent_id || null },
      orderBy: { order: 'desc' },
    });
  
    const order = lastItem ? lastItem.order + 1 : 0;
  
    const newMenuItem = await this.prisma.menu.create({
      data: {
        name: data.name,
        depth: data.depth,
        parent_id: data.parent_id || null,
        root_id: rootId,
        order,
      },
      include: {
        parent: true,
        root: true,
      },
    });
  
    return newMenuItem;
  }

  async updateMenuItem(
    id: string,
    data: {
      name?: string;
      depth?: number;
      order?: number;
      root_id?: string;
    }
  ) {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async deleteMenuItem(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  async reorderMenuItems(items: { id: string; order: number }[]) {
    const updates = items?.map((item) =>
      this.prisma.menu.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    );

    return this.prisma.$transaction(updates);
  }
}