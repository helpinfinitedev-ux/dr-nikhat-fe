import { CheckCircle, Award, Users, Clock } from "lucide-react";

const features = ["Individualized Treatment", "Safe & Gentle", "Root Cause Healing", "Long-lasting Results", "Evidence-Based Approach", "Compassionate Care"];

const stats = [
  { icon: Users, value: "5000+", label: "Patients Treated" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Image */}
          <div className="flex-1 relative">
            <div className="relative">
              {/* Background shapes */}
              {/* <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-[2rem]"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-secondary/10 rounded-[2rem]"></div> */}

              {/* Main image
              <div className="relative z-10 rounded-[2rem] overflow-hidden">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary-light via-background to-secondary/20">
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-8xl">🌿</span>
                      </div>
                      <h3 className="text-2xl font-bold text-heading mb-2">Holistic Healing</h3>
                      <p className="text-text">Natural Medicine for Complete Wellness</p>
                    </div>
                  </div>
                </div>
              </div> */}

              <img src="/products.png" className="h-full w-full object-cover rounded-xl" />

              {/* Experience badge */}
              <div className="absolute -right-4 top-8 bg-background rounded-xl shadow-card p-4 z-20">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">15+</p>
                  <p className="text-sm text-text">
                    Years of
                    <br />
                    Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <span className="section__title">About Dr. Nikhat</span>
            <h2 className="heading mb-6">
              Dedicated to Your <span className="text-primary">Health</span> & <span className="text-secondary">Wellness</span>
            </h2>

            <p className="text__para mb-4">
              Dr. Nikhat Choudhary is a dedicated and research-oriented Homeopathic physician with a deep commitment to ethical and root-cause healing. With a strong academic foundation from CMP
              Medical College, Mumbai, and advanced training in Clinical Cosmetology, Trichology, Dietetics, and Emergency Medical Services from Hinduja Hospital, she blends classical homeopathy with
              modern clinical insight.
            </p>

            <p className="text__para mb-4">
              Having served as a Physician Investigator and Research Scientist in clinical trials for reputed pharmaceutical companies, Dr. Nikhat brings scientific precision and evidence-based
              understanding into her practice. She has also been appointed as Chief Medical Officer in the Merchant Navy, reflecting her clinical competence and leadership.
            </p>

            <p className="text__para mb-8">
              Practicing in Mumbai, she is known for treating every patient with equal compassion — from corporate professionals to underprivileged families — ensuring that quality healthcare is
              accessible to all.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-text">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-heading">{stat.value}</p>
                    <p className="text-sm text-text">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
