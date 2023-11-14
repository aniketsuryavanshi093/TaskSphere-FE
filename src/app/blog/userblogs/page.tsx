import React from 'react'
import { getalluserspost } from '@/actions/blogsactions/blogservice';
import { bloginterface } from '@/commontypes';
import { getCurrentUser } from '@/lib/session';
import BlogPost from '../blogcomponent/BlogPost';
import BlogPagination from '../blogcomponent/BlogPagination';
import Link from 'next/link';

const page = async ({ searchParams }) => {
    const searchkey = searchParams['search'];
    const userid = searchParams["id"]
    const username = searchParams["name"]
    const page = searchParams['page'] ?? '1';
    const user = await getCurrentUser();
    let allposts: { blogs: bloginterface[], total: number, totalPages: number, currentpage: number };
    if (user?.id || userid) {
        allposts = await getalluserspost(page, searchkey, userid || user?.id) as { blogs: bloginterface[], total: number, totalPages: number, currentpage: number }
    }
    return (
        <div>
            <div className='wrapper my-2 justify-between'>
                <h3> {userid ? `${username} Posts` : "My Blogs"}  </h3>
                {!userid && user && <Link prefetch={false} className='create-blog no-wrap btn btn-outline-primary' href="/blog/create-blog"> Create Blog </Link>}
            </div>
            <BlogPost from="user" allposts={allposts} />
            <BlogPagination additionalparams={userid && `&id=${userid}&name=${username}`} currentpage={allposts.currentpage} paginationurl={`blog/userblogs`} total={allposts.total} totalPages={allposts.totalPages} />
        </div>
    )
}

export default page