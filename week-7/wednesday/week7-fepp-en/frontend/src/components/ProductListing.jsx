const ProductListing = () => {
  return (
    <div className="product-preview">
      <h2>{Product.title}</h2>
      <p>Type: {Product.type}</p>
      <p>Description: {Product.description}</p>
      <p>Company: {Product.company.name}</p>
    </div>
  );
};

export default ProductListing;
