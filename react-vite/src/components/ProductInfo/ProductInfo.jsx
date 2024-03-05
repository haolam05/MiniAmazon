import { getAvatarUrl } from "../../utils/navbar";

function ProductInfo({ product }) {
  return (
    <div className="product-info">
      <div className="product-seller">
        <div><img src={getAvatarUrl(product.seller.profile_image_url)} alt="avatar" /></div>
        <div className="product-seller-info">
          <div className="product-seller-title">Seller Info</div>
          <div>{product.seller.first_name}, {product.seller.last_name}</div>
          <div>{product.seller.email}</div>
        </div>
      </div>
      <div className="product-description">
        {product.description}
      </div>
    </div>
  );
}

export default ProductInfo;
