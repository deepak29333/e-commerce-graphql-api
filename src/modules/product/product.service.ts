import {PrismaClient} from "@prisma/client";

export class ProductService {

  constructor(private prisma: PrismaClient) {
  }

  async getProducts(args?: any) {

    const {filter, sortKey, reverse,} = args;

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
    return this.prisma.product.findMany({where, orderBy, take, skip});
  }

  async getProduct(id: number) {
    return await this.prisma.product.findUnique({where: {id: id}});
  }

  async createProduct(args: any) {
    const {name, description, price} = args;
    return await this.prisma.product.create({data: {name, description, price}});
  }
}