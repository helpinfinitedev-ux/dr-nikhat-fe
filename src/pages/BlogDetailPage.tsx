import Editor from "@/components/rich-text-editor";
import { Blog } from "@/lib/db";
import { BlogService } from "@/services/blog.service";
import DateService from "@/utils/date";
import { Calendar, Clock } from "lucide-react";
import React, { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RichTextEditor = lazy(() => import("../components/rich-text-editor"));

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      if (loading) return;
      const [response, error] = await BlogService.getBlogById(id);
      if (response) {
        setBlog(response.data.data);
        setLoading(false);
      } else {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const getTotalReadTime = (content: string) => {
    const words = content?.split(" ").length;
    const readTime = Math.ceil(words / 200);
    return readTime;
  };

  return (
    <div>
      <div className="container mx-auto py-8 max-w-[1024px]">
        <h1 className="text-[48px] px-14 font-bold text-gray-900">{blog?.title}</h1>
        <div className="mb-8">
          <div className="px-14">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">{DateService.getDateInDDMonthNameYYYY(blog?.createdAt?.toString())}</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">{getTotalReadTime(blog?.content)} min read</span>
              </div>
            </div>
          </div>
        </div>
        <div>{loading === false && blog?.content && <RichTextEditor initialContent={blog?.content} editable={false} onChange={() => {}} />}</div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
