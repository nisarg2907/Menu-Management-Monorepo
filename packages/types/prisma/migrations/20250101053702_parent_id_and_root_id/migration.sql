-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "parent_id" TEXT;

-- CreateIndex
CREATE INDEX "Menu_parent_id_idx" ON "Menu"("parent_id");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
