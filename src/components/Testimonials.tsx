import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { TestimonialsService } from "@/services/testimonials.service";

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

        {/* Testimonials Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text text-lg">No testimonials available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial._id || `${testimonial.customerName}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <TestimonialCard
                  name={testimonial.customerName}
                  location="India"
                  condition={testimonial.treatment}
                  testimonial={testimonial.description}
                  rating={testimonial.rating}
                  links={testimonial.links}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text mb-4">Ready to start your healing journey?</p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex items-center gap-2">
            Share Your Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
