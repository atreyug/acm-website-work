import React, { useRef, useEffect } from 'react';
import { BlogPost } from '../types/blog';
import { X, Calendar, User, Tag } from 'lucide-react';

interface BlogDialogProps {
  blog: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

const BlogDialog: React.FC<BlogDialogProps> = ({ blog, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        ref={dialogRef}
        onMouseEnter={() => clearTimeout((dialogRef.current as any)?.hoverTimeout)}
        onMouseLeave={() => {
          const timeout = setTimeout(() => {
            onClose();
          }, 200);
          (dialogRef.current as any).hoverTimeout = timeout;
        }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] animate-scaleIn border border-[#97CADB]/20"
      >
        {/* Header with image */}
        <div className="relative">
          <div className="h-64 w-full overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#001B48] p-2 rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
          >
            <X size={20} />
          </button>
          
          {/* Category badge on image */}
          <div className="absolute bottom-4 left-6">
            <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#02457A] px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
              <Tag size={14} />
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(90vh - 16rem)' }}>
          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#97CADB]" />
              <span className="font-medium text-[#02457A]">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#97CADB]" />
              <span>{blog.date}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#001B48] mb-6 leading-tight text-balance">
            {blog.title}
          </h2>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            style={{
              '--tw-prose-headings': '#001B48',
              '--tw-prose-links': '#018ABE',
              '--tw-prose-bold': '#02457A',
              '--tw-prose-quotes': '#02457A',
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDialog;