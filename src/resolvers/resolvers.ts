import {createProduct, getProduct, getProducts} from "./product.resolver";
import {createVariant, getVariants, getVariant} from "./variant.resolver";

export const resolvers = {
  Query: {
    getProducts,
    getProduct,
    getVariant,
    getVariants
  },
  Mutation: {
    createProduct,
    createVariant
  }
};