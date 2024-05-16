'use client'

import { useEffect, useState } from 'react';
import { PostType } from '../lib/types';
import PostCard from './components/postCard';
import { useRouter } from 'next/navigation';
import Toaster from '../lib/toast';
import backend from '../lib/axios';

const MainPage = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const router = useRouter()
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const toaster = Toaster.startLoad('Fetching posts');
        try {
            backend.get(`/posts?page=${page}&limit=20`)
                .then((res) => {
                    const postData = res.data.posts as PostType[]
                    if (postData.length === 0) {
                        Toaster.stopLoad(toaster, "No posts found", 0);
                        return;
                    }
                    Toaster.stopLoad(toaster, "Posts fetched", 1);
                    setPosts(res.data.posts)
                }).catch((err) => {
                    Toaster.stopLoad(toaster, "You are not signed in", 0);
                    router.push('/login')
                })
        } catch (err: any) {
            Toaster.stopLoad(toaster, "You are not signed in", 0);
            router.push('/login')
        }
    }, [router, page])

    const nextPage = () => setPage(page + 1);
    const prevPage = () => setPage(page > 1 ? page - 1 : page)

    return (
        <main className="h-full flex flex-col justify-center items-center w-full">
            <div className="w-[70%] max-lg:w-full h-full min-h-screen font-primary py-8 px-8 flex flex-col justify-center items-center">
                <div className="w-3/5 max-md:w-full flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <div className="text-2xl font-semibold">All blog posts</div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))}
                    </div>
                    <div className="flex justify-between w-full mt-4">
                        <button onClick={prevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Previous
                        </button>
                        <button onClick={nextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainPage;