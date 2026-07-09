import React, { useEffect } from "react";
import { Container } from "../components";
import PostCard from "../components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/postsSlice";

function AllPosts() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts); // posts read from store

  useEffect(() => {
    // status = 'idle' means posts not fetched yet → dispatch fetch
    // after fetch, status becomes 'succeeded' → this if skips → no more backend calls
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            // FIX 2: Changed width from 'w-1' (4px) to 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4' for a perfect grid layout
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              {/* FIX 3: Spread the post object properties using {...post} so your PostCard receives title, $id, etc. directly */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
