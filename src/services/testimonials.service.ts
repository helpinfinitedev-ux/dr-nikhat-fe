import http from "./http.service";
import Promisable from "./promisable.service";

type CustomerRating = {
  customerName: string;
  rating: number;
  description: string;
  links?: string[];
  imageUrls?: string[];
  treatment: string;
};

export const TestimonialsService = {
  getTestimonials: async () => {
    return await Promisable.asPromise(http.get("/api/ratings"));
  },
  createRating: async (rating: CustomerRating) => {
    return await Promisable.asPromise(http.post("/api/ratings", rating));
  },
};
