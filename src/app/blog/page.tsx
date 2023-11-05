import Image from 'next/image'
import Link from 'next/link'
import Blogheader from './blogcomponent/BlogComponents'
import { concatString, formatDate } from '@/lib'
import { getAllposts } from '@/actions/blogsactions/blogservice'
import { bloginterface } from '@/commontypes'
import BlogPagination from './blogcomponent/BlogPagination'
import moment from 'moment'

export const metadata = {
  title: 'Blog',
}
export const revalidate = 60;

export default async function BlogPage({ searchParams }) {
  const searchkey = searchParams['search'];
  const page = searchParams['page'] ?? '1';

  const allposts: { blogs: bloginterface[], total: number, totalPages: number, currentpage: number } = await getAllposts(page, searchkey)
  console.log(allposts.blogs[0]);

  return (
    <>
      <Blogheader />
      {
        searchkey && (
          <p className='my-3 '>Showing results for keyword &ldquo;{searchkey}&ldquo;</p>
        )
      }
      {allposts?.blogs?.length ? (
        <div className='blogpostgrid mt-2 cp'>
          {allposts?.blogs?.map((post: bloginterface, index) => (
            <>
              <div
                key={post._id}
                className='group relative flex flex-col space-y-2 desktopwrapper'
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
                <h2 className='text-2xl posttitle my-2'>{concatString(61, post.title)}</h2>
                {post.description && (
                  <p className='text_muted my-1'>{concatString(86, post.description)}</p>
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

              <Link
                key={post._id}
                prefetch={false} href={`blog/posts/${post.slug}`}
                className='relative wrapper mobliewrapper'
              >
                <div >
                  <div className='wrapper justify-start '>
                    <Image src={post.author[0].profilePic} alt={post.author[0].name} className='rounded-pill' width={28} height={28} unoptimized />
                    <p className='mb-0 ms-2 usernameblog' > {post.author[0].userName} </p>
                    <p className='ms-2 text_muted mb-0 datepostmob' > {moment(post.createdAt).format("MMM Do YY")} </p>
                  </div>
                  <h2 className='text-2xl posttitle 
                  '>{concatString(70, post.title)}</h2>
                  <p className='text_muted post-subtitle my-1'>{concatString(110, post.description)}</p>
                  {/* <div className='wrapper justify-between'>
                    <Link prefetch={false} href={`blog/posts/${post.slug}`} className='absolute viewarticle inset-0 cp'>
                      <span className=''>View Article</span>
                    </Link>
                  </div> */}
                </div>
                {post.previewImage && (
                  <div className='mobileimgwrapper ms-2'>
                    <Image
                      src={post.previewImage}
                      unoptimized
                      alt={post.title}
                      width={80}
                      height={56}
                      className='rounded-sm border postimagemobile bg-muted transition-colors'
                      priority={index <= 1}
                    />
                  </div>
                )}
              </Link>
            </>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
      <BlogPagination currentpage={allposts.currentpage} total={allposts.total} totalPages={allposts.totalPages} />
    </>
  )
}
