import { Star, Quote, Play } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  condition: string;
  testimonial: string;
  rating: number;
  imageUrl?: string;
  links?: string[];
}

const TestimonialCard = ({ name, location, imageUrl, condition, testimonial, rating, links }: TestimonialCardProps) => {
  const hasVideo = (links || []).length > 0;
  const firstLink = (links || [])[0];
  return (
    <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 relative">
      {/* Quote Icon */}
      {imageUrl && (
        <div className="mb-2 rounded-md w-full h-[300px]">
          <img src={imageUrl} className="rounded-md w-full h-full" />
        </div>
      )}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <Quote className="w-6 h-6 text-primary-foreground" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? "text-secondary fill-secondary" : "text-border"}`} />
        ))}
      </div>

      {/* Testimonial */}
      <p className="text-text mb-6 leading-relaxed">{testimonial}</p>

      {/* Condition Badge */}
      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">{condition}</span>

      {/* Author */}
      <div className="flex items-center justify-between border-t border-border">
        <div className="flex items-center gap-3 pt-4 ">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">{name.charAt(0)}</div>
          <div>
            <p className="font-semibold text-heading">{name}</p>
            <p className="text-sm text-text">{location}</p>
          </div>
        </div>
        <a href={firstLink} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
          <Play className="w-4 h-4 text-primary fill-primary" />
        </a>
      </div>
    </div>
  );
};

export default TestimonialCard;
