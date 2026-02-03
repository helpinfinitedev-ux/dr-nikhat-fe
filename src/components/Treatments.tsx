import { Sparkles, Heart, Scissors, BookOpen } from "lucide-react";
import TreatmentCard from "./TreatmentCard";

const treatments = [
  {
    icon: Sparkles,
    title: "Hair Care",
    description: "Restore your hair's natural beauty with proven homeopathic treatments for hair fall, dandruff, and premature greying.",
    features: ["Hair Fall Control", "Dandruff Treatment", "Hair Regrowth", "Scalp Health"],
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Heart,
    title: "Skin Care",
    description: "Achieve radiant, healthy skin naturally. Expert treatment for acne, eczema, psoriasis, and other skin conditions.",
    features: ["Acne & Pimples", "Eczema & Psoriasis", "Skin Allergies", "Anti-Aging"],
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: Scissors,
    title: "Surgical Cases",
    description: "Non-invasive homeopathic alternatives for surgical conditions. Avoid surgery with natural healing approaches.",
    features: ["Piles & Fissures", "Kidney Stones", "Gallbladder Stones", "Cysts & Tumors"],
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    title: "OPD Diaries",
    description: "Real case studies and success stories from our daily practice. See the transformative power of homeopathy.",
    features: ["Case Studies", "Before & After", "Patient Journeys", "Treatment Insights"],
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
  },
];

const Treatments = () => {
  return (
    <section id="treatments" className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section__title">Our Specialties</span>
          <h2 className="heading mb-4">
            Expert <span className="text-primary">Treatment</span> Areas
          </h2>
          <p className="text__para">Comprehensive homeopathic care for a wide range of health conditions. Natural, safe, and effective treatments tailored to your unique needs.</p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <TreatmentCard {...treatment} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a href="https://wa.me/7021804152" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex items-center gap-2">
            Consult Now - It's Free!
          </a>
        </div>
      </div>
    </section>
  );
};

export default Treatments;
