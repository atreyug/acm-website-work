import React, { useState, useRef } from 'react';
import { BlogPost } from '../types/blog';
import BlogDialog from './BlogDialog';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  blog: BlogPost;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const leaveTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    // Clear any existing leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    // Set hover state with a small delay to prevent accidental triggers
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(true);
    }, 300); // 300ms delay before opening
  };

  const handleMouseLeave = () => {
    // Clear any existing hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Set leave timeout with longer delay
    leaveTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 500); // 500ms delay before closing
  };

  const handleDialogMouseEnter = () => {
    // Clear leave timeout when mouse enters dialog
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handleDialogMouseLeave = () => {
    // Close dialog when mouse leaves dialog area
    leaveTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 300); // Shorter delay when leaving dialog
  };

  const handleDialogClose = () => {
    // Clear all timeouts and close immediately
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsHovered(false);
  };

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <article
        className="group rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover-lift flex flex-col w-full max-w-md bg-white border border-[#97CADB]/20 animate-fade-in-up"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image container */}
        <div className="relative overflow-hidden h-48">
          <img 
            src={blog.imageUrl || '/default-image.jpg'} 
            alt={blog.title || 'Blog post image'} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-[#02457A] border border-white/20">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-[#001B48] mb-3 line-clamp-2 group-hover:text-[#02457A] transition-colors duration-300 leading-tight">
            {blog.title}
          </h3>
          
          <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed text-sm">
            {blog.excerpt}
          </p>
          
          {/* Read more indicator */}
          <div className="flex items-center text-[#018ABE] text-sm font-medium mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span>Read more</span>
            <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#97CADB]/20 bg-gray-50/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-[#02457A] font-medium">
              <User size={14} className="mr-2 text-[#97CADB]" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar size={14} className="mr-2" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </article>

      <BlogDialog 
        blog={blog} 
        isOpen={isHovered} 
        onClose={handleDialogClose}
        onMouseEnter={handleDialogMouseEnter}
        onMouseLeave={handleDialogMouseLeave}
      />
    </div>
  );
};

export default BlogCard;