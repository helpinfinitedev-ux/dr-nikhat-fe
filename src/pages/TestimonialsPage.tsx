import { useEffect, useMemo, useState } from "react";
import { Star, Play, SlidersHorizontal, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TestimonialsService } from "@/services/testimonials.service";

type CustomerRating = {
  _id?: string;
  customerName: string;
  rating: number;
  description: string;
  treatment: string;
  links?: string[];
  imageUrls?: string[];
  createdAt?: string;
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "text-secondary fill-secondary" : i < rating ? "text-secondary fill-secondary/50" : "text-border"}`} />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: CustomerRating }) => {
  const hasSlider = (testimonial.imageUrls || []).length > 0;
  const hasVideo = (testimonial.links || []).length > 0;
  const firstLink = (testimonial.links || [])[0];
  const imageUrl = testimonial.imageUrls?.[0] || "";

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 flex flex-col h-full">
      {/* Header with avatar and info */}
      <div className="mb-2 rounded-md w-full h-[300px]">
        <img src={imageUrl} className="rounded-md w-full h-[300px]" />
      </div>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
          {testimonial.customerName?.charAt(0) || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-heading truncate">{testimonial.customerName}</h3>
          <p className="text-sm text-primary font-medium">Treated for: {testimonial.treatment}</p>
        </div>
        {hasSlider && (
          <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-text" />
          </button>
        )}
        {hasVideo &&
          (firstLink ? (
            <a href={firstLink} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <Play className="w-4 h-4 text-primary fill-primary" />
            </a>
          ) : (
            <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <Play className="w-4 h-4 text-primary fill-primary" />
            </button>
          ))}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Testimonial text */}
      <p className="text-text leading-relaxed flex-1">"{testimonial.description}"</p>
    </div>
  );
};

const TestimonialsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [testimonials, setTestimonials] = useState<CustomerRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const [response, error] = await TestimonialsService.getTestimonials();
      if (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      } else {
        setTestimonials((response?.data?.data as CustomerRating[]) || []);
      }
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const categories = useMemo(() => {
    const treatments = testimonials.map((testimonial) => testimonial.treatment).filter((treatment) => !!treatment);
    return ["All", ...Array.from(new Set(treatments))];
  }, [testimonials]);

  const filteredTestimonials = activeCategory === "All" ? testimonials : testimonials.filter((t) => t.treatment === activeCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-light to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="heading mb-6">
                Stories from Our <span className="text-primary">Healing Garden</span>
              </h1>
              <p className="text__para text-lg">Discover how Dr. Nikhat has helped others find their path to wellness. Read their stories and see the transformations.</p>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-text hover:bg-primary/10 hover:text-primary"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 lg:py-20">
          <div className="container">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text text-lg">No testimonials found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                  <div key={testimonial._id || `${testimonial.customerName}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-r from-primary to-primary-dark">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">Ready to Start Your Own Journey?</h2>
              <p className="text-primary-foreground/90 text-lg mb-8">Take the first step towards a healthier, more balanced life with personalized homeopathic care.</p>
              <Link to="/book-appointment" className="btn bg-secondary text-secondary-foreground hover:bg-secondary/90 inline-flex items-center gap-2">
                Begin Your Healing Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TestimonialsPage;
