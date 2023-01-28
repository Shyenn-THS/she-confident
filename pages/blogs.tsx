import { Result } from 'ethers/lib/utils.js';
import React, { useEffect, useState } from 'react';
import { useTotalPublishedBlogs } from '../utils/blogsHook/blogsRead';

type Props = {};

const Blogs = (props: Props) => {
  const [totalPublishedBlogs, setTotalPublishedBlogs] = useState<
    number | undefined | Result
  >(undefined);
  const getBlogs = useTotalPublishedBlogs();

  useEffect(() => {
    setTotalPublishedBlogs(getBlogs);
  }, [getBlogs]);

  console.log('totalPublishedProjs: ', totalPublishedBlogs?.toString());

  // if totalPublishedProjs not present return nothing
  if (!totalPublishedBlogs) {
    return <div className="font-bold text-xl mb-2">No Blogs yet!</div>;
  }

  return <div>Blogs</div>;
};

export default Blogs;
