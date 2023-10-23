import Image from "next/image"
import Link from "next/link"
import Header from "../_components/UI/Header/Header"
import BlogButton from "./blogcomponent/BlogComponents"

export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  // const posts = allPosts
  //   .filter((post) => post.published)
  //   .sort((a, b) => {
  //     return compareDesc(new Date(a.date), new Date(b.date))
  //   })
  const posts: any[] = []
  return (
    <>
      <Header />
      <div className="container max-w-4xl py-3 px-0">
        <BlogButton />
        {posts?.length ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className="group relative flex flex-col space-y-2"
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted transition-colors"
                    priority={index <= 1}
                  />
                )}
                <h2 className="text-2xl font-extrabold">{post.title}</h2>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                )}
                <Link href={post.slug} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p>No posts published.</p>
        )}
      </div>
    </>

  )
}
