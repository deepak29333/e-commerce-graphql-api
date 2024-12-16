
import {ProductService} from "../services/product.service";
import {prisma} from "../db/prismaClient";
const productService = new ProductService(prisma);

export async function getProducts(_: any, args?: any) {
  return productService.getProducts(args);
}

export async function getProduct(_: any, args: any) {
  return productService.getProduct(args.id);
}

export async function createProduct(_: any, args: any) {
  return productService.createProduct(args.input);
}
