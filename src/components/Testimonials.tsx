import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    condition: "Hair Fall",
    testimonial: "After struggling with severe hair fall for 3 years, Dr. Nikhat's treatment gave me my confidence back. Within 4 months, I saw remarkable regrowth. The holistic approach really works!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    location: "Delhi, India",
    condition: "Psoriasis",
    testimonial: "I had psoriasis for 8 years. Tried everything from steroids to expensive treatments. Dr. Nikhat's homeopathic treatment cleared 90% of my patches in just 6 months. Life-changing!",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    location: "Ahmedabad, India",
    condition: "Kidney Stones",
    testimonial: "Was advised surgery for 12mm kidney stones. Dr. Nikhat's treatment dissolved them naturally in 5 months. Saved me from surgery and its complications. Highly recommended!",
    rating: 5,
  },
  {
    name: "Mohammad Khan",
    location: "Hyderabad, India",
    condition: "Chronic Acne",
    testimonial: "Suffered from cystic acne since teenage. Dr. Nikhat not only treated the acne but also addressed the hormonal imbalance causing it. Clear skin after 15 years!",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    location: "Bangalore, India",
    condition: "Piles",
    testimonial: "Grade 3 piles without surgery! I was skeptical at first, but the treatment worked wonders. No more pain, no more bleeding. Dr. Nikhat is truly gifted.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    location: "Jaipur, India",
    condition: "Hair Regrowth",
    testimonial: "Male pattern baldness ran in my family. Dr. Nikhat's personalized treatment stopped my hair loss and I've seen visible regrowth. The WhatsApp follow-ups are so convenient!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section__title">Patient Stories</span>
          <h2 className="heading mb-4">
            Real <span className="text-primary">Transformations</span>,{" "}
            <span className="text-secondary">Real Results</span>
          </h2>
          <p className="text__para">
            Don't just take our word for it. Hear from patients whose lives have been 
            transformed through natural homeopathic healing.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text mb-4">Ready to start your healing journey?</p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            Share Your Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
