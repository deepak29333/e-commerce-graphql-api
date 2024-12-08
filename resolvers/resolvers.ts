import {createProduct, getProduct, getProducts} from "../modules/product/product.resolver";
import {createVariant, getVariants, getVariant} from "../modules/variant/variant.resolver";

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