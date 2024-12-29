import { Prisma } from "@prisma/client";
import { z, ZodType } from "zod";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type MenuModel = Prisma.MenuGetPayload<{}>;

export const MenuSchema: ZodType<MenuModel> = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "Name is mandatory" })
    .min(1, "Name is mandatory"),
  menu_id: z.string().nullable(),
  depth: z.number(),
  order: z.number(),
  parent_id: z.string().nullable(),
  children: z.array(z.lazy(() => MenuSchema)), 
  created_at: z.date(),
  updated_at: z.date(),
}) satisfies z.Schema<MenuModel>;

export type Menu = z.infer<typeof MenuSchema>;

export const CreateNewMenuSchema = z.object({
  name: z
    .string({ required_error: "Name is mandatory" })
    .min(1, "Name is mandatory"),
  depth: z.number(),
  order: z.number(),
  parent_id: z.string().nullable(),
});
export type CreateNewMenu = z.infer<typeof CreateNewMenuSchema>;

export const UpdateMenuSchema = CreateNewMenuSchema.extend({
  id: z.string().min(1, "Id is required"),
});
export type UpdateMenu = z.infer<typeof UpdateMenuSchema>;
