import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types/blog';
import Hero from '../components/Hero';
import BlogGrid from '../components/BlogGrid';
import { Filter, Search, Loader2, RefreshCw, TrendingUp } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPage: React.FC = () => {
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [blogsToShow, setBlogsToShow] = useState<number>(6);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call with fallback to local data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          const response = await fetch('http://localhost/api/public/blogs');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: BlogPost[] = await response.json();
          setAllBlogPosts(data);
        } catch (apiError) {
          // Fallback to local data
          console.log('API not available, using local data');
          setAllBlogPosts(blogPosts);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch blog posts');
        setAllBlogPosts(blogPosts); // Fallback to local data
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    let filtered = allBlogPosts;

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(blog => blog.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query)
      );
    }

    setDisplayedBlogs(filtered.slice(0, blogsToShow));
  }, [allBlogPosts, activeCategory, searchQuery, blogsToShow]);

  const categories = Array.from(new Set(allBlogPosts.map(post => post.category)));
  const hasMoreBlogs = displayedBlogs.length < allBlogPosts.filter(blog => 
    (!activeCategory || blog.category === activeCategory) &&
    (!searchQuery.trim() || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ).length;

  const handleLoadMore = () => {
    setBlogsToShow(prev => prev + 6);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-radial-gradient-light">
        <Hero />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-[#02457A] text-xl">
              <Loader2 className="animate-spin" size={24} />
              <span className="font-medium">Loading amazing stories...</span>
            </div>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && allBlogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-radial-gradient-light flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#97CADB]/20">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#001B48] mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 btn-primary text-white font-semibold px-6 py-3 rounded-lg"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-radial-gradient-light">
      <Hero />

      <section id="blog-content" className="container mx-auto px-4 py-16">
        {/* Header section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[#97CADB]/30 rounded-full px-4 py-2 mb-4">
            <TrendingUp size={16} className="text-[#018ABE]" />
            <span className="text-sm font-medium text-[#02457A]">Featured Content</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Latest Articles</h2>
          <p className="text-lg text-[#02457A] max-w-2xl mx-auto leading-relaxed">
            Discover our most recent insights and stories from industry experts
          </p>
        </div>

        {/* Search and Filter section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-[#97CADB]/20 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#97CADB]" />
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#97CADB]/30 focus:border-[#018ABE] focus:ring-2 focus:ring-[#018ABE]/20 outline-none transition-all duration-300 bg-white/80"
              />
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="hidden lg:flex items-center gap-2 text-[#02457A] font-medium">
                <Filter size={16} />
                <span>Filter:</span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === null
                      ? 'bg-[#02457A] text-white shadow-lg'
                      : 'bg-white/80 text-[#02457A] hover:bg-white border border-[#97CADB]/30'
                  }`}
                >
                  All ({allBlogPosts.length})
                </button>

                {categories.map(category => {
                  const count = allBlogPosts.filter(blog => blog.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-[#02457A] text-white shadow-lg'
                          : 'bg-white/80 text-[#02457A] hover:bg-white border border-[#97CADB]/30'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results info */}
        {(searchQuery || activeCategory) && (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-[#02457A] font-medium">
              {displayedBlogs.length === 0 ? 'No articles found' : 
               `Showing ${displayedBlogs.length} article${displayedBlogs.length !== 1 ? 's' : ''}`}
              {searchQuery && ` for "${searchQuery}"`}
              {activeCategory && ` in ${activeCategory}`}
            </p>
          </div>
        )}

        {/* Blog grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <BlogGrid blogs={displayedBlogs} />
        </div>

        {/* Load more button */}
        {hasMoreBlogs && displayedBlogs.length > 0 && (
          <div className="flex justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={handleLoadMore}
              className="btn-primary text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Load More Articles
            </button>
          </div>
        )}

        {/* Empty states */}
        {displayedBlogs.length === 0 && !loading && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 text-center mt-8 border border-[#97CADB]/20 animate-fade-in-up">
            <div className="text-[#97CADB] mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33l-.147.083A7.994 7.994 0 0112 21a7.994 7.994 0 016.227-2.587l-.147-.083A7.962 7.962 0 0112 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#001B48] mb-2">
              {searchQuery || activeCategory ? 'No matching articles found' : 'No articles available'}
            </h3>
            <p className="text-[#02457A] mb-6">
              {searchQuery || activeCategory 
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for new content!'
              }
            </p>
            {(searchQuery || activeCategory) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(null);
                }}
                className="btn-primary text-white font-medium px-6 py-3 rounded-lg"
              >
                View All Articles
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;