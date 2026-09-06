import {
  ProductsModule,
  moduleInfo as productsInfo,
} from "@jfcordovam/mfe-demo-products";

import {
  TransactionsModule,
  moduleInfo as transactionsInfo,
} from "@jfcordovam/mfe-demo-transactions";

import "@jfcordovam/mfe-demo-products/style.css";
import "@jfcordovam/mfe-demo-transactions/style.css";

// Installed package imports: Vite includes them in the shell build.
export const modules = [
  {
    id: "products",
    label: "Products",
    description: "Catalog and availability",
    info: productsInfo,
    Component: ProductsModule,
  },
  {
    id: "transactions",
    label: "Transactions",
    description: "Income and expenses",
    info: transactionsInfo,
    Component: TransactionsModule,
  },
] as const;
