-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "menu_id" TEXT,
    "name" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "root_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Menu_root_id_idx" ON "Menu"("root_id");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_root_id_fkey" FOREIGN KEY ("root_id") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
