import {PrismaClient} from "@prisma/client";

export class ProductService {

  constructor(private prisma: PrismaClient) {
  }

  async getProducts(args?: any, requestedFields?: string[]) {

    //pagination
    const take = args.take ?? 10;
    const skip = args.skip ?? 0;
    const variantTake = args.variantTake ?? 10;
    const variantSkip = args.variantSkip ?? 0;

    const include: any = requestedFields?.includes('variants') ? {
      variants: {
        take: variantTake,
        skip: variantSkip,
        orderBy: {id: 'asc'}
      }
    } : undefined;
    const {filter, sortKey, reverse,} = args;

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
    return await this.prisma.product.findMany({
      where,
      orderBy,
      take,
      skip,
      include
    });
  }

  async getProduct(args: any, requestedFields?: string[]) {
    const id = +args.id;
    const variantTake = args.variantTake ?? 10;
    const variantSkip = args.variantSkip ?? 0;
    const include: any = requestedFields?.includes('variants') ? {
      variants: {
        take: variantTake,
        skip: variantSkip,
        orderBy: {id: 'asc'}
      }
    } : undefined;
    return await this.prisma.product.findUnique({where: {id: id}, include});
  }

  async createProduct(args: any) {
    const {name, description, price} = args;
    return await this.prisma.product.create({data: {name, description, price}});
  }
}