import type {Storefront as HydrogenStorefront} from '@shopify/hydrogen';
import type {
  CountryCode,
  CurrencyCode,
  LanguageCode,
} from '@shopify/hydrogen/storefront-api-types';

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  currency: CurrencyCode;
};

export type Localizations = Record<string, Locale>;

export type I18nLocale = Locale & {
  pathPrefix: string;
};

export type Storefront = HydrogenStorefront<I18nLocale>;

export enum CartAction {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_CART = 'UPDATE_CART',
  UPDATE_DISCOUNT = 'UPDATE_DISCOUNT',
  UPDATE_BUYER_IDENTITY = 'UPDATE_BUYER_IDENTITY',
}
export type CartActions = keyof typeof CartAction;

/** SHOPRUNNER INIT INTERFACES  */

export interface ProductVariant {
  sku?: string;
  regularPrice: string;
  productInventory: number;
}

export interface SelectedProduct {
  selectedSku: {sku: string};
  selectedProductVariants: ProductVariant[];
}
interface PrimaryDomain {
  url: string;
}

interface Brand {
  logo?: null;
}

interface Shop {
  id: string;
  name: string;
  description: string | null;
  primaryDomain: PrimaryDomain;
  brand: Brand;
}

interface MenuItem {
  id: string;
  resourceId: string | null;
  tags: string[];
  title: string;
  type: string;
  url: string;
  items: MenuItem[];
  isExternal: boolean;
  target: string;
  to: string;
}

interface HeaderMenu {
  id: string;
  items: MenuItem[];
}

interface FooterMenu {
  id: string;
  items: MenuItem[];
}

interface SelectedLocale {
  label: string;
  language: string;
  country: string;
  currency: string;
  pathPrefix: string;
}

interface Analytics {
  shopifySalesChannel: string;
  shopId: string;
}

interface Seo {
  title: string;
  titleTemplate: string;
  handle: string;
  url: string;
  robots: {
    noIndex: boolean;
    noFollow: boolean;
  };
  jsonLd: {
    '@context': string;
    '@type': string;
    name: string;
    sameAs: string[];
    url: string;
    potentialAction: {
      '@type': string;
      target: string;
      query: string;
    };
  };
}

export interface ProductData {
  isLoggedIn: boolean;
  layout: {
    shop: Shop;
    headerMenu: HeaderMenu;
    footerMenu: FooterMenu;
  };
  selectedLocale: SelectedLocale;
  cart?: Cart;
  analytics: Analytics;
  seo: Seo;
}

interface PrimaryDomain {
  url: string;
}

interface Brand {
  logo?: null;
}

interface Shop {
  id: string;
  name: string;
  description: string | null;
  primaryDomain: PrimaryDomain;
  brand: Brand;
}

interface MenuItem {
  id: string;
  resourceId: string | null;
  tags: string[];
  title: string;
  type: string;
  url: string;
  items: MenuItem[];
  isExternal: boolean;
  target: string;
  to: string;
}

interface HeaderMenu {
  id: string;
  items: MenuItem[];
}

interface FooterMenu {
  id: string;
  items: MenuItem[];
}

interface SelectedLocale {
  label: string;
  language: string;
  country: string;
  currency: string;
  pathPrefix: string;
}

interface Analytics {
  shopifySalesChannel: string;
  shopId: string;
}

interface Seo {
  title: string;
  titleTemplate: string;
  handle: string;
  url: string;
  robots: {
    noIndex: boolean;
    noFollow: boolean;
  };
  jsonLd: {
    '@context': string;
    '@type': string;
    name: string;
    sameAs: string[];
    url: string;
    potentialAction: {
      '@type': string;
      target: string;
      query: string;
    };
  };
}

export interface Merchandise {
  [x: string]: any;
  id: string;
  availableForSale: boolean;
  compareAtPrice: {
    currencyCode: string;
    amount: string;
  } | null;
  price: {
    currencyCode: string;
    amount: string;
  };
  requiresShipping: boolean;
  title: string;
  image: {
    id: string;
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  product: {
    handle: string;
    title: string;
    id: string;
    tags: string[];
    variants: {
      edges: {
        node: {
          id: string;
          sku: string;
          quantityAvailable: number;
          price: {
            amount: string;
          };
        };
      }[];
    };
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface CartLineNode {
  id: string;
  quantity: number;
  attributes?: string[];
  cost: {
    totalAmount: {
      currencyCode: string;
      amount: string;
    };
    amountPerQuantity: {
      currencyCode: string;
      amount: string;
    };
    compareAtAmountPerQuantity: {
      currencyCode: string;
      amount: string;
    };
  };
  merchandise: Merchandise;
}

/**CART */

interface Cart {
  [x: string]: any;
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  buyerIdentity: {
    countryCode: string;
    customer?: null;
    email?: string;
    phone?: string;
  };
  lines: {
    edges: {
      node: CartLineNode;
    }[];
  };
  cost: {
    subtotalAmount: {
      currencyCode: string;
      amount: string;
    };
    totalAmount: {
      currencyCode: string;
      amount: string;
    };
    totalDutyAmount: {
      currencyCode: string;
      amount: string;
    } | null;
    totalTaxAmount: {
      currencyCode: string;
      amount: string;
    } | null;
  };
  note?: string;
  attributes?: [];
  discountCodes?: [];
}
