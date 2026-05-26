import prisma from "@/lib/prisma";
export default async function DELETE(params: string) {
  return await prisma.user.delete({ where: { id: parseInt(params) } });
}
