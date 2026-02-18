import { useEffect, useMemo, useState } from "react";
import { Play, ArrowRight, Loader2 } from "lucide-react";
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

const hasYoutubeLink = (links?: string[]) => {
  return links?.some((link) => link.includes("youtube.com") || link.includes("youtu.be"));
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
              <p className="text__para text-lg">Discover how Dr. Nikhat has helped others find their path to wellness. See their transformations.</p>
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

        {/* Testimonials Grid - Images Only */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredTestimonials.map((testimonial, index) => {
                  const imageUrl = testimonial.imageUrls?.[0];
                  const hasVideo = hasYoutubeLink(testimonial.links);

                  if (!imageUrl || !testimonial._id) return null;

                  return (
                    <div
                      key={testimonial._id || `${testimonial.customerName}-${index}`}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 animate-fade-in border border-border/50"
                      style={{ animationDelay: `${index * 0.05}s` }}>
                      <Link to={`/testimonial/${testimonial._id}`} className="block relative aspect-[4/5] overflow-hidden">
                        <img src={imageUrl} alt={testimonial.customerName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {hasVideo && (
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="w-7 h-7 text-primary fill-primary ml-1" />
                            </div>
                          </div>
                        )}
                      </Link>
                      <div className="p-4 bg-primary text-white text-center font-bold">
                        <Link to={`/testimonial/${testimonial._id}`} className=" bg-primary w-full text-center">
                          Know More
                        </Link>
                      </div>
                    </div>
                  );
                })}
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
