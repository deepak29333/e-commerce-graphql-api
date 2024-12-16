import {PrismaClient} from "@prisma/client";

export class VariantService {
  constructor(private prisma: PrismaClient) {
  }

  async getVariants(args?: any, requestedFields?: any) {

    const {filter, sortKey, reverse} = args;
    const include = requestedFields?.includes('product') ? {product: true} : {}
    //pagination
    const take = args.take ?? 10;
    const skip = args.skip ?? 0;

    //filter/search
    const where = filter ? {
      OR: [
        {name: {contains: filter}},
        {description: {contains: filter}}
      ]
    } : {};

    //sorting
    const sortOrder: any = reverse ? 'desc' : 'asc';
    const orderBy = sortKey ? {[sortKey]: sortOrder,} : {};
    return this.prisma.variant.findMany({where, orderBy, take, skip, include});
  }

  async getVariant(id: number, requestedFields?: string[]) {
    const include = requestedFields?.includes('product') ? {product: true} : {}
    return await this.prisma.variant.findUnique({where: {id: id}, include});
  }

  async createVariant(args: any) {
    const {name, price, productId} = args;
    return this.prisma.variant.create({
      data: {
        name,
        price,
        productId: productId
      },
      include: {
        product: true
      }
    });
  }
}