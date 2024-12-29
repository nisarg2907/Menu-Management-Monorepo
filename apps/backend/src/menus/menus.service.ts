import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '@repo/types';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Get all menus hierarchically
  async getAllMenus() {
    // First get all root menus (depth = 0)
    const rootMenus = await this.prisma.menu.findMany({
      where: { parent_id: null },
      orderBy: { order: 'asc' },
    });

    // Recursively get children for each root menu
    const menusWithChildren = await Promise.all(
      rootMenus.map(async (menu) => {
        const children = await this.getChildrenRecursive(menu.id);
        return { ...menu, children };
      })
    );

    return menusWithChildren;
  }

  // Helper function to recursively get children
  private async getChildrenRecursive(parentId: string) {
    const children = await this.prisma.menu.findMany({
      where: { parent_id: parentId },
      orderBy: { order: 'asc' },
    });

    const childrenWithSubChildren = await Promise.all(
      children.map(async (child) => {
        const subChildren = await this.getChildrenRecursive(child.id);
        return { ...child, children: subChildren };
      })
    );

    return childrenWithSubChildren;
  }

  // Get specific menu with its children up to specified depth
  async getMenuWithDepth(menuId: string, depth: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menu) return null;

    if (depth > 0) {
      const children = await this.getChildrenWithDepth(menuId, depth - 1);
      return { ...menu, children };
    }

    return menu;
  }

  // Helper function to get children with specific depth
  private async getChildrenWithDepth(parentId: string, depth: number) {
    if (depth < 0) return [];

    const children = await this.prisma.menu.findMany({
      where: { parent_id: parentId },
      orderBy: { order: 'asc' },
    });

    if (depth > 0) {
      const childrenWithSubChildren = await Promise.all(
        children.map(async (child) => {
          const subChildren = await this.getChildrenWithDepth(child.id, depth - 1);
          return { ...child, children: subChildren };
        })
      );
      return childrenWithSubChildren;
    }

    return children;
  }

  // Create new menu item
  async createMenuItem(data: {
    name: string;
    depth: number;
    parent_id?: string;
    menu_id?: string;
  }) {
    // Get the highest order number for the given parent
    const lastItem = await this.prisma.menu.findFirst({
      where: { parent_id: data.parent_id || null },
      orderBy: { order: 'desc' },
    });

    const order = lastItem ? lastItem.order + 1 : 0;

    return this.prisma.menu.create({
      data: {
        ...data,
        order,
      },
    });
  }

  // Update menu item
  async updateMenuItem(
    id: string,
    data: {
      name?: string;
      depth?: number;
      order?: number;
      parent_id?: string;
    }
  ) {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  // Delete menu item and its children
  async deleteMenuItem(id: string) {
    // Prisma will handle cascading deletes as specified in the schema
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  // Reorder menu items
  async reorderMenuItems(items: { id: string; order: number }[]) {
    const updates = items.map((item) =>
      this.prisma.menu.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    );

    return this.prisma.$transaction(updates);
  }
}