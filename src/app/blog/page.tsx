import Image from 'next/image'
import Link from 'next/link'
import Blogheader from './blogcomponent/BlogComponents'
import { formatDate } from '@/lib'
import { getAllposts } from '@/actions/blogsactions/blogservice'
import { bloginterface } from '@/commontypes'
import BlogPagination from './blogcomponent/BlogPagination'

export const metadata = {
  title: 'Blog',
}
export const revalidate = 20;

export default async function BlogPage({ searchParams }) {
  const searchkey = searchParams['search'];
  const page = searchParams['page'] ?? '1';

  const allposts: { blogs: bloginterface[], total: number, totalPages: number, currentpage: number } = await getAllposts(page, searchkey)
  return (
    <>
      <Blogheader />
      {
        searchkey && (
          <p className='my-3 '>Showing results for keyword &ldquo;{searchkey}&ldquo;</p>
        )
      }
      {allposts?.blogs?.length ? (
        <div className='blogpostgrid cp'>
          {allposts?.blogs?.map((post: bloginterface, index) => (
            <div
              key={post._id}
              className='group relative flex flex-col space-y-2'
            >
              {post.previewImage && (
                <Image
                  src={post.previewImage}
                  unoptimized
                  alt={post.title}
                  width={100}
                  height={100}
                  className='rounded-sm border postimage bg-muted transition-colors'
                  priority={index <= 1}
                />
              )}
              <h2 className='text-2xl posttitle my-2'>{post.title}</h2>
              {post.description && (
                <p className='text_muted my-1'>{post.description}</p>
              )}
              {post.createdAt && (
                <div className='wrapper justify-between'>
                  <p className='text-sm my-1 text-muted-foreground'>
                    {formatDate(post.createdAt)}
                  </p>
                  <Link prefetch={false} href={`blog/posts/${post.slug}`} className='absolute viewarticle inset-0 cp'>
                    <span className=''>View Article</span>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
      <BlogPagination currentpage={allposts.currentpage} total={allposts.total} totalPages={allposts.totalPages} />
    </>
  )
}
