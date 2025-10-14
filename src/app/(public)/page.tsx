/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";

export default async function HomePage() {

  // SSG + ISR (Incremental Static Regeneration )
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, {
    next: {
      tags: ["BLOGS"]
    }
  });
  const { data: posts } = await res.json();


  return (
    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto my-10">
        {
          posts.map((post: any) => (
            <BlogCard key={post?.id} post={post} />
          ))
        }
      </div>
    </div>
  );
}
