import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { formatDate, generateInitials } from "@/lib"
import { bloginterface } from "@/commontypes"
import "./post.scss"
import { getAllposts, getPostFromParams } from "@/actions/blogsactions/blogservice"
import { Metadata } from "next"
import HtmlConverter from "@/app/_components/HTMLparser/HtmlConverter"
import Avatar from "@/app/_components/UI/Avatar"

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
  const allposts: bloginterface[] = await getAllposts()
  console.log("😎😎😎😎", allposts);
  console.log(allposts.map((post) => ({
    slug: post.slug,
  })));

  return allposts.map((post) => ({
    slug: post.slug.toString(),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  console.log(params);
  const post: bloginterface = await getPostFromParams(params.slug)
  if (!post) {
    notFound()
  }
  return (
    <div className="container relative ">
      {/* <Link
        href="/blog"
      >
        See all posts
      </Link>
      {params.slug} */}
      <div className="blogpostwrapper">
        <p className="postdate my-1 text_muted">{formatDate(post.createdAt)}</p>
        <p className="pposttitle">{post.title}</p>
        <div className="w-100 wrapper justify-start">
          <div className="wrapper justify-start">
            <Avatar image={post.author.profilePic} initials={generateInitials(post.author.userName)} />
            <p className="mb-0 ms-3 text_muted">{post.author.userName}</p>
          </div>
        </div>
        <Image className="my-4 posttimage" src={post.previewImage} alt={post.slug} width={100} height={405} />
        <div className="w-100">
          <HtmlConverter htmlString={post.content} />
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
