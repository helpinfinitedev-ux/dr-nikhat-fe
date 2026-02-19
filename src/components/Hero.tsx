import { ArrowRight, Users, Award, BookOpen, Instagram } from "lucide-react";
import { useBookAppointment } from "@/context/BookAppointment/BookAppointmentContext";

const Hero = () => {
  const { openModal } = useBookAppointment();

  return (
    <section id="home" className="pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">15+ Years of Healing Excellence</span>
            </div>

            <h1 className="heading mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Natural Healing with <span className="text-primary">Homeopathy</span>
              <br />
              <span className="text-secondary">Dr. Nikhat Chaudhary</span>
            </h1>

            <p className="text__para max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Experience the power of holistic medicine. Specialized treatments for Hair, Skin, and Surgical cases with proven results. Your journey to complete wellness starts here.
            </p>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-heading">133</p>
                  <p className="text-xs text-text">Posts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-heading">1,951</p>
                  <p className="text-xs text-text">Followers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-heading">5000+</p>
                  <p className="text-xs text-text">Happy Patients</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <button onClick={openModal} className="btn btn-primary flex items-center gap-2 group">
                Book Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="https://www.instagram.com/dr.nikhatchaudhary" target="_blank" rel="noopener noreferrer" className="">
                <button className="flex items-center gap-3 text-heading font-semibold hover:text-primary transition-colors group">
                  <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <Instagram className="w-5 h-5 text-primary-foreground" />
                  </span>
                  Watch Success Stories
                </button>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative animate-slide-in-right">
            <div className="relative">
              {/* Background decorations */}
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>

              {/* Main image container */}
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary-light to-secondary/20 flex items-end justify-center">
                  {/* Placeholder for doctor image */}
                  <div className="w-full h-full bg-gradient-to-t from-primary/20 to-transparent flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-40 h-40 md:w-80 md:h-80 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <img src="/nikhat.png" className="object-cover rounded-full w-40 h-40 md:w-80 md:h-80" />
                      </div>
                      <p className="text-primary font-semibold text-lg">Dr. Nikhat Chaudhary</p>
                      <p className="text-text text-sm">BHMS (Homeopathy)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="hidden md:block absolute -left-4 top-1/4 bg-background rounded-xl shadow-card p-4 animate-bounce-gentle z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-whatsapp/10 flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <p className="font-bold text-heading">100%</p>
                    <p className="text-xs text-text">Natural Treatment</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block absolute -right-4 bottom-1/4 bg-background rounded-xl shadow-card p-4 animate-bounce-gentle z-20" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-bold text-heading">4.9/5</p>
                    <p className="text-xs text-text">Patient Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
