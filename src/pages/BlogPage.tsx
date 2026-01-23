import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Homeopathy: A Complete Beginner's Guide",
    excerpt: "Discover the fundamental principles of homeopathy and how it differs from conventional medicine. Learn about the 'like cures like' principle.",
    content: "",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=500&fit=crop",
    category: "Education",
    author: "Dr. Nikhat Chaudhary",
    date: "January 2, 2026",
    readTime: "8 min read",
    tags: ["Homeopathy Basics", "Natural Healing", "Wellness"]
  },
  {
    id: 2,
    title: "Top 10 Homeopathic Remedies for Hair Fall",
    excerpt: "Hair loss can be distressing. Explore the most effective homeopathic treatments that address the root cause of hair fall naturally.",
    content: "",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop",
    category: "Hair Care",
    author: "Dr. Nikhat Chaudhary",
    date: "December 28, 2025",
    readTime: "6 min read",
    tags: ["Hair Fall", "Hair Growth", "Natural Remedies"]
  },
  {
    id: 3,
    title: "Homeopathy for Skin Conditions: What You Need to Know",
    excerpt: "From eczema to psoriasis, learn how homeopathic treatments can help manage various skin conditions without harsh chemicals.",
    content: "",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=500&fit=crop",
    category: "Skin Care",
    author: "Dr. Nikhat Chaudhary",
    date: "December 20, 2025",
    readTime: "7 min read",
    tags: ["Skin Health", "Eczema", "Psoriasis"]
  },
  {
    id: 4,
    title: "Boosting Immunity Naturally with Homeopathy",
    excerpt: "Strengthen your body's natural defense system with these proven homeopathic approaches to immune health.",
    content: "",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=500&fit=crop",
    category: "Immunity",
    author: "Dr. Nikhat Chaudhary",
    date: "December 15, 2025",
    readTime: "5 min read",
    tags: ["Immunity", "Prevention", "Health Tips"]
  },
  {
    id: 5,
    title: "Managing Stress and Anxiety: A Homeopathic Approach",
    excerpt: "Mental health is just as important as physical health. Discover how homeopathy can help you find calm and balance.",
    content: "",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    category: "Mental Wellness",
    author: "Dr. Nikhat Chaudhary",
    date: "December 10, 2025",
    readTime: "9 min read",
    tags: ["Stress Relief", "Anxiety", "Mental Health"]
  },
  {
    id: 6,
    title: "Homeopathy for Children: Safe & Gentle Healing",
    excerpt: "Parents often worry about medication side effects. Learn why homeopathy is a safe choice for treating common childhood ailments.",
    content: "",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=500&fit=crop",
    category: "Kids Health",
    author: "Dr. Nikhat Chaudhary",
    date: "December 5, 2025",
    readTime: "6 min read",
    tags: ["Children", "Safe Treatment", "Parenting"]
  }
];

const categories = ["All", "Education", "Hair Care", "Skin Care", "Immunity", "Mental Wellness", "Kids Health"];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primaryLightColor to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="heading text-3xl md:text-5xl mb-6">
            Health & Wellness <span className="text-primaryColor">Blog</span>
          </h1>
          <p className="text__para max-w-2xl mx-auto mb-8">
            Explore insights, tips, and expert advice on homeopathy and natural healing from Dr. Nikhat Chaudhary.
          </p>
          
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
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primaryColor text-white px-4 py-1 rounded-full text-sm font-medium">
                  {featuredPost.category}
                </span>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-textColor mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-headingColor mb-4 group-hover:text-primaryColor transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-textColor mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primaryLightColor flex items-center justify-center">
                      <User className="w-5 h-5 text-primaryColor" />
                    </div>
                    <span className="font-medium text-headingColor">{featuredPost.author}</span>
                  </div>
                  <button className="ml-auto flex items-center gap-2 text-primaryColor font-semibold hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primaryColor text-white shadow-lg"
                    : "bg-gray-100 text-textColor hover:bg-primaryLightColor hover:text-primaryColor"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-headingColor mb-8">
            {selectedCategory === "All" ? "All Articles" : selectedCategory}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-textColor text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primaryColor px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-textColor mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-headingColor mb-3 line-clamp-2 group-hover:text-primaryColor transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-textColor text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-xs bg-primaryLightColor text-primaryColor px-2 py-1 rounded">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 text-primaryColor font-semibold text-sm hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primaryColor to-primaryDarkColor">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Health Tips
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Subscribe to receive weekly insights on natural healing and wellness from Dr. Nikhat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-secondaryColor"
            />
            <button className="btn bg-secondaryColor hover:bg-opacity-90 text-white whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;
