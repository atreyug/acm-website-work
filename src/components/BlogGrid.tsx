import React from 'react';
import { BlogPost } from '../types/blog';
import BlogCard from './BlogCard';

interface BlogGridProps {
  blogs: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {blogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;