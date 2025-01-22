import {ProductService} from "../services/product.service";
import {prisma} from "../db/prismaClient";
import {getSelectedFields} from "../utils/generalFunctions";

const productService = new ProductService(prisma);

export async function getProducts(_: any, args?: any, context?: any, info?: any) {
  return productService.getProducts(args, getSelectedFields(info));
}

export async function getProduct(_: any, args: any, context?: any, info?: any) {
  return productService.getProduct(args, getSelectedFields(info));
}

export async function createProduct(_: any, args: any) {
  return productService.createProduct(args.input);
}
