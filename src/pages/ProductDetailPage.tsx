import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Minus, Plus, ArrowLeft, Leaf, Truck, Shield, ShoppingCart, Check, ChevronRight, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);

    const data = "";
    const error = "";

    if (error || !data) {
      console.error("Error loading product:", error);
      setProduct(null);
    } else {
      setProduct(data);
      // loadRelatedProducts(data?.category, data?.id);
    }
    setLoading(false);
  };

  const loadRelatedProducts = async (category: string, productId: string) => {
    setRelatedProducts([]);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    // const { error } = await addToCart(product.id, quantity);
    const error = "";
    if (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    } else {
      toast.success("Added to cart!");
      setQuantity(1);
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primaryColor" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-headingColor mb-4">Product Not Found</h1>
          <p className="text-textColor mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn bg-primaryColor hover:bg-primaryDarkColor">
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [product.image_url, product.image_url];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-primaryLightColor py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-textColor hover:text-primaryColor">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-textColor" />
            <Link to="/products" className="text-textColor hover:text-primaryColor">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-textColor" />
            <span className="text-primaryColor font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-textColor hover:text-primaryColor mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg mb-4">
                <img src={images[selectedImage]} alt={product.name} className="w-full aspect-square object-cover" />
                {product.badge && <span className="absolute top-4 left-4 bg-secondaryColor text-white text-sm font-semibold px-4 py-2 rounded-full">{product.badge}</span>}
              </div>
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primaryColor" : "border-transparent"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block text-sm font-medium text-primaryColor bg-primaryLightColor px-3 py-1 rounded-full mb-4">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-headingColor mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="font-medium text-headingColor">{product.rating}</span>
                <span className="text-textColor">({product.reviews_count} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primaryColor">₹{product.price}</span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-textColor line-through">₹{product.original_price}</span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">{Math.round((1 - product.price / product.original_price) * 100)}% OFF</span>
                  </>
                )}
              </div>

              <p className="text-textColor text-lg mb-8 leading-relaxed">{product.description}</p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={adding}
                    className="w-12 h-12 flex items-center justify-center hover:bg-primaryLightColor rounded-l-full transition-colors disabled:opacity-50">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={adding}
                    className="w-12 h-12 flex items-center justify-center hover:bg-primaryLightColor rounded-r-full transition-colors disabled:opacity-50">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {product.in_stock ? (
                  <button onClick={handleAddToCart} disabled={adding} className="flex-1 btn bg-primaryColor hover:bg-primaryDarkColor flex items-center justify-center gap-2 disabled:opacity-50">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart - ₹{product.price * quantity}
                  </button>
                ) : (
                  <button disabled className="flex-1 btn bg-gray-300 text-gray-500 cursor-not-allowed flex items-center justify-center gap-2">
                    Out of Stock
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-primaryLightColor rounded-xl">
                <div className="text-center">
                  <Leaf className="w-6 h-6 text-primaryColor mx-auto mb-1" />
                  <p className="text-xs text-textColor">100% Natural</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-primaryColor mx-auto mb-1" />
                  <p className="text-xs text-textColor">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-primaryColor mx-auto mb-1" />
                  <p className="text-xs text-textColor">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 mb-8 border-b">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`pb-4 px-4 font-medium capitalize transition-colors ${activeTab === tab ? "text-primaryColor border-b-2 border-primaryColor" : "text-textColor hover:text-primaryColor"}`}>
                {tab} {tab === "reviews" && `(${product.reviews_count})`}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="bg-white rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-headingColor mb-4">Product Description</h3>
              <p className="text-textColor leading-relaxed mb-6">{product.description}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> For best results, consult with Dr. Nikhat for personalized recommendations based on your condition.
                </p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-white rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-headingColor">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating} out of 5</span>
                </div>
              </div>

              <p className="text-textColor text-center py-12">Customer reviews will appear here. Share your experience after purchase!</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-headingColor mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img src={relatedProduct.image_url} alt={relatedProduct.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    {relatedProduct.badge && <span className="absolute top-3 left-3 bg-secondaryColor text-white text-xs font-semibold px-3 py-1 rounded-full">{relatedProduct.badge}</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-headingColor mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-primaryColor">₹{relatedProduct.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetailPage;
