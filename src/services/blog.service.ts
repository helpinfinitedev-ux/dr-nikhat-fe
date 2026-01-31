import http from "./http.service";
import Promisable from "./promisable.service";
import { Blog } from "@/lib/db";

export const BlogService = {
  getBlogs: async () => {
    return await Promisable.asPromise(http.get("/api/blogs"));
  },
  getBlogById: async (id: string) => {
    return await Promisable.asPromise(http.get(`/api/blogs/${id}`));
  },
  createBlog: async (blog: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.post("/api/blogs", blog));
  },
  updateBlog: async (id: string, blog: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
    return await Promisable.asPromise(http.patch(`/api/blogs/${id}`, blog));
  },
};
