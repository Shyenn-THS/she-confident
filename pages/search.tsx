import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const Search = (props: Props) => {
  const router = useRouter();
  const searchTerm = router.query['term'];

  return <div>{searchTerm}</div>;
};

export default Search;
