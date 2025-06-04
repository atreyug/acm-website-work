import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    author: "",
    date: "",
    category: "",
    title: "",
    excerpt: "",
    content: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    console.log("Image file submitted:", image);
    alert("Form submitted! Check the console.");
    setFormData({
      author: "",
      date: "",
      category: "",
      title: "",
      excerpt: "",
      content: "",
    });
    setImage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-radial-gradient-light py-16 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl border border-[#97CADB] animate-fade-in-up transform hover:scale-[1.005] transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#001B48] mb-2">Share Your Story</h1>
          <p className="text-[#02457A] text-lg">Create and submit your blog post to our community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Author", name: "author", type: "text", icon: "👤" },
              { label: "Date", name: "date", type: "date", icon: "📅" },
              { label: "Category", name: "category", type: "text", icon: "🏷️" },
              { label: "Title", name: "title", type: "text", icon: "📝" },
            ].map((field) => (
              <div key={field.name} className="group">
                <label className="block font-medium text-[#02457A] mb-2 group-hover:text-[#018ABE] transition-colors">
                  <span className="mr-2">{field.icon}</span>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-[#97CADB] rounded-xl focus:border-[#018ABE] focus:ring-2 focus:ring-[#018ABE] outline-none transition-all duration-300 hover:border-[#018ABE]"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <div className="group">
            <label className="block font-medium text-[#02457A] mb-2 group-hover:text-[#018ABE] transition-colors">
              <span className="mr-2">📸</span>
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full p-3 border border-[#97CADB] rounded-xl focus:border-[#018ABE] focus:ring-2 focus:ring-[#018ABE] outline-none transition-all duration-300 hover:border-[#018ABE]"
            />
          </div>

          <div className="group">
            <label className="block font-medium text-[#02457A] mb-2 group-hover:text-[#018ABE] transition-colors">
              <span className="mr-2">💭</span>
              Excerpt
            </label>
            <input
              type="text"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className="w-full p-3 border border-[#97CADB] rounded-xl focus:border-[#018ABE] focus:ring-2 focus:ring-[#018ABE] outline-none transition-all duration-300 hover:border-[#018ABE]"
              placeholder="Enter a brief excerpt"
            />
          </div>

          <div className="group">
            <label className="block font-medium text-[#02457A] mb-2 group-hover:text-[#018ABE] transition-colors">
              <span className="mr-2">📄</span>
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              required
              className="w-full p-3 border border-[#97CADB] rounded-xl focus:border-[#018ABE] focus:ring-2 focus:ring-[#018ABE] outline-none transition-all duration-300 hover:border-[#018ABE] resize-none"
              placeholder="Write your blog content here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#02457A] hover:bg-[#018ABE] text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Submit Blog</span>
            <span>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
