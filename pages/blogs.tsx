import { Result } from 'ethers/lib/utils.js';
import React, { useEffect, useState } from 'react';
import HeadingWithWallet from '../components/HeadingWithWallet';
import { useTotalPublishedBlogs } from '../utils/blogsHook/blogsRead';
import BlogCard from '../components/BlogCard';

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
    <div className="space-y-4">
      <HeadingWithWallet heading="Read Blogs" />
      <div className="grid grid-cols-3 gap-6">
        {Array.from(Array(totalPublishedBlogs).keys()).map(
          (blogId: number, i) => {
            if (i == 0 || i == 1) return;
            return <BlogCard blogId={blogId} key={i} />;
          }
        )}
      </div>
    </div>
  );
};

export default Blogs;
