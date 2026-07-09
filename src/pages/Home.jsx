import React, { useEffect } from 'react'
import { Container, PostCard } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../store/postsSlice'

function Home() {
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.status)
    const { posts, status } = useSelector((state) => state.posts) // posts read from store, not backend

    useEffect(() => {
        // fetch only if status is 'idle' (first time). After fetch, status = 'succeeded' → this if becomes false → no more fetching
        if (authStatus && status === 'idle') {
            dispatch(fetchPosts())
        }
    }, [authStatus, status, dispatch])

    if (authStatus === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0 && status !== 'loading') {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-500">
                                No posts found. Create your first post!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // 5. Condition when posts exist
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
