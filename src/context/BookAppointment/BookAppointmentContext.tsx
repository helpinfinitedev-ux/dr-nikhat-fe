import { createContext, useContext, useState, ReactNode } from "react";
import { X, Send, User, Phone, Leaf, Clock } from "lucide-react";

const symptoms = ["Skin Issues", "Hair Fall", "Digestive Problems", "Stress & Anxiety", "Nervous System", "Heart Diseases", "Respiratory Issues", "Women's Health", "Pediatric Care", "Other"];

const timeSlots = ["Morning (9 AM - 12 PM)", "Afternoon (12 PM - 4 PM)", "Evening (4 PM - 8 PM)"];

interface BookAppointmentContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const BookAppointmentContext = createContext<BookAppointmentContextType | undefined>(undefined);

export const useBookAppointment = () => {
  const context = useContext(BookAppointmentContext);
  if (!context) {
    throw new Error("useBookAppointment must be used within a BookAppointmentProvider");
  }
  return context;
};

export const BookAppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    symptom: "",
    timeSlot: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormData({ name: "", phone: "", symptom: "", timeSlot: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `🌿 New Appointment Request\n\n` +
        `👤 Name: ${formData.name}\n` +
        `📱 Phone: ${formData.phone}\n` +
        `🌿 Symptom: ${formData.symptom}\n` +
        `⏰ Preferred Time: ${formData.timeSlot}`
    );

    window.open(`https://wa.me/7021804152?text=${message}`, "_blank");
    closeModal();
  };

  return (
    <BookAppointmentContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal Content */}
          <div className="relative bg-card rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
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
                  Primary Concern
                </label>
                <select
                  required
                  value={formData.symptom}
                  onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-heading focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Select your concern</option>
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
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-heading focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-2"
              >
                Send on WhatsApp
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </BookAppointmentContext.Provider>
  );
};
