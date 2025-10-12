/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from '@/components/modules/Blogs/BlogDetailsCard';

// SSG for dynamic route
export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`);
    const { data: blogs } = await res.json();

    return blogs.slice(0, 2).map((blog: any) => ({
        blogId: String(blog.id)
    }))
}

const BlogDetailsPage = async ({
    params
}: {
    params: Promise<{ blogId: string }>
}
) => {
    const { blogId } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/${blogId}`);
    const blog = await res.json();

    return (
        <div>
            <BlogDetailsCard blog={blog} />
        </div>
    );
};

export default BlogDetailsPage;