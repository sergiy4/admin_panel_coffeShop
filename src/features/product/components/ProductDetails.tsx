import { useState } from 'react';
import ProductReviews from '../../reviews/components/ProductReviews';
const ProductDetails = () => {
  let content;
  const [tab, setTab] = useState<'reviews' | 'statistics'>('reviews');

  if (tab === 'reviews') {
    content = <ProductReviews />;
  } else if (tab === 'statistics') {
  } else {
    content = null;
  }

  return <section>{content}</section>;
};

export default ProductDetails;
