import { Result } from 'ethers/lib/utils.js';
import React, { useEffect, useState } from 'react';
import HeadingWithWallet from '../components/HeadingWithWallet';
import BlogCard from '../components/BlogCard';
import { useTotalPublishedBlogs } from '../hooks/blogHooks';

type Props = {};

const Blogs = (props: Props) => {
  const [totalPublishedBlogs, setTotalPublishedBlogs] = useState<
    number | undefined | Result
  >(undefined);

  const getBlogs = useTotalPublishedBlogs();

  useEffect(() => {
    setTotalPublishedBlogs(getBlogs);
  }, [getBlogs]);

  // if totalPublishedProjs not present return nothing
  if (!totalPublishedBlogs) {
    return <div className="font-bold text-xl mb-2">No Blogs yet!</div>;
  }

  return (
    <main className="px-4 space-y-10">
      <HeadingWithWallet heading="Read Blogs" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from(Array(totalPublishedBlogs).keys()).map(
          (blogId: number, i) => {
            if (i == 0 || i == 1) return;
            return <BlogCard blogId={blogId} key={i} />;
          }
        )}
      </div>
    </main>
  );
};

export default Blogs;
