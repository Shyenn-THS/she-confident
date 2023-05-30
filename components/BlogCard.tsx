import React from 'react';
import { BlogData } from '../typings';
import { useBlogData } from '../utils/blogsHook/blogsHook';
import { usePublishedBlog } from '../utils/blogsHook/blogsRead';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const BlogCard = ({ blogId }: { blogId: number }) => {
  const publishedBlogAddress = usePublishedBlog(blogId);
  const data: BlogData = useBlogData(publishedBlogAddress!);

  const { categories, description, image, owner, social, title } = data!;
  if (!title || !description || !image || !owner || !social || !categories)
    return null;

  return (
    <motion.div
      whileInView={{ y: [100, 0] }}
      transition={{
        delay: 1,
        ease: 'easeInOut',
        duration: 1,
      }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${blogId}`}>
        <div className="bg-white-linen-50 shadow-lg rounded-lg cursor-pointer flex flex-col dark:bg-background-secondary dark:text-text-color-primary">
          <div className="relative w-full h-80 drop-shadow-xl">
            <Image
              className="object-cover hover:scale-105 object-left lg:object-center transition-transform duration-200 ease-out"
              src={image}
              alt={title}
              fill
            />

            <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex flex-col space-y-2">
              <div className="">
                <p className="font-bold line-clamp-1">{title}</p>
                {/* <p className="">
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p> */}
              </div>

              <div className="flex flex-wrap gap-y-2 md:gap-x-2 items-center">
                {categories.split(' ').map((category, i) => {
                  return (
                    <div
                      key={i}
                      className="bg-rajah-400 text-center text-black px-3 py-1 rounded-full font-semibold"
                    >
                      <p>{category}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-5 p-4">
            <div className="flex-1">
              <p className="underline text-lg font-bold line-clamp-2">
                {title}
              </p>
              <p className="text-gray-500 line-clamp-2">{description}</p>
            </div>

            <p className="font-bold flex items-center group-hover:underline">
              Read Post <ArrowRightIcon className="md-2 w-4 h-4" />
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
