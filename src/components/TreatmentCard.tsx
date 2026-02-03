import { ArrowRight, LucideIcon } from "lucide-react";

interface TreatmentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  bgColor: string;
  iconColor: string;
}

const TreatmentCard = ({ icon: Icon, title, description, features, bgColor, iconColor }: TreatmentCardProps) => {
  return (
    <div className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-border/50">
      {/* Icon */}
      <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-heading mb-3 group-hover:text-primary transition-colors">{title}</h3>

      {/* Description */}
      <p className="text-text mb-6">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-text">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="https://wa.me/7021804152" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

export default TreatmentCard;
