import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useBlogData } from '../../utils/blogsHook/blogsHook';
import { usePublishedBlog } from '../../utils/blogsHook/blogsRead';

type Props = {};

const BlogPage = (props: Props) => {
  const router = useRouter();
  const blogId = router.query.blogId;
  const publishedBlogAddress = usePublishedBlog(parseInt(blogId as string));
  const data = useBlogData(publishedBlogAddress!);

  return (
    <article className="px-10 pb-28 space-y-4">
      <section className="space-y-2 border border-froly-500 text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={data.image}
              alt={data.title}
              fill
            />
          </div>

          <section className="p-5 bg-froly-500 w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div className="">
                <h1 className="text-4xl font-extrabold">{data.title}</h1>
                <p>
                  {/* {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })} */}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {/* <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                /> */}

                <div className="">
                  <h3 className="text-lg font-bold whitespace-nowrap">
                    {data.owner}
                  </h3>
                  <div className="">{data.ownerWallet}</div>
                </div>
              </div>
            </div>

            <h2 className="italic pt-10 line-clamp-3">{data.description}</h2>
            <div className="flex items-center justify-end mt-auto space-x-2">
              {data.categories.split(' ').map((category, id) => {
                return (
                  <p
                    key={id}
                    className="bg-background-secondary text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category}
                  </p>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <div className="dark:text-text-color-primary space-y-8">
        <div className="h-96 w-full relative">
          <Image
            src={data.image}
            alt={data.owner}
            fill
            className="object-cover"
          />
        </div>
        {data.description.split('\n').map((para, id) => {
          return <p key={id}>{para}</p>;
        })}
      </div>
    </article>
  );
};

export default BlogPage;
