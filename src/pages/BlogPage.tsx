import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BlogService } from "@/services/blog.service";

type BlogPost = {
  _id?: string;
  title: string;
  excerpt?: string;
  content: string;
  createdAt?: string;
};

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const [response, error] = await BlogService.getBlogs();
      if (error) {
        console.error("Error fetching blogs:", error);
        setPosts([]);
      } else {
        setPosts((response?.data?.data as BlogPost[]) || []);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const stripHtml = (html: string) =>
    html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const getExcerpt = (post: BlogPost) => {
    const explicit = post.excerpt?.trim();
    if (explicit) return explicit;
    const plain = stripHtml(post.content || "");
    if (!plain) return "";
    return plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
  };

  const getReadTime = (post: BlogPost) => {
    const words = stripHtml(post.content || "")
      .split(" ")
      .filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  const getDateLabel = (post: BlogPost) => {
    if (!post.createdAt) return "";
    const date = new Date(post.createdAt);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) => {
      const haystack = `${post.title} ${getExcerpt(post)}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [posts, searchQuery]);

  const featuredPost = filteredPosts[Math.floor(Math.random() * filteredPosts.length)];

  function extractImagesFromHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll("img"))
      .map((img) => ({
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt") ?? "",
        title: img.getAttribute("title"),
        width: img.getAttribute("width"),
        height: img.getAttribute("height"),
      }))
      .filter((x) => x.src != null);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primaryLightColor to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="heading text-3xl md:text-5xl mb-6">
            Health & Wellness <span className="text-primaryColor">Blog</span>
          </h1>
          <p className="text__para max-w-2xl mx-auto mb-8">Explore insights, tips, and expert advice on homeopathy and natural healing from Dr. Nikhat Chaudhary.</p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-headingColor mb-8">Featured Article</h2>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !featuredPost ? (
            <div className="text-center py-12">
              <p className="text-textColor text-lg">No articles available.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden group">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-primaryLightColor to-white">
                  {extractImagesFromHtml(featuredPost.content)[0]?.src && (
                    <img src={extractImagesFromHtml(featuredPost.content)[0].src} alt={featuredPost.title} className="w-full h-full max-h-64 object-cover" />
                  )}
                  {!extractImagesFromHtml(featuredPost.content)[0]?.src && <div className="absolute inset-0 flex items-center justify-center text-primaryColor text-sm font-semibold">Article</div>}
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-textColor mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {getDateLabel(featuredPost)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {getReadTime(featuredPost)}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-headingColor mb-4 group-hover:text-primaryColor transition-colors">{featuredPost.title}</h3>
                  <p className="text-textColor mb-6 leading-relaxed">{getExcerpt(featuredPost)}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primaryLightColor flex items-center justify-center">
                        <User className="w-5 h-5 text-primaryColor" />
                      </div>
                      <span className="font-medium text-headingColor">Dr. Nikhat Chaudhary</span>
                    </div>
                    <button className="ml-auto flex items-center gap-2 text-primaryColor font-semibold hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-headingColor mb-8">All Articles</h2>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-textColor text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post._id || post.title} className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primaryLightColor to-white">
                    {extractImagesFromHtml(post.content)[0]?.src && <img src={extractImagesFromHtml(post.content)[0].src} alt={post.title} className="w-full h-full object-cover" />}
                    {!extractImagesFromHtml(post.content)[0]?.src && <div className="absolute inset-0 flex items-center justify-center text-primaryColor text-sm font-semibold">Article</div>}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-textColor mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {getDateLabel(post)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getReadTime(post)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-headingColor mb-3 line-clamp-2 group-hover:text-primaryColor transition-colors">{post.title}</h3>
                    <p className="text-textColor text-sm mb-4 line-clamp-3">{getExcerpt(post)}</p>
                    <button onClick={() => navigate(`/blog/${post._id}`)} className="flex items-center gap-2 text-primaryColor font-semibold text-sm hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;
