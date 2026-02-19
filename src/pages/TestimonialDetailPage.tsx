import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
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

const getYoutubeEmbedUrl = (url: string): string | null => {
  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // youtube.com/watch?v=VIDEO_ID
    const vParam = u.searchParams.get("v");
    if (vParam) return `https://www.youtube.com/embed/${vParam}`;

    // youtube.com/shorts/VIDEO_ID or /embed/VIDEO_ID
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => p === "shorts" || p === "embed");
    if (idx !== -1 && parts[idx + 1]) {
      return `https://www.youtube.com/embed/${parts[idx + 1]}`;
    }

    return null;
  } catch {
    return null;
  }
};

const TestimonialDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [testimonial, setTestimonial] = useState<CustomerRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!id) {
        setError("Testimonial not found");
        setLoading(false);
        return;
      }

      setLoading(true);
      const [response, err] = await TestimonialsService.getTestimonialById(id);
      if (err) {
        setError("Failed to load testimonial");
        setTestimonial(null);
      } else {
        setTestimonial(response?.data?.data as CustomerRating);
      }
      setLoading(false);
    };
    fetchTestimonial();
  }, [id]);

  const youtubeLink = testimonial?.links?.find(
    (link) => link.includes("youtube.com") || link.includes("youtu.be")
  );
  const embedUrl = youtubeLink ? getYoutubeEmbedUrl(youtubeLink) : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Back Button */}
        <section className="pt-8 pb-4">
          <div className="container">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-text hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Testimonials
            </Link>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-16">
          <div className="container">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error || !testimonial ? (
              <div className="text-center py-20">
                <p className="text-text text-lg">{error || "Testimonial not found"}</p>
                <Link to="/testimonials" className="btn btn-primary mt-6 inline-block">
                  View All Testimonials
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {/* YouTube Video */}
                {embedUrl && (
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-card-hover bg-black">
                    <iframe
                      src={embedUrl}
                      title={`Testimonial by ${testimonial.customerName}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
                  {testimonial.customerName && (
                    <h1 className="text-2xl lg:text-3xl font-bold text-heading mb-2">
                      {testimonial.customerName}
                    </h1>
                  )}
                  {testimonial.treatment && (
                    <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                      {testimonial.treatment}
                    </span>
                  )}
                  {testimonial.description && (
                    <p className="text-text text-lg leading-relaxed whitespace-pre-wrap">
                      {testimonial.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TestimonialDetailPage;
