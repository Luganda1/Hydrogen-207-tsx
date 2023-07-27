import {useState, useEffect, useRef, Children} from 'react';
import {useLocation} from 'react-use';

import type {
  SelectedProduct,
  ProductData,
  Merchandise,
  ProductVariant,
} from '../lib/type';

export default function ShopRunnerInit(data: ProductData): null {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>();
  const location = useLocation();
  const pathName = location.pathname ?? 'Home';
  const [splitPath] = useState<string>(pathName);

  useEffect(() => {
    (async () => {
      const result: ProductData = await data;
      result.cart &&
        result.cart.then((res: {lines: {edges: []}}) => {
          const lineItem: SelectedProduct[] = res.lines.edges.map(
            (item: {node: {merchandise: Merchandise}}) => {
              const productItem = item.node.merchandise;
              const selectedSku = {sku: productItem.sku};
              const selectedProductVariants: ProductVariant[] =
                productItem.product.variants.edges.map(
                  (item: {
                    node: {
                      id: string;
                      sku: string;
                      price: {amount: string};
                      quantityAvailable: number;
                    };
                  }) => {
                    const variantId = item.node.id.split('/').pop();
                    const sku =
                      item.node.sku === '' ? variantId : item.node.sku;
                    const variants: ProductVariant = {
                      sku,
                      regularPrice: item.node.price.amount,
                      productInventory: item.node.quantityAvailable,
                    };
                    return variants;
                  },
                );
              return {
                selectedSku,
                selectedProductVariants,
              };
            },
          );
          setSelectedProduct(lineItem[0]);
        });
    })();
  }, [data]);

  useEffect(() => {
    const srPartnerCode = 'SHOPIFYCONNECTOR';
    const pageType = splitPath.split('/').pop();
    const SRTrackingModule = import(
      'https://assets.prd.shoprunner.io/@shoprunner/shopping@1/es6/index.js'
    );
    SRTrackingModule.then(({init, serverCallbacks}) => {
      const shopping = init({
        partnerCode: srPartnerCode,
        pageType,
        callbacks: serverCallbacks('/apps/shoprunner-connect/validate'),
      });
      shopping.auth.authorize({prompt: 'none'}).then(() => {
        shopping.analytics.setPageType(pageType);
        shopping.analytics.trackProductViewed({
          variants: selectedProduct?.selectedProductVariants,
          selectedProductSKU: selectedProduct?.selectedSku?.sku,
        });
        TrackProductAddedToCart(
          selectedProduct?.selectedSku?.sku ?? 'sku',
          shopping,
        );
      });
    });
  }, [selectedProduct, splitPath]);

  return null;
}

function TrackProductAddedToCart(sku: string, shopping: any) {
  const addButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleButtonClick = () => {
    shopping.analytics.trackAddToCart({sku});
  };

  // Use useEffect to add the event listener when the component mounts
  useEffect(() => {
    const addButton = document.querySelector<HTMLButtonElement>(
      '[data-test="add-to-cart"]',
    );
    if (addButton) {
      addButtonRef.current = addButton;
      addButtonRef.current.addEventListener('click', handleButtonClick);
    }
    // Clean up the event listener when the component unmounts
    return () => {
      if (addButtonRef.current) {
        addButtonRef.current.removeEventListener('click', handleButtonClick);
      }
    };
  });

  return null;
}
