import { useState } from "react";
import { X, MessageCircle, Send, User, Phone, Leaf, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const symptoms = ["Skin Issues", "Hair Fall", "Digestive Problems", "Stress & Anxiety", "Other"];

const timeSlots = ["Morning (9 AM - 12 PM)", "Afternoon (12 PM - 4 PM)", "Evening (4 PM - 8 PM)"];

const BookAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    symptom: "",
    timeSlot: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `🌿 New Appointment Request\n\n` + `👤 Name: ${formData.name}\n` + `📱 Phone: ${formData.phone}\n` + `🌿 Symptom: ${formData.symptom}\n` + `⏰ Preferred Time: ${formData.timeSlot}`
    );

    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
    setIsModalOpen(false);
    setFormData({ name: "", phone: "", symptom: "", timeSlot: "" });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-light to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-primary" />
              </div>
              <h1 className="heading mb-6">
                Dr. Nikhat Chaudhary's <span className="text-primary">Healing Garden</span>
              </h1>
              <p className="text__para text-lg mb-8">Welcome to a space of natural healing and wellness. Book your consultation today and begin your journey to holistic health.</p>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary inline-flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Book Your Appointment
              </button>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-card border border-border/50 shadow-card">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-heading mb-2">Quick Response</h3>
                <p className="text-text">Get a response within 24 hours on WhatsApp</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card border border-border/50 shadow-card">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-heading mb-2">Natural Healing</h3>
                <p className="text-text">Personalized homeopathic treatment plans</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card border border-border/50 shadow-card">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-heading mb-2">WhatsApp Follow-ups</h3>
                <p className="text-text">Convenient follow-up consultations via chat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-8 h-8 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
          aria-label="Book Appointment">
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse">+</span>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

            {/* Modal Content */}
            <div className="relative bg-card rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
              {/* Close Button */}
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors" aria-label="Close modal">
                <X className="w-5 h-5 text-text" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-heading">Book Your Appointment</h2>
                <p className="text-text mt-2">Fill in your details below and we'll get back to you on WhatsApp.</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-heading mb-2">
                    <User className="w-4 h-4" />
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-heading placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-heading mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-heading placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Symptom */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-heading mb-2">
                    <Leaf className="w-4 h-4" />
                    Primary Symptom
                  </label>
                  <select
                    required
                    value={formData.symptom}
                    onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-heading focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                    <option value="">Select a symptom</option>
                    {symptoms.map((symptom) => (
                      <option key={symptom} value={symptom}>
                        {symptom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-heading mb-2">
                    <Clock className="w-4 h-4" />
                    Preferred Time Slot
                  </label>
                  <select
                    required
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-heading focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full btn bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-2">
                  Send on WhatsApp
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BookAppointment;
