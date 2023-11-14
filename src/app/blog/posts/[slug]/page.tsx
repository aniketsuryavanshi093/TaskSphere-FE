import { notFound } from "next/navigation"
import Link from "next/link"
import { formatDate, generateInitials } from "@/lib"
import { bloginterface } from "@/commontypes"
import "./post.scss"
import { getAllposts, getPostFromParams } from "@/actions/blogsactions/blogservice"
import { Metadata } from "next"
import Avatar from "@/app/_components/UI/Avatar"
import SeeAllbtn from "./components/SeeAllbtn"
import { Button } from "reactstrap"
import { getCurrentUser } from "@/lib/session"

interface PostPageProps {
  params: {
    slug: string
  }
}
export const revalidate = 300
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post: bloginterface = await getPostFromParams(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  const allposts: { blogs: bloginterface[] } = await getAllposts()
  return allposts.blogs.map((post) => ({
    slug: post.slug.toString(),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const user = await getCurrentUser();
  const post: bloginterface = await getPostFromParams(params.slug)
  if (!post) {
    notFound()
  }
  return (
    <div className="container relative ">
      <SeeAllbtn />
      <div className="blogpostwrapper">
        <div className="wrapper justify-between">
          <p className="postdate my-1 text_muted">{formatDate(post.createdAt)}</p>
          {
            post.createdAt !== post.updatedAt && (
              <p className="postdate my-1 text_muted">updated at {formatDate(post.updatedAt)}</p>
            )
          }
        </div>
        <p className="pposttitle">{post.title}</p>
        <div className="w-100 wrapper justify-between">
          <Link href={`/blog/userblogs?id=${post.author._id}&name=${post.author.userName}`} className="wrapper my-3 justify-start cp">

            <Avatar image={post.author.profilePic} initials={generateInitials(post.author.userName)} />
            <p className="mb-0 ms-2 text_muted">{post.author.userName}</p>
          </Link>
          {
            post?.author?._id === user?.id && (
              <Link href={`/blog/create-blog?mode=edit&id=${post.slug}`} className="editbutton btn-outline-primary  btn">
                <div className="wrapper justify-between">
                  <i className="fa-solid fa-pen me-2"></i>
                  <p className="mb-0 nowrap">Edit Post</p>
                </div>
              </Link>
            )
          }
        </div>
        <div className="w-100">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

        </div>
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/blog" >
            See all posts
          </Link>
        </div>
      </div>
    </div>
  )
}
