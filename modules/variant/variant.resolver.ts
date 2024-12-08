import {VariantService} from "./VariantService";
import {prisma} from "../../prisma/prismaClient";
import {GraphQLResolveInfo} from "graphql/type";
import {getSelectedFields} from "../../utils/generalFunctions";

const variantService = new VariantService(prisma);

export async function getVariants(_: any, args: any, context: any, info: GraphQLResolveInfo) {
  return variantService.getVariants(args, getSelectedFields(info));
}

export async function getVariant(_: any, args: any, context: any, info: GraphQLResolveInfo) {
  return variantService.getVariant(args.id, getSelectedFields(info));
}

export async function createVariant(_: any, args: any) {
  return variantService.createVariant(args.input);
}