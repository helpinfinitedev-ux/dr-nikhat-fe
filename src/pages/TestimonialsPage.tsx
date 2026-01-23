import { useState } from "react";
import { Star, Play, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  "All",
  "Skin Conditions",
  "Allergies",
  "Migraines",
  "Digestive Issues",
];

const testimonials = [
  {
    id: 1,
    name: "Amelia R.",
    location: "Austin",
    condition: "Chronic Eczema",
    category: "Skin Conditions",
    rating: 5,
    testimonial:
      "My skin has never been clearer. Dr. Nikhat's approach was a game-changer after years of struggling. The before/after slider shows the incredible difference.",
    hasSlider: true,
    hasVideo: false,
  },
  {
    id: 2,
    name: "David L.",
    location: "San Diego",
    condition: "Severe Allergies",
    category: "Allergies",
    rating: 4.5,
    testimonial:
      "I can finally enjoy the outdoors again without constant sneezing. A truly life-changing treatment. Watch my story to see how it happened.",
    hasSlider: false,
    hasVideo: true,
  },
  {
    id: 3,
    name: "Priya K.",
    location: "New York",
    condition: "Psoriasis",
    category: "Skin Conditions",
    rating: 5,
    testimonial:
      "The relief I've found is immense. I was skeptical about homeopathy at first, but the results speak for themselves. The care and attention to detail were amazing.",
    hasSlider: false,
    hasVideo: false,
  },
  {
    id: 4,
    name: "Michael B.",
    location: "Chicago",
    condition: "Migraines",
    category: "Migraines",
    rating: 5,
    testimonial:
      "My headaches are finally manageable. I'm so grateful for the personalized care I received and for getting my life back from chronic pain.",
    hasSlider: false,
    hasVideo: false,
  },
  {
    id: 5,
    name: "Sophia T.",
    location: "Miami",
    condition: "Hormonal Imbalance",
    category: "Allergies",
    rating: 4.5,
    testimonial:
      "I feel more balanced and energetic than I have in years. Dr. Nikhat really listens and understands, and the treatment plan felt tailor-made for me.",
    hasSlider: false,
    hasVideo: false,
  },
  {
    id: 6,
    name: "Liam G.",
    location: "Seattle",
    condition: "Digestive Issues",
    category: "Digestive Issues",
    rating: 5,
    testimonial:
      "After years of discomfort, I've found a solution that works. My quality of life has improved dramatically. I highly recommend her practice.",
    hasSlider: false,
    hasVideo: false,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-secondary fill-secondary"
              : i < rating
              ? "text-secondary fill-secondary/50"
              : "text-border"
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 flex flex-col h-full">
      {/* Header with avatar and info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-heading truncate">
            {testimonial.name}, {testimonial.location}
          </h3>
          <p className="text-sm text-primary font-medium">
            Treated for: {testimonial.condition}
          </p>
        </div>
        {testimonial.hasSlider && (
          <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-text" />
          </button>
        )}
        {testimonial.hasVideo && (
          <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
            <Play className="w-4 h-4 text-primary fill-primary" />
          </button>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Testimonial text */}
      <p className="text-text leading-relaxed flex-1">"{testimonial.testimonial}"</p>
    </div>
  );
};

const TestimonialsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTestimonials =
    activeCategory === "All"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-light to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="heading mb-6">
                Stories from Our{" "}
                <span className="text-primary">Healing Garden</span>
              </h1>
              <p className="text__para text-lg">
                Discover how Dr. Nikhat has helped others find their path to
                wellness. Read their stories and see the transformations.
              </p>
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
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-text hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-r from-primary to-primary-dark">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Start Your Own Journey?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8">
                Take the first step towards a healthier, more balanced life with
                personalized homeopathic care.
              </p>
              <Link
                to="/book-appointment"
                className="btn bg-secondary text-secondary-foreground hover:bg-secondary/90 inline-flex items-center gap-2"
              >
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
