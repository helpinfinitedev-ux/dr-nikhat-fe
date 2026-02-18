import {
  Brain,
  HeartPulse,
  Wind,
  Apple,
  Droplets,
  Bone,
  Sparkles,
  Baby,
  SmilePlus,
  Flower2,
  Heart,
  Scissors,
  Ribbon,
  LucideIcon,
} from "lucide-react";

interface Treatment {
  icon: LucideIcon;
  title: string;
}

const treatments: Treatment[] = [
  { icon: Brain, title: "Nervous System Disorder" },
  { icon: HeartPulse, title: "Heart Diseases" },
  { icon: Wind, title: "Respiratory Diseases" },
  { icon: Apple, title: "Gastrointestinal Disorder" },
  { icon: Droplets, title: "Endocrine & Hormonal Disorders" },
  { icon: Bone, title: "Musculoskeletal Diseases" },
  { icon: Sparkles, title: "Skin & Hair Disorders" },
  { icon: Baby, title: "Pediatric Care" },
  { icon: SmilePlus, title: "Psychosomatic & Emotional Disorders" },
  { icon: Flower2, title: "Women's Health" },
  { icon: Heart, title: "Infertility" },
  { icon: Scissors, title: "Surgical Cases" },
  { icon: Ribbon, title: "Cancers" },
];

const Treatments = () => {
  return (
    <section id="treatments" className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section__title">Our Specialties</span>
          <h2 className="heading mb-4">
            Our Expert <span className="text-primary">Treatment</span> Areas
          </h2>
          <p className="text__para">Comprehensive homeopathic care for a wide range of health conditions. Natural, safe, and effective treatments tailored to your unique needs.</p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {treatments.map((treatment, index) => {
            const Icon = treatment.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-border/50 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={`w-14 h-14 ${isEven ? "bg-primary/10" : "bg-secondary/10"} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-7 h-7 ${isEven ? "text-primary" : "text-secondary"}`} />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-heading group-hover:text-primary transition-colors leading-tight">
                  {treatment.title}
                </h3>
              </div>
            );
          })}
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
