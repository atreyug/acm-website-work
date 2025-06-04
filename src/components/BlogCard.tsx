import React, { useState, useRef } from 'react';
import { BlogPost } from '../types/blog';
import BlogDialog from './BlogDialog';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isHovered) {
      hoverTimeoutRef.current = window.setTimeout(() => {
        setIsHovered(false);
      }, 200);
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 flex flex-col w-full max-w-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={blog.imageUrl || '/default-image.jpg'} 
          alt={blog.title || 'Blog post image'} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-sm font-medium text-[#018ABE] bg-[#D6EBEE] px-3 py-1 rounded">{blog.category}</span>
        </div>
          <h3 className="text-xl font-semibold text-[#001B48] mb-2 line-clamp-2">{blog.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{blog.excerpt}</p>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-[#02457A]">{blog.author}</span>
          <span className="text-xs text-gray-500">{blog.date}</span>
        </div>
      </div>

      <BlogDialog blog={blog} isOpen={isHovered} onClose={() => setIsHovered(false)} />
    </div>
  );
};

export default BlogCard;