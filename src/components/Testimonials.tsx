import { useEffect, useState } from "react";
import { Loader2, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { TestimonialsService } from "@/services/testimonials.service";
import { YouTubePreview } from "./YouTubePreview";

type CustomerRating = {
  _id?: string;
  customerName: string;
  rating: number;
  description: string;
  treatment: string;
  links?: string[];
  imageUrls?: string[];
};

const Testimonials = () => {
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

  const hasYoutubeLink = (links?: string[]) => {
    return links?.some((link) => link.includes("youtube.com") || link.includes("youtu.be"));
  };

  const getYoutubeLink = (links?: string[]) => {
    return links?.find((link) => link.includes("youtube.com") || link.includes("youtu.be"));
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section__title">Patient Stories</span>
          <h2 className="heading mb-4">
            Real <span className="text-primary">Transformations</span>, <span className="text-secondary">Real Results</span>
          </h2>
          <p className="text__para">Don't just take our word for it. Hear from patients whose lives have been transformed through natural homeopathic healing.</p>
        </div>

        {/* Testimonials Grid - Images Only */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text text-lg">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => {
              const imageUrl = testimonial.imageUrls?.[0];
              const hasVideo = hasYoutubeLink(testimonial.links);
              const youtubeLink = getYoutubeLink(testimonial.links);

              if (!testimonial._id) return null;
              if (!imageUrl && !youtubeLink) return null;

              return (
                <div
                  key={testimonial._id || `${testimonial.customerName}-${index}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 animate-fade-in border border-border/50"
                  style={{ animationDelay: `${index * 0.05}s` }}>
                  <Link to={`/testimonial/${testimonial._id}`} className="block relative aspect-[4/5] overflow-hidden">
                    {imageUrl ? (
                      <img src={imageUrl} alt={testimonial.customerName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : youtubeLink ? (
                      <YouTubePreview url={youtubeLink} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : null}
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-7 h-7 text-primary fill-primary ml-1" />
                        </div>
                      </div>
                    )}
                  </Link>
                  <div className="p-4 w-full text-white text-center bg-primary">
                    <Link to={`/testimonial/${testimonial._id}`} className="btn btn-primary w-full text-center">
                      Know More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link to="/testimonials" className="btn btn-outline inline-flex items-center gap-2">
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
